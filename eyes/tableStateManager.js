/**
 * tableStateManager.js — Per-table state tracking for Pretty Gaming lobby
 *
 * Tracks state transitions, deck composition, and card history for each table.
 * Detects state changes that trigger EV recalculation.
 *
 * 13-slot composition: [A, 2, 3, 4, 5, 6, 7, 8, 9, T, J, Q, K]
 * Each slot = remaining count for that rank across all suits in the shoe.
 *
 * State transitions of interest:
 *   Dealing / Result(*) → Waiting for Bets  =>  finalize hand, recalc EV
 *   any → Shuffling                         =>  reset deck to fresh shoe
 *   Round number drops significantly         =>  likely new shoe, reset deck
 */

const { sendWhatsAppNotification } = require('../utils/whatsapp_notifier');
const { checkTickValidations, checkWarningNeeded, checkImpossibleCard, checkGhostHands } = require('./stateValidators');

// ─── Card Name → 13-slot Rank Index ─────────────────────────────────────
// Index: 0=A, 1=2, 2=3, 3=4, 4=5, 5=6, 6=7, 7=8, 8=9, 9=T, 10=J, 11=Q, 12=K

function cardRankToIndex(cardName) {
  if (!cardName || cardName === "Red") return -1; // face-down, skip

  // Card names from DOM: "8H", "9S", "KC", "AC", "10C", "JH", "QC", "5D"
  const rank = cardName.slice(0, -1).toUpperCase();

  switch (rank) {
    case "A":  return 0;
    case "2":  return 1;
    case "3":  return 2;
    case "4":  return 3;
    case "5":  return 4;
    case "6":  return 5;
    case "7":  return 6;
    case "8":  return 7;
    case "9":  return 8;
    case "10":
    case "T":  return 9;
    case "J":  return 10;
    case "Q":  return 11;
    case "K":  return 12;
    default:   return -1;
  }
}

// ─── Fresh 8-Deck Shoe ──────────────────────────────────────────────────
// Each rank × 4 suits × 8 decks = 32 cards per rank slot. Total = 416.

function freshShoe() {
  return [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32];
}

function deckRemaining(composition) {
  return composition.reduce((a, b) => a + b, 0);
}

// ─── Per-Table State ─────────────────────────────────────────────────────

class TableState {
  constructor(tableName) {
    this.tableName = tableName;
    this.lastState = null;
    this.lastRound = 0;
    this.deckComposition = freshShoe(); // 13-slot
    this.handNumber = 0;
    this.lastFinalizedRound = 0;
    this.lastPlayerCards = [];
    this.lastBankerCards = [];
    this.lastEvResult = null;
    this.bufferedCards = { player: [], banker: [] };
    this.currentBetId = null;
    this.restored = false; // true if loaded from saved state, cleared after first validation
    this.hasWarnedAhead = false; // track warnings to prevent spam
    this.consecutiveZeroCardHands = 0;
    this.handFinalizedForCycle = false; // prevents double-finalization per dealing cycle
  }

  get remaining() {
    return deckRemaining(this.deckComposition);
  }
}

// ─── State Manager ───────────────────────────────────────────────────────

class TableStateManager {
  constructor() {
    /** @type {Map<string, TableState>} */
    this.tables = new Map();
  }

