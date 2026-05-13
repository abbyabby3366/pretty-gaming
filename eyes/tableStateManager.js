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
    this.restored = false; // true if loaded from saved state, cleared after first validation
    this.hasWarnedAhead = false; // track warnings to prevent spam
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

      // ── Validate restored state on first tick ──
      if (ts.restored) {
        ts.restored = false;

        if (newRound < ts.lastRound) {
          this._resetShoe(ts, `Stale state: round went from ${ts.lastRound} → ${newRound}`);
          events.push({
            type: "SHOE_RESET",
            tableName: name,
            reason: `Round dropped ${ts.lastRound} → ${newRound} after restore`,
            finalRound: ts.lastRound
          });
        } else {
          console.log(`\x1b[36m[STATE] ${name}: Validated (saved R${ts.lastRound} → live R${newRound})\x1b[0m`);
        }
      }

      // ── Reset deck on shuffling ──
      if (newState === "Shuffling" && prevState !== "Shuffling") {
        this._resetShoe(ts, "Shuffling detected");
        events.push({
          type: "SHOE_RESET",
          tableName: name,
          reason: "Shuffling state detected",
          isActualShuffle: true,
          finalRound: ts.lastRound
        });
      }

      // ── Reset or warn if recorded hands exceed current round ──
      if (ts.handNumber >= newRound + 3 && newRound > 0) {
        this._resetShoe(ts, `Invalid state: recorded hands (${ts.handNumber}) >= table round + 3 (${newRound + 3})`);
        events.push({
          type: "SHOE_RESET",
          tableName: name,
          reason: `Recorded hands ${ts.handNumber} exceeds table round ${newRound} by 3+`,
          finalRound: ts.lastRound
        });
      } else if (ts.handNumber >= newRound + 2 && newRound > 0) {
        if (!ts.hasWarnedAhead) {
          const msg = `[WARNING] ${name}: recorded hands (${ts.handNumber}) is ahead of table UI round (${newRound}). Awaiting correction.`;
          console.log(`\x1b[33m${msg}\x1b[0m`);
          sendWhatsAppNotification(msg).catch(err => console.error("WhatsApp Notification failed:", err));
          ts.hasWarnedAhead = true;
        }
      } else if (ts.handNumber <= newRound) {
        // Reset the flag if the round fully corrects itself
        ts.hasWarnedAhead = false;
      }

      // ── Reset deck if mathematically invalid deck size ──
      const minExpectedCards = 416 - (newRound * 6);
      if (ts.remaining < minExpectedCards) {
        this._resetShoe(ts, `Invalid state: cards left (${ts.remaining}) < expected min (${minExpectedCards}) for round ${newRound}`);
        events.push({
          type: "SHOE_RESET",
          tableName: name,
          reason: `Deck size ${ts.remaining} is too low for round ${newRound}`,
          finalRound: ts.lastRound
        });
      }

      // ── Buffer cards during Dealing / Result states ──
      if (
        newState === "Dealing" ||
        newState.startsWith("Result") ||
        newState === "Dealing / No More Bets"
      ) {
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

      // ── Key transition: Dealing/Result → Waiting for Bets ──
      const wasDealing =
        prevState === "Dealing" ||
        prevState === "Dealing / No More Bets" ||
        (prevState && prevState.startsWith("Result"));

      const isNowWaiting = newState === "Waiting for Bets";

      if (wasDealing && isNowWaiting) {
        const hasCards = ts.bufferedCards.player.length > 0 || ts.bufferedCards.banker.length > 0;
        const roundAdvanced = newRound > ts.lastRound;

        if (hasCards || roundAdvanced) {
          const handResult = this._finalizeHand(ts);
          
          // Determine logical upcoming round.
          // If UI round is laggy (still shows the old round), we use lastRound + 1.
          const logicalNextRound = Math.max(newRound, ts.lastRound + 1);
          
          ts.lastFinalizedRound = Math.max(ts.lastFinalizedRound, logicalNextRound);

          events.push({
            type: "HAND_COMPLETE",
            tableName: name,
            tableState: ts,
            handNumber: ts.handNumber,
            round: logicalNextRound,
            playerCards: handResult.playerCards,
            bankerCards: handResult.bankerCards,
            cardsSubtracted: handResult.cardsSubtracted,
            deckRemaining: ts.remaining,
            deckComposition: [...ts.deckComposition],
            winner: handResult.winner,
          });
        } else {
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
        }
      } else if (isNowWaiting && newRound > ts.lastRound && ts.lastRound > 0) {
        // Missed Dealing completely, but round advanced.
        // Only finalize if the new round is ahead of the round we last prepared for.
        if (newRound > ts.lastFinalizedRound) {
          const handResult = this._finalizeHand(ts);
          ts.lastFinalizedRound = Math.max(ts.lastFinalizedRound, newRound);
          events.push({
            type: "HAND_COMPLETE",
            tableName: name,
            tableState: ts,
            handNumber: ts.handNumber,
            round: newRound,
            playerCards: handResult.playerCards,
            bankerCards: handResult.bankerCards,
            cardsSubtracted: handResult.cardsSubtracted,
            deckRemaining: ts.remaining,
            deckComposition: [...ts.deckComposition],
            winner: handResult.winner,
          });
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

    for (const card of allCards) {
      const idx = cardRankToIndex(card);
      if (idx >= 0 && ts.deckComposition[idx] > 0) {
        ts.deckComposition[idx]--;
        cardsSubtracted++;
      }
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

    return { playerCards: pCards, bankerCards: bCards, cardsSubtracted, winner };
  }

  _resetShoe(ts, reason) {
    ts.deckComposition = freshShoe();
    ts.handNumber = 0;
    ts.lastFinalizedRound = 0;
    ts.hasWarnedAhead = false;
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
      ts.restored = true; // mark for validation on first live tick
      this.tables.set(name, ts);
    }
    console.log(`\x1b[36m[STATE] Restored ${this.tables.size} tables from saved state\x1b[0m`);
  }
}

module.exports = { TableStateManager, cardRankToIndex, freshShoe, deckRemaining };
