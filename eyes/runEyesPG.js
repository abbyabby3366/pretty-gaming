const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { scrapePG } = require("./scrapePG");
const { TableStateManager } = require("./tableStateManager");
const { calculateEV } = require("./evCalculator");

const stateManager = new TableStateManager();
const eventLog = []; // In-memory event log, max 100 entries
const MAX_EVENT_LOG = 100;

// ─── State Persistence ───────────────────────────────────────────────────

const STATE_FILE = path.join(__dirname, "..", "eyes_state.json");

function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const raw = JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));

      // Check staleness — if saved more than 1 hour ago, start fresh
      const savedAt = raw.savedAt ? new Date(raw.savedAt).getTime() : 0;
      const ageMs = Date.now() - savedAt;
      const ageMin = Math.round(ageMs / 60000);

      const maxAgeMin = parseInt(process.env.STATE_MAX_AGE_MINUTES) || 60;
      if (ageMs > maxAgeMin * 60 * 1000) {
        console.log(`\x1b[33m[STATE] Saved state is ${ageMin}min old (>${maxAgeMin}min), starting fresh.\x1b[0m`);
        return;
      }

      console.log(`\x1b[36m[STATE] State is ${ageMin}min old, restoring...\x1b[0m`);
      stateManager.restore(raw.tables || {});
      // Restore event log
      if (raw.eventLog && Array.isArray(raw.eventLog)) {
        eventLog.push(...raw.eventLog.slice(0, MAX_EVENT_LOG));
      }
    }
  } catch (e) {
    console.log(`[STATE] No saved state found or corrupted, starting fresh.`);
  }
}

function saveState() {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify({
      savedAt: new Date().toISOString(),
      tables: stateManager.serialize(),
      eventLog: eventLog,
    }));
  } catch (e) {
    // silent
  }
}

// Load on startup
loadState();

// Save on exit
process.on("SIGINT", () => { saveState(); process.exit(0); });
process.on("SIGTERM", () => { saveState(); process.exit(0); });

// ─── Formatting Helpers ──────────────────────────────────────────────────

function fmtEv(ev) {
  const pct = (ev * 100).toFixed(3);
  return ev >= 0 ? `\x1b[32m+${pct}%\x1b[0m` : `\x1b[31m${pct}%\x1b[0m`;
}

function fmtProb(p) {
  return (p * 100).toFixed(2) + "%";
}

// ─── Step 2: Analyse State ───────────────────────────────────────────────

function analyseState(tables) {
  return stateManager.update(tables);
}

// ─── Step 3: Calculate EV (only on relevant events) ──────────────────────

function calculateEVForEvents(events) {
  for (const event of events) {
    if (event.type !== "HAND_COMPLETE" && event.type !== "STATE_CHANGE") continue;

    const ts = event.tableState;
    const evResult = calculateEV(event.deckComposition);
    if (evResult) {
      ts.lastEvResult = evResult;
    }
  }
}

// ─── Step 4: Send POST if edge found (placeholder) ──────────────────────

