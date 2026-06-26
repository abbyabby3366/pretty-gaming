/**
 * tableStateManager.js — Per-table state tracking for Pretty Gaming lobby
 *
 * Tracks state transitions, deck composition, and card history for each table.
 * Detects state changes that trigger EV recalculation using clean, server-provided network telemetry.
 *
 * 13-slot composition: [A, 2, 3, 4, 5, 6, 7, 8, 9, T, J, Q, K]
 * Each slot = remaining count for that rank across all suits in the shoe.
 */

const { sendWhatsAppNotification } = require('../utils/whatsapp_notifier');
const { checkTickValidations, checkImpossibleCard, checkGhostHands } = require('./stateValidators');
function mapServerCodeToWinner(code) {
  if (!code) return null;
  if (code.startsWith('p')) return 'P';
  if (code.startsWith('b')) return 'B';
  if (code.startsWith('t')) return 'T';
  return null;
}

function verifyCardsMatchOutcome(playerCards, bankerCards, expectedCode) {
  if (!expectedCode || !playerCards || !bankerCards) return false;
  if (playerCards.length < 2 || playerCards.length > 3 || bankerCards.length < 2 || bankerCards.length > 3) return false;
  
  const code = expectedCode.toLowerCase();
  
  // 1. Calculate Baccarat Scores
  const getBaccaratScore = (cards) => {
    let score = 0;
    for (const card of cards) {
      const rank = card.slice(0, -1).toUpperCase();
      let val = 0;
      if (rank === "A") val = 1;
      else if (["T", "J", "Q", "K", "10"].includes(rank)) val = 0;
      else {
        val = parseInt(rank, 10);
        if (isNaN(val)) val = 0;
      }
      score += val;
    }
    return score % 10;
  };
  
  const pScore = getBaccaratScore(playerCards);
  const bScore = getBaccaratScore(bankerCards);
  
  // 2. Determine Winner
  let determinedWinner = "";
  if (pScore > bScore) determinedWinner = "P";
  else if (pScore < bScore) determinedWinner = "B";
  else determinedWinner = "T";
  
  let expectedWinner = "";
  if (code.startsWith('p')) expectedWinner = "P";
  else if (code.startsWith('b')) expectedWinner = "B";
  else if (code.startsWith('t')) expectedWinner = "T";
  
  if (determinedWinner !== expectedWinner) return false;
  
  // 3. Determine Pairs
  const hasPlayerPair = playerCards.length >= 2 && playerCards[0].slice(0, -1) === playerCards[1].slice(0, -1);
  const hasBankerPair = bankerCards.length >= 2 && bankerCards[0].slice(0, -1) === bankerCards[1].slice(0, -1);
  
  // After the first character (winner), 'p' in suffix = player pair, 'b' in suffix = banker pair
  // e.g., 'ppb' -> suffix 'pb' -> player pair + banker pair; 'tpb' -> suffix 'pb' -> both pairs
  const pairSuffix = code.slice(1);
  const expectsPlayerPair = pairSuffix.includes('p');
  const expectsBankerPair = pairSuffix.includes('b');
  
  if (hasPlayerPair !== expectsPlayerPair) return false;
  if (hasBankerPair !== expectsBankerPair) return false;
  
  return true;
}

// ─── Card Name → 13-slot Rank Index ─────────────────────────────────────
// Index: 0=A, 1=2, 2=3, 3=4, 4=5, 5=6, 6=7, 7=8, 8=9, 9=T, 10=J, 11=Q, 12=K