  /**
   * Update all table states from a scrape tick.
   * @param {Array} tableDataArray - Array of table objects from dom_extractor
   * @returns {Array} - List of state-change events that need EV recalculation
   */
  update(tableDataArray) {
    const events = [];

    for (const table of tableDataArray) {
      const name = table.tableName;
      if (!this.tables.has(name)) {
        this.tables.set(name, new TableState(name));
      }
      const ts = this.tables.get(name);
      const prevState = ts.lastState;
      const newState = table.state;
      const newRound = table.round;

      const processHandResult = (handResult, targetRound) => {
        if (handResult.corruptedReason) {
          this._resetShoe(ts, handResult.corruptedReason);
          events.push({
            type: "SHOE_RESET",
            tableName: name,
            reason: handResult.corruptedReason,
            finalRound: ts.lastRound
          });
        } else {
          ts.lastFinalizedRound = Math.max(ts.lastFinalizedRound, targetRound);
          events.push({
            type: "HAND_COMPLETE",
            tableName: name,
            tableState: ts,
            handNumber: ts.handNumber,
            round: targetRound,
            playerCards: handResult.playerCards,
            bankerCards: handResult.bankerCards,
            cardsSubtracted: handResult.cardsSubtracted,
            deckRemaining: ts.remaining,
            deckComposition: [...ts.deckComposition],
            winner: handResult.winner,
          });
        }
      };

      // ── Buffer cards during Dealing / Result states ──
      if (
        newState === "Dealing" ||
        newState.startsWith("Result") ||
        newState === "Dealing / No More Bets"
      ) {
        // Clear the finalization flag when we enter a new dealing cycle
        if (prevState === "Waiting for Bets" || prevState === "Shuffling" || prevState === null) {
          ts.handFinalizedForCycle = false;
        }

        const identifiablePlayer = (table.playerCards || []).filter(
          (c) => c !== "Red"
        );
        const identifiableBank = (table.bankerCards || []).filter(
          (c) => c !== "Red"
        );

        // High-water mark: only update if we see more identifiable cards
        const newTotal = identifiablePlayer.length + identifiableBank.length;
        const oldTotal =
          ts.bufferedCards.player.length + ts.bufferedCards.banker.length;

        if (newTotal >= oldTotal && newTotal > 0) {
          ts.bufferedCards.player = identifiablePlayer;
          ts.bufferedCards.banker = identifiableBank;
        }
      }

      // ── Key transition: Dealing/Result → Waiting for Bets or Shuffling ──
      const wasDealing =
        prevState === "Dealing" ||
        prevState === "Dealing / No More Bets" ||
        (prevState && prevState.startsWith("Result"));

      const isNowWaiting = newState === "Waiting for Bets" || newState === "Shuffling";

      if (wasDealing && isNowWaiting) {
        const hasCards = ts.bufferedCards.player.length > 0 || ts.bufferedCards.banker.length > 0;
        const roundAdvanced = newRound > ts.lastRound;
        const hasResult = prevState && prevState.startsWith("Result");

        // Determine logical upcoming round.
        // If UI round is laggy (still shows the old round), we use lastRound + 1.
        const logicalNextRound = Math.max(newRound, ts.lastRound + 1);

        // Guard: only finalize once per dealing cycle (flag cleared when entering Dealing)
        if ((hasCards || roundAdvanced || hasResult) && !ts.handFinalizedForCycle) {
          const handResult = this._finalizeHand(ts);
          ts.handFinalizedForCycle = true;
          
          processHandResult(handResult, logicalNextRound);
        } else if (!hasCards && !roundAdvanced && !hasResult) {
          // False flicker. Clear buffered cards to avoid leaking them to the next hand.
          ts.bufferedCards = { player: [], banker: [] };
          if (prevState !== newState) {
            events.push({
              type: "STATE_CHANGE",
              tableName: name,
              tableState: ts,
              from: prevState,
              to: newState,
              round: newRound,
              deckRemaining: ts.remaining,
              deckComposition: [...ts.deckComposition],
            });
          }
        } else {
          // Had cards/result but already finalized for this cycle — discard buffered cards
          ts.bufferedCards = { player: [], banker: [] };
        }
      } else if (isNowWaiting && newRound > ts.lastRound && ts.lastRound > 0) {
        // Missed Dealing completely, but round advanced.
        // Only finalize if we haven't already finalized for this cycle
        if (!ts.handFinalizedForCycle && newRound > ts.lastFinalizedRound) {
          const handResult = this._finalizeHand(ts);
          ts.handFinalizedForCycle = true;
          processHandResult(handResult, newRound);
        }
      }

      // ── External Validations for the tick ──
      const tickInvalidReason = checkTickValidations(ts, newRound, newState, prevState);

      if (ts.restored) {
        ts.restored = false;
        if (!tickInvalidReason && newRound >= ts.lastRound) {
          console.log(`\x1b[36m[STATE] ${name}: Validated (saved R${ts.lastRound} → live R${newRound})\x1b[0m`);
        }
      }

      // ── Reset deck on shuffling or invalid state ──
      if (newState === "Shuffling" && prevState !== "Shuffling") {
        this._resetShoe(ts, "Shuffling detected");
        events.push({
          type: "SHOE_RESET",
          tableName: name,
          reason: "Shuffling state detected",
          isActualShuffle: true,
          finalRound: ts.lastRound
        });
      } else if (tickInvalidReason) {
        this._resetShoe(ts, tickInvalidReason);
        events.push({
          type: "SHOE_RESET",
          tableName: name,
          reason: tickInvalidReason,
          finalRound: ts.lastRound
        });
      } else {
        if (checkWarningNeeded(ts, newRound)) {
          if (!ts.hasWarnedAhead) {
            const msg = `[WARNING] ${name}: recorded hands (${ts.handNumber}) is ahead of table UI round (${newRound}). Awaiting correction.`;
            console.log(`\x1b[33m${msg}\x1b[0m`);
            sendWhatsAppNotification(msg).catch(err => console.error("WhatsApp Notification failed:", err));
            ts.hasWarnedAhead = true;
          }
        } else if (ts.handNumber <= newRound) {
          ts.hasWarnedAhead = false;
        }
      }

      ts.lastState = newState;
      ts.lastRound = newRound;
    }

    return events;
  }