function sendSignals(events) {
  for (const event of events) {
    if (event.type !== "HAND_COMPLETE" && event.type !== "STATE_CHANGE") continue;
    const ts = event.tableState;
    if (!ts.lastEvResult || !ts.lastEvResult.best) continue;

    // Generate a new UUID if this is the start of a betting phase
    if (event.type === "STATE_CHANGE") {
      ts.currentBetId = crypto.randomUUID();
    }
    
    // Skip sending outcome if we never sent a bet for this hand
    if (!ts.currentBetId) continue;

    const payload = {
      uuid: ts.currentBetId,
      instanceID: "PG_Eyes",
      tableNumber: event.tableName,
      status: { 
        setup: "READY", 
        autoBet: true, 
        gameState: event.type === "HAND_COMPLETE" ? "ROUND_COMPLETE" : "WAITING_FOR_BETS" 
      },
      ocr: { 
        roundNumber: String(event.round),
        ...(event.type === "HAND_COMPLETE" ? { winner: event.winner } : {})
      },
      metrics: { deckRemaining: ts.remaining },
      mathematics: {
        deckComposition: ts.deckComposition,
        evSnapshot: {
          "PlayerBet": { ev: ts.lastEvResult.ev_player, prob: ts.lastEvResult.p_player },
          "BankerBet": { ev: ts.lastEvResult.ev_banker, prob: ts.lastEvResult.p_banker },
          "TieBet": { ev: ts.lastEvResult.ev_tie, prob: ts.lastEvResult.p_tie }
        }
      }
    };

    console.log(`\n\x1b[36m[DEBUG SIGNAL PAYLOAD]\x1b[0m\n${JSON.stringify(payload, null, 2)}`);

    fetch("http://localhost:3456/api/telemetry/eyes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      console.log(`  \x1b[35m[SIGNAL] Sent to Central: ${data.action} (BetId: ${data.betId || ts.currentBetId})\x1b[0m`);
    })
    .catch(err => {
      console.log(`  \x1b[31m[SIGNAL] Failed to send to Central: ${err.message}\x1b[0m`);
    });
    
    // Clear the bet ID after sending the hand outcome
    if (event.type === "HAND_COMPLETE") {
      ts.currentBetId = null;
    }
  }
}

// ─── Write State JSON (after Step 2, before EV) ─────────────────────────

function writeStateJson(tables, timestamp, events) {
  const stateSnapshot = [];
  for (const table of tables) {
    const ts = stateManager.getTable(table.tableName);

    stateSnapshot.push({
      // ── Live scrape data ──
      tableName: table.tableName,
      state: table.state,
      timer: table.timer,
      round: table.round,
      wins: table.wins,

      // ── State manager tracking ──
      previousState: ts ? ts.lastState : null,
      handNumber: ts ? ts.handNumber : 0,
      deckRemaining: ts ? ts.remaining : 416,
      deckComposition: ts ? ts.deckComposition : null,
      // Labelled for readability: { A:32, 2:32, ..., K:32 }
      deckLabelled: ts
        ? {
            A: ts.deckComposition[0],
            "2": ts.deckComposition[1],
            "3": ts.deckComposition[2],
            "4": ts.deckComposition[3],
            "5": ts.deckComposition[4],
            "6": ts.deckComposition[5],
            "7": ts.deckComposition[6],
            "8": ts.deckComposition[7],
            "9": ts.deckComposition[8],
            T: ts.deckComposition[9],
            J: ts.deckComposition[10],
            Q: ts.deckComposition[11],
            K: ts.deckComposition[12],
          }
        : null,
      lastPlayerCards: ts ? ts.lastPlayerCards : [],
      lastBankerCards: ts ? ts.lastBankerCards : [],
      bufferedCards: ts ? ts.bufferedCards : { player: [], banker: [] },

      // ── EV results (from previous calculation, updated after Step 3) ──
      ev: ts && ts.lastEvResult
        ? {
            player: { ev: ts.lastEvResult.ev_player, evBase: ts.lastEvResult.ev_player_base, prob: ts.lastEvResult.p_player },
            banker: { ev: ts.lastEvResult.ev_banker, evBase: ts.lastEvResult.ev_banker_base, prob: ts.lastEvResult.p_banker },
            tie: { ev: ts.lastEvResult.ev_tie, prob: ts.lastEvResult.p_tie },
            rebate: ts.lastEvResult.rebate,
            best: ts.lastEvResult.best,
          }
        : null,
    });
  }

  // Include events summary for this tick
  const eventsSummary = events.map((e) => ({
    type: e.type,
    tableName: e.tableName,
    ...(e.winner ? { winner: e.winner } : {}),
    ...(e.cardsSubtracted ? { cardsSubtracted: e.cardsSubtracted } : {}),
    ...(e.reason ? { reason: e.reason } : {}),
  }));

  fs.writeFileSync(
    path.join(__dirname, "..", "tables_state.json"),
    JSON.stringify(
      {
        timestamp,
        totalTables: stateSnapshot.length,
        config: {
          minEvThreshold: parseFloat(process.env.MIN_EV_THRESHOLD) || 0.0003,
          rebateRate: parseFloat(process.env.REBATE_RATE) || 0.012,
        },
        eventsThisTick: eventsSummary,
        eventLog: eventLog,
        tables: stateSnapshot,
      },
      null,
      2
    )
  );
}