function cardRankToIndex(cardName) {
  if (!cardName || cardName === "Red") return -1;

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
    this.lastFinalizedRound = 0;
    this.lastPlayerCards = [];
    this.lastBankerCards = [];
    this.lastEvResult = null;
    this.bufferedCards = { player: [], banker: [] };
    this.currentBetId = null;
    this.restored = false;
    this.hasWarnedAhead = false;
    this.consecutiveZeroCardHands = 0;
    this.handFinalizedForCycle = false;
    this.lastErrorResetReason = null;
    this.lastErrorResetTime = null;
    this.deducedBeadRoad = [];
    this.consecutiveResetTicks = 0;
    this.pendingResetReason = null;
    this.shoeResetCount = 0;
    this.shoeAlreadyReset = false;
  }

  get remaining() {
    return deckRemaining(this.deckComposition);
  }

  reconcileRound(round, playerCards, bankerCards, expectedCode) {
    if (!verifyCardsMatchOutcome(playerCards, bankerCards, expectedCode)) {
      console.log(`\x1b[31m[RECONCILE] ${this.tableName} Verification failed for R${round}: cards [P:${playerCards.join(",")}, B:${bankerCards.join(",")}] do not match code "${expectedCode}"\x1b[0m`);
      return false;
    }
    
    let winner = "T";
    if (expectedCode.toLowerCase().startsWith('p')) winner = "P";
    else if (expectedCode.toLowerCase().startsWith('b')) winner = "B";
    
    const existingIndex = this.deducedBeadRoad.findIndex(item => item && item.round === round);
    
    if (existingIndex >= 0) {
      const oldItem = this.deducedBeadRoad[existingIndex];
      const cardsIdentical = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false;
        return arr1.every((val, index) => val === arr2[index]);
      };
      
      if (oldItem.winner === winner && cardsIdentical(oldItem.playerCards || [], playerCards) && cardsIdentical(oldItem.bankerCards || [], bankerCards)) {
        return true; 
      }
      
      const msg = `[RECONCILE] ${this.tableName} R${round} discrepancy corrected successfully! Replaced [P:${oldItem.playerCards || []}, B:${oldItem.bankerCards || []}] with verified [P:${playerCards.join(",")}, B:${bankerCards.join(",")}]`;
      console.log(`\x1b[33m${msg}\x1b[0m`);
      
      const allOldCards = [...(oldItem.playerCards || []), ...(oldItem.bankerCards || [])];
      for (const card of allOldCards) {
        const idx = cardRankToIndex(card);
        if (idx >= 0 && this.deckComposition[idx] < 32) {
          this.deckComposition[idx]++;
        }
      }
      
      oldItem.playerCards = playerCards;
      oldItem.bankerCards = bankerCards;
      oldItem.winner = winner;
      oldItem.isReconciled = true;
    } else {
      const msg = `[RECONCILE] ${this.tableName} R${round} gap recovered successfully! Cards: [P:${playerCards.join(",")}, B:${bankerCards.join(",")}]`;
      console.log(`\x1b[36m${msg}\x1b[0m`);
      
      this.deducedBeadRoad.push({
        round: round,
        winner: winner,
        playerCards: playerCards,
        bankerCards: bankerCards,
        isReconciled: true
      });
      this.deducedBeadRoad.sort((a, b) => a.round - b.round);
    }
    
    const allNewCards = [...playerCards, ...bankerCards];
    for (const card of allNewCards) {
      const idx = cardRankToIndex(card);
      if (idx >= 0 && this.deckComposition[idx] > 0) {
        this.deckComposition[idx]--;
      }
    }
    
    if (round > this.lastFinalizedRound) {
      this.lastFinalizedRound = round;
      this.lastPlayerCards = playerCards.slice();
      this.lastBankerCards = bankerCards.slice();
    }
    
    return true;
  }
}

// ─── State Manager ───────────────────────────────────────────────────────

class TableStateManager {
  constructor() {
    /** @type {Map<string, TableState>} */
    this.tables = new Map();
    this.lastResetNotificationTime = new Map();
  }