  /**
   * Finalize a hand: subtract buffered cards from 13-slot deck composition.
   */
  _finalizeHand(ts) {
    const pCards = ts.bufferedCards.player;
    const bCards = ts.bufferedCards.banker;
    const allCards = [...pCards, ...bCards];

    let cardsSubtracted = 0;
    let corruptedReason = null;

    for (const card of allCards) {
      const idx = cardRankToIndex(card);
      if (idx >= 0) {
        const impReason = checkImpossibleCard(ts.deckComposition, idx, card);
        if (impReason && !corruptedReason) {
          corruptedReason = impReason;
        }
        if (ts.deckComposition[idx] > 0) {
          ts.deckComposition[idx]--;
        }
        cardsSubtracted++;
      }
    }

    if (cardsSubtracted === 0) {
      ts.consecutiveZeroCardHands++;
      const ghostReason = checkGhostHands(ts.consecutiveZeroCardHands);
      if (ghostReason && !corruptedReason) {
        corruptedReason = ghostReason;
      }
    } else {
      ts.consecutiveZeroCardHands = 0;
    }

    // Determine winner from the result state if available
    let winner = null;
    if (ts.lastState && ts.lastState.startsWith("Result")) {
      if (ts.lastState.includes("Player")) winner = "P";
      else if (ts.lastState.includes("Banker")) winner = "B";
      else if (ts.lastState.includes("Tie")) winner = "T";
    }

    ts.handNumber++;
    ts.lastPlayerCards = pCards.slice();
    ts.lastBankerCards = bCards.slice();
    ts.bufferedCards = { player: [], banker: [] };

    return { playerCards: pCards, bankerCards: bCards, cardsSubtracted, winner, corruptedReason };
  }

  _resetShoe(ts, reason) {
    ts.deckComposition = freshShoe();
    ts.handNumber = 0;
    ts.lastFinalizedRound = 0;
    ts.hasWarnedAhead = false;
    ts.consecutiveZeroCardHands = 0;
    ts.handFinalizedForCycle = false;
    ts.bufferedCards = { player: [], banker: [] };
    ts.lastPlayerCards = [];
    ts.lastBankerCards = [];
    ts.lastEvResult = null;
    const msg = `[SHOE] ${ts.tableName}: Reset to fresh shoe (${reason})`;
    console.log(`\x1b[33m${msg}\x1b[0m`);
    if (reason.startsWith('Invalid state')) {
      sendWhatsAppNotification(msg).catch(err => console.error("WhatsApp Notification failed:", err));
    }
  }

  getTable(tableName) {
    return this.tables.get(tableName) || null;
  }

  /**
   * Serialize all table states to a plain object for persistence.
   */
  serialize() {
    const data = {};
    for (const [name, ts] of this.tables) {
      data[name] = {
        tableName: ts.tableName,
        lastState: ts.lastState,
        lastRound: ts.lastRound,
        deckComposition: ts.deckComposition,
        handNumber: ts.handNumber,
        lastFinalizedRound: ts.lastFinalizedRound,
        lastPlayerCards: ts.lastPlayerCards,
        lastBankerCards: ts.lastBankerCards,
        lastEvResult: ts.lastEvResult,
        bufferedCards: ts.bufferedCards,
        currentBetId: ts.currentBetId,
        consecutiveZeroCardHands: ts.consecutiveZeroCardHands,
      };
    }
    return data;
  }

  /**
   * Restore table states from a previously serialized object.
   */
  restore(data) {
    if (!data || typeof data !== "object") return;
    for (const [name, saved] of Object.entries(data)) {
      const ts = new TableState(name);
      ts.lastState = saved.lastState || null;
      ts.lastRound = saved.lastRound || 0;
      ts.deckComposition = saved.deckComposition || freshShoe();
      ts.handNumber = saved.handNumber || 0;
      ts.lastFinalizedRound = saved.lastFinalizedRound || saved.lastRound || 0;
      ts.lastPlayerCards = saved.lastPlayerCards || [];
      ts.lastBankerCards = saved.lastBankerCards || [];
      ts.lastEvResult = saved.lastEvResult || null;
      ts.bufferedCards = saved.bufferedCards || { player: [], banker: [] };
      ts.currentBetId = saved.currentBetId || null;
      ts.consecutiveZeroCardHands = saved.consecutiveZeroCardHands || 0;
      ts.restored = true; // mark for validation on first live tick
      this.tables.set(name, ts);
    }
    console.log(`\x1b[36m[STATE] Restored ${this.tables.size} tables from saved state\x1b[0m`);
  }
}

module.exports = { TableStateManager, cardRankToIndex, freshShoe, deckRemaining };