// ─── Main Orchestrator ───────────────────────────────────────────────────

async function runEyesPG(page, extractorCode) {
  let consecutiveErrors = 0;
  
  while (!page.isClosed()) {
    try {
      const startTime = Date.now();

      // Step 1: Scrape
      const data = await scrapePG(page, extractorCode);
      if (!data) {
        await new Promise(r => setTimeout(r, 1000));
        continue;
      }

      const { text, tables } = data;

      // Write human-readable text log
      const timestamp = new Date()
        .toISOString()
        .replace(/:/g, "-")
        .split(".")[0];
      fs.writeFileSync(
        path.join(__dirname, "..", "scrape_log.txt"),
        `\n\n--- [${timestamp}] ---\n${text}`
      );

      if (tables && tables.length > 0) {
        // Step 2: Analyse state transitions
        const events = analyseState(tables);

        // Write complete state JSON (right after analysis, before EV calc)
        writeStateJson(tables, timestamp, events);

        if (events.length > 0) {
          // Step 3: Calculate EV for state-change events
          calculateEVForEvents(events);

          // Record events to in-memory log
          for (const e of events) {
            if (e.type !== "HAND_COMPLETE" && e.type !== "STATE_CHANGE") continue;
            const ts = e.tableState;
            eventLog.unshift({
              time: new Date().toISOString(),
              type: e.type,
              table: e.tableName,
              round: e.round,
              winner: e.winner || null,
              playerCards: e.playerCards || [],
              bankerCards: e.bankerCards || [],
              cardsSubtracted: e.cardsSubtracted || 0,
              deckRemaining: ts.remaining,
              ev: ts.lastEvResult
                ? { player: ts.lastEvResult.ev_player, banker: ts.lastEvResult.ev_banker, best: ts.lastEvResult.best }
                : null,
            });
          }
          if (eventLog.length > MAX_EVENT_LOG) eventLog.length = MAX_EVENT_LOG;

          // Step 4: Send POST signals if edge found
          sendSignals(events);

          // Re-write state JSON after EV calculation (now includes fresh EV results)
          writeStateJson(tables, timestamp, events);
        }
      }

      // Persist state to disk
      saveState();

      // Reset consecutive errors on successful cycle
      consecutiveErrors = 0;

      // duration tracking
      const interval = process.env.SCRAPE_INTERVAL ? parseInt(process.env.SCRAPE_INTERVAL) : 500;
      const elapsed = Date.now() - startTime;
      if (elapsed < interval) {
        await new Promise(r => setTimeout(r, interval - elapsed));
      }

    } catch (err) {
      console.error("Error during runPG cycle:", err.message);
      
      // If the page is detached, closed, or context destroyed, initiate recovery
      if (err.message.includes("detached Frame") || 
          err.message.includes("Execution context was destroyed") || 
          err.message.includes("Target closed")) {
          consecutiveErrors++;
          if (consecutiveErrors >= 3) {
             console.log("\x1b[31m[RECOVERY] Too many critical page errors. Requesting relaunch...\x1b[0m");
             return false;
          }
      }
      
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  
  console.log("\x1b[31m[RECOVERY] Page was closed manually or crashed. Requesting relaunch...\x1b[0m");
  return false;
}

module.exports = { runEyesPG, stateManager };