  /**
   * Update all table states from a scrape tick.
   * @param {Array} tableDataArray - Array of table objects from the new memory scraper
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
      const isShuffling = newState && newState.toLowerCase().includes("shuff");
      const wasShuffling = prevState && prevState.toLowerCase().includes("shuff");
      let newRound = table.round;

      // If a new shoe has officially started (round 1), clear the deduced bead road
      if (newRound === 1 && ts.lastRound !== 1) {
        ts.deducedBeadRoad = [];
      }

      // Clear the shuffle-reset guard when the table leaves shuffling state
      if (!isShuffling && ts.shoeAlreadyReset) {
        ts.shoeAlreadyReset = false;
      }
      // ── Verify deduced outcomes match server statistics history ──
      if (ts.deducedBeadRoad && ts.deducedBeadRoad.length > 0 && table.statistics && table.statistics.length > 0) {
        let mismatchFound = false;
        let mismatchDetails = "";

        for (const item of ts.deducedBeadRoad) {
          if (item && typeof item === 'object') {
            const rNum = item.round;
            if (rNum <= table.statistics.length) {
              const serverCode = table.statistics[rNum - 1];
              const serverWinner = mapServerCodeToWinner(serverCode);

              if (serverWinner && item.winner !== serverWinner) {
                mismatchFound = true;
                mismatchDetails = `Round ${rNum} mismatch: Deduced ${item.winner} vs Server ${serverWinner}`;
                break;
              }
            }
          }
        }

        if (mismatchFound) {
          const now = Date.now();
          const rateLimitKey = `${ts.tableName}:mismatch:${mismatchDetails}`;
          const lastSent = this.lastResetNotificationTime ? (this.lastResetNotificationTime.get(rateLimitKey) || 0) : 0;
          const isSpam = (now - lastSent) < 5 * 60 * 1000; // 5 min rate limit

          const msg = `[WARNING] ${ts.tableName} Bead Road Discrepancy! ${mismatchDetails}`;
          if (!isSpam) {
            console.log(`\x1b[31m${msg}\x1b[0m`);
            // sendWhatsAppNotification(msg).catch(err => console.error("WhatsApp Notification failed:", err));
            if (this.lastResetNotificationTime) {
              this.lastResetNotificationTime.set(rateLimitKey, now);
            }
          }
          
          // Do not auto-clear to allow dashboard visualization of the mismatch.
        }
      }



      // ── Bulletproof Shoe Reset Fallbacks (e.g. if we missed "Shuffling" state transition) ──
      let forceReset = false;
      let resetReason = "";

      if (newRound > 0 && ts.lastRound > 0 && newRound < ts.lastRound) {
        forceReset = true;
        resetReason = `Round number decreased from ${ts.lastRound} to ${newRound}`;
      } else if (table.statistics && table.statistics.length === 0 && ts.lastRound > 1 && !isShuffling) {
        forceReset = true;
        resetReason = "Shuffling detected (empty statistics)";
      }

      // Track consecutive occurrences of the fallback trigger to filter out transient network glitches
      if (forceReset) {
        ts.consecutiveResetTicks = (ts.consecutiveResetTicks || 0) + 1;
        if (!ts.pendingResetReason) {
          ts.pendingResetReason = resetReason;
        }
      } else {
        ts.consecutiveResetTicks = 0;
        ts.pendingResetReason = null;
      }

      // ── Reset shoe instantly on Shuffling state or Fallback Triggers (requiring 2 consecutive ticks) ──
      let triggerReset = false;
      let reason = "";

      if (isShuffling) {
        // Only reset once per shuffling period. The old check `ts.remaining !== 416`
        // caused infinite reset loops: async reconciliation would recover R1 cards
        // (modifying remaining), then the next tick would see remaining !== 416 and
        // reset again, wiping the recovered data in an endless cycle.
        if (!ts.shoeAlreadyReset) {
          triggerReset = true;
          reason = "Shuffling state detected";
        }
      } else if (forceReset && ts.consecutiveResetTicks >= 2) {
        triggerReset = true;
        reason = ts.pendingResetReason || resetReason;
      }

      if (triggerReset) {
        this._resetShoe(ts, reason);
        events.push({
          type: "SHOE_RESET",
          tableName: name,
          reason: reason,
          isActualShuffle: true,
          finalRound: ts.lastRound
        });
        ts.shoeAlreadyReset = true;
        ts.lastState = newState;
        ts.lastRound = 0; // Prevent second trigger when newRound transitions to 1 in the next tick
        continue;
      }

      // ── Process hand completion cleanly when server transitions to Result ──
      const isResultState = newState.startsWith("Result");
      const isAlreadyFinalized = ts.deducedBeadRoad && ts.deducedBeadRoad.some(item => item && item.round === newRound);
      const hasCards = (table.playerCards && table.playerCards.length > 0) || (table.bankerCards && table.bankerCards.length > 0);
      if (isResultState && newRound > ts.lastFinalizedRound && newRound > 0 && hasCards) {
        if (isAlreadyFinalized) {
          const msg = `[WARNING] ${ts.tableName}: Double-deduction attempt guarded for completed round ${newRound}! Round already present in deduced bead road.`;
          const rateLimitKey = `${ts.tableName}:double_deduct:${newRound}`;
          const now = Date.now();
          const lastSent = this.lastResetNotificationTime ? (this.lastResetNotificationTime.get(rateLimitKey) || 0) : 0;
          const isSpam = (now - lastSent) < 5 * 60 * 1000;

          if (!isSpam) {
            console.log(`\x1b[31m${msg}\x1b[0m`);
            // sendWhatsAppNotification(msg).catch(err => console.error("WhatsApp Notification failed:", err));
            if (this.lastResetNotificationTime) {
              this.lastResetNotificationTime.set(rateLimitKey, now);
            }
          }
        } else {
          // Extract cards and subtract them from deck composition
          let cardsSubtracted = 0;
          let corruptedReason = null;
          const allCards = [...table.playerCards, ...table.bankerCards];

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
            if ((cardsSubtracted < 4 || cardsSubtracted > 6) && !corruptedReason) {
              corruptedReason = `Invalid state: mathematically impossible cards count (${cardsSubtracted}) for completed round ${newRound}`;
            }
          }

          ts.lastPlayerCards = table.playerCards.slice();
          ts.lastBankerCards = table.bankerCards.slice();
          ts.lastFinalizedRound = newRound;

          if (corruptedReason) {
            this._resetShoe(ts, corruptedReason);
            events.push({
              type: "SHOE_RESET",
              tableName: name,
              reason: corruptedReason,
              finalRound: ts.lastRound
            });
          } else {
            if (table.winner) {
              ts.deducedBeadRoad.push({ 
                round: newRound, 
                winner: table.winner,
                playerCards: table.playerCards || [],
                bankerCards: table.bankerCards || []
              });
            }

            events.push({
              type: "HAND_COMPLETE",
              tableName: name,
              tableState: ts,
              round: newRound,
              playerCards: table.playerCards,
              bankerCards: table.bankerCards,
              cardsSubtracted: cardsSubtracted,
              deckRemaining: ts.remaining,
              deckComposition: [...ts.deckComposition],
              winner: table.winner,
            });
          }
        }
      }

      // ── External Validations ──
      const tickInvalidReason = checkTickValidations(ts, newRound, newState, prevState);

      if (ts.restored) {
        ts.restored = false;
        if (!tickInvalidReason && newRound >= ts.lastRound) {
          console.log(`\x1b[36m[STATE] ${name}: Validated (saved R${ts.lastRound} → live R${newRound})\x1b[0m`);
        }
      }

      if (tickInvalidReason) {
        this._resetShoe(ts, tickInvalidReason);
        events.push({
          type: "SHOE_RESET",
          tableName: name,
          reason: tickInvalidReason,
          finalRound: ts.lastRound
        });
      }

      // ── Dispatch generic state transitions ──
      if (newState !== prevState && !events.some(e => e.tableName === name)) {
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

      ts.lastState = newState;
      const isShufflingOrTransition = isShuffling || (table.statistics && table.statistics.length === 0 && newRound > 1);
      if (isShufflingOrTransition) {
        ts.lastRound = 0;
      } else if (!forceReset) {
        ts.lastRound = newRound;
      }
    }

    return events;
  }

  _resetShoe(ts, reason) {
    // Append the last round if not already mentioned in the reason
    const roundInfo = (ts.lastRound > 0 && !reason.includes("decreased from") && !reason.includes("reset from"))
      ? `, last round was ${ts.lastRound}`
      : '';
    const msg = `[SHOE] ${ts.tableName}: Reset to fresh shoe (Reason: ${reason}${roundInfo})`;
    const rateLimitKey = `${ts.tableName}:${reason}`;
    const now = Date.now();
    const lastSent = this.lastResetNotificationTime ? (this.lastResetNotificationTime.get(rateLimitKey) || 0) : 0;
    const isSpam = (now - lastSent) < 15 * 60 * 1000;

    ts.deckComposition = freshShoe();
    ts.lastFinalizedRound = 0;
    ts.shoeResetCount = (ts.shoeResetCount || 0) + 1;
    ts.hasWarnedAhead = false;
    ts.consecutiveZeroCardHands = 0;
    ts.handFinalizedForCycle = false;
    ts.bufferedCards = { player: [], banker: [] };
    ts.lastPlayerCards = [];
    ts.lastBankerCards = [];
    ts.lastEvResult = null;
    
    // Always clear deduced road when shoe is reset to avoid double-deduction freezes
    ts.deducedBeadRoad = [];
    ts.consecutiveResetTicks = 0;
    ts.pendingResetReason = null;
    
    if (reason && reason.startsWith('Invalid state')) {
      ts.lastErrorResetReason = reason;
      ts.lastErrorResetTime = Date.now();
    } else {
      ts.lastErrorResetReason = null;
      ts.lastErrorResetTime = null;
    }

    if (!isSpam) {
      console.log(`\x1b[33m${msg}\x1b[0m`);
    }
    
    if (reason.startsWith('Invalid state')) {
      if (!isSpam) {
        // sendWhatsAppNotification(msg).catch(err => console.error("WhatsApp Notification failed:", err));
        if (this.lastResetNotificationTime) {
          this.lastResetNotificationTime.set(rateLimitKey, now);
        }
      }
    }
  }

  getTable(tableName) {
    return this.tables.get(tableName) || null;
  }

  serialize() {
    const data = {};
    for (const [name, ts] of this.tables) {
      data[name] = {
        tableName: ts.tableName,
        lastState: ts.lastState,
        lastRound: ts.lastRound,
        deckComposition: ts.deckComposition,
        lastFinalizedRound: ts.lastFinalizedRound,
        lastPlayerCards: ts.lastPlayerCards,
        lastBankerCards: ts.lastBankerCards,
        lastEvResult: ts.lastEvResult,
        bufferedCards: ts.bufferedCards,
        currentBetId: ts.currentBetId,
        consecutiveZeroCardHands: ts.consecutiveZeroCardHands,
        lastErrorResetReason: ts.lastErrorResetReason,
        lastErrorResetTime: ts.lastErrorResetTime,
        deducedBeadRoad: ts.deducedBeadRoad,
      };
    }
    return data;
  }

  restore(data) {
    if (!data || typeof data !== "object") return;
    const normalizeCard = (c) => {
      if (!c || c === "null" || c === "Red") return c;
      if (c.startsWith("10")) return "T" + c.slice(2);
      return c;
    };

    for (const [name, saved] of Object.entries(data)) {
      const ts = new TableState(name);
      ts.lastState = saved.lastState || null;
      ts.lastRound = saved.lastRound || 0;
      ts.deckComposition = saved.deckComposition || freshShoe();
      ts.lastFinalizedRound = saved.lastFinalizedRound || saved.lastRound || 0;
      ts.lastPlayerCards = (saved.lastPlayerCards || []).map(normalizeCard);
      ts.lastBankerCards = (saved.lastBankerCards || []).map(normalizeCard);
      ts.lastEvResult = saved.lastEvResult || null;
      ts.bufferedCards = saved.bufferedCards || { player: [], banker: [] };
      ts.currentBetId = saved.currentBetId || null;
      ts.consecutiveZeroCardHands = saved.consecutiveZeroCardHands || 0;
      ts.lastErrorResetReason = saved.lastErrorResetReason || null;
      ts.lastErrorResetTime = saved.lastErrorResetTime || null;
      
      ts.deducedBeadRoad = (saved.deducedBeadRoad || []).map(item => {
        if (item && typeof item === 'object') {
          return {
            ...item,
            playerCards: (item.playerCards || []).map(normalizeCard),
            bankerCards: (item.bankerCards || []).map(normalizeCard)
          };
        }
        return item;
      });

      ts.restored = true;
      this.tables.set(name, ts);
    }
    console.log(`\x1b[36m[STATE] Restored ${this.tables.size} tables from saved state\x1b[0m`);
  }
}

module.exports = { TableStateManager, cardRankToIndex, freshShoe, deckRemaining };
