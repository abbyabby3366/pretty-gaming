const http = require("http");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const { MongoClient } = require("mongodb");
const { sendWhatsAppNotification } = require("../utils/whatsapp_notifier");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
let dbCollection = null;

let betConfig = {
  startingBankroll: 1000,
  method: 'kelly',
  kellyFraction: 1.0,
  flatRatio: 0.01,
  rounding: 10,
  maxBet: 500,
  autoBetEnabled: true
};

try {
  const cfgPath = path.join(__dirname, "config.json");
  if (fs.existsSync(cfgPath)) {
    betConfig = JSON.parse(fs.readFileSync(cfgPath, "utf-8"));
  }
} catch (e) {}

function saveConfig() {
  fs.writeFileSync(path.join(__dirname, "config.json"), JSON.stringify(betConfig, null, 2));
}

const PORT = 3456;
const ROOT = path.join(__dirname, "..");

let _stateManager = null;
const betLog = [];
const MAX_BET_LOG = 200;

// Track active bet modules via heartbeat
const activeModules = new Map(); // moduleId -> { baseUrl, lastHeartbeat }
let lastRoundRobinIndex = 0;

function resolveBetModuleTarget() {
  const now = Date.now();
  // Filter modules that sent a heartbeat in the last 35 seconds
  const online = Array.from(activeModules.values()).filter(m => now - m.lastHeartbeat < 35000);
  if (online.length === 0) return null;
  lastRoundRobinIndex = (lastRoundRobinIndex + 1) % online.length;
  return online[lastRoundRobinIndex].baseUrl;
}

function parseJSONBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
  });
}

function startDashboard(stateManager) {
  _stateManager = stateManager;

  // Initialize MongoDB connection
  (async function initDB() {
    try {
      const client = new MongoClient(MONGODB_URI);
      await client.connect();
      const db = client.db("neuron_baccarat");
      dbCollection = db.collection("PRETTYGAMING_BETS");
      
      const recentBets = await dbCollection.find().sort({ time: -1 }).limit(MAX_BET_LOG).toArray();
      for (const b of recentBets) {
        if (!betLog.find(existing => existing.id === b.id)) betLog.push(b);
      }
      betLog.sort((a, b) => new Date(b.time) - new Date(a.time));
      console.log(`[MongoDB] Connected. Loaded ${recentBets.length} recent bets from PRETTYGAMING_BETS.`);
    } catch (err) {
      console.error("[MongoDB] Failed to connect:", err.message);
    }
  })();

  const server = http.createServer(async (req, res) => {
    // API endpoints
    if (req.method === "POST" && req.url.startsWith("/api/bet-module/heartbeat")) {
      try {
        const body = await parseJSONBody(req);
        if (body.moduleId && body.baseUrl) {
          activeModules.set(body.moduleId, {
            baseUrl: body.baseUrl,
            label: body.label || body.moduleId,
            accounts: body.accounts || [],
            lastHeartbeat: Date.now()
          });
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
      return;
    }

    if (req.method === "POST" && req.url.startsWith("/api/telemetry/eyes")) {
      try {
        const body = await parseJSONBody(req);
        
        if (body.status && body.status.gameState === "ROUND_COMPLETE") {
          const betId = body.uuid;
          const existingBet = betLog.find(b => b.id === betId);
          if (existingBet) {
            existingBet.roundOutcome = body.ocr?.winner || "UNKNOWN";
            existingBet.outcomeState = body;
            if (dbCollection) {
              dbCollection.updateOne(
                { id: existingBet.id },
                { $set: { roundOutcome: existingBet.roundOutcome, outcomeState: existingBet.outcomeState } }
              ).catch(() => {});
            }
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: true, action: "OUTCOME_RECORDED", betId }));
          return;
        }

        // Find best target
        let bestTarget = "None";
        let bestEv = -999;
        const evSnapshot = body.mathematics?.evSnapshot || {};
        for (const [target, metricsMap] of Object.entries(evSnapshot)) {
          if (metricsMap.ev && metricsMap.ev > bestEv) {
            bestEv = metricsMap.ev;
            bestTarget = target;
          }
        }

        const targetBaseUrl = resolveBetModuleTarget();
        const betId = body.uuid || ("bet_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5));
        
        let payout = 1;
        if (bestTarget === "BankerBet" || bestTarget === "Banker") payout = 0.95;
        if (bestTarget === "TieBet" || bestTarget === "Tie") payout = 8;
        
        let recommendedBetAmount = 0;
        if (bestEv > 0) {
           let amount = 0;
           if (betConfig.method === 'flat') {
             amount = betConfig.startingBankroll * betConfig.flatRatio;
           } else {
             // Kelly
             let rawKelly = bestEv / payout;
             amount = betConfig.startingBankroll * betConfig.kellyFraction * rawKelly;
           }
           
           if (betConfig.rounding > 0) amount = Math.round(amount / betConfig.rounding) * betConfig.rounding;
           if (amount > betConfig.maxBet) amount = betConfig.maxBet;
           if (amount < betConfig.rounding && amount > 0) amount = betConfig.rounding;
           recommendedBetAmount = amount;
        }
        
        const betEntry = {
          id: betId,
          time: new Date().toISOString(),
          tableName: body.tableNumber,
          round: body.ocr?.roundNumber,
          target: bestTarget,
          ev: bestEv,
          targetModule: targetBaseUrl || "NONE",
          reasonState: body,
          executionState: null,
          outcomeState: null,
          outcome: !betConfig.autoBetEnabled ? "AUTOBET_DISABLED" : (targetBaseUrl ? "PENDING" : "NO_MODULES_ONLINE"),
          recommendedBetAmount: recommendedBetAmount,
          actualBetAmount: "-",
          roundOutcome: "WAITING"
        };
        
        betLog.unshift(betEntry);
        if (betLog.length > MAX_BET_LOG) betLog.length = MAX_BET_LOG;

        if (dbCollection) {
          dbCollection.insertOne(betEntry).catch(() => {});
        }

        if (!betConfig.autoBetEnabled) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: true, action: "SKIPPED", reason: "Auto Bet is disabled", betId }));
          return;
        }

        if (!targetBaseUrl) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: true, action: "QUEUED", reason: "No active bet modules", betId }));
          return;
        }

        // Send to bet module
        fetch(targetBaseUrl + "/prettygaming/bet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(betEntry)
        }).catch(err => {
          console.error("[Central] Failed to dispatch bet:", err.message);
          betEntry.outcome = "NETWORK_ERROR";
        });

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, action: "DISPATCHED", betId }));
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
      return;
    }

    if (req.method === "POST" && req.url.startsWith("/api/telemetry/bet-result")) {
      try {
        const body = await parseJSONBody(req);
        const bet = betLog.find(b => b.id === body.betId);
        if (bet) {
          bet.outcome = body.status;
          bet.executionState = body;
          if (body.status === "SUCCESS") {
            bet.actualBetAmount = body.actualBetAmount || bet.recommendedBetAmount;
          }
          if (dbCollection) {
            dbCollection.updateOne(
              { id: bet.id },
              { $set: { outcome: bet.outcome, actualBetAmount: bet.actualBetAmount, executionState: bet.executionState } }
            ).catch(() => {});
          }
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
      return;
    }

    if (req.method === "POST" && req.url.startsWith("/clear-bet-logs")) {
      betLog.length = 0;
      if (dbCollection) {
        dbCollection.deleteMany({}).catch(() => {});
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, message: "Cleared all bets" }));
      return;
    }

    if (req.method === "GET" && req.url.startsWith("/api/config")) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, config: betConfig }));
      return;
    }

    if (req.method === "POST" && req.url.startsWith("/api/config")) {
      try {
        const body = await parseJSONBody(req);
        betConfig = { ...betConfig, ...body };
        saveConfig();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, config: betConfig }));
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
      return;
    }

    if (req.method === "GET" && req.url.startsWith("/api/bets")) {
      let lastUpdated = null;
      try {
        const stats = fs.statSync(path.join(ROOT, "tables_state.json"));
        lastUpdated = stats.mtime.toISOString();
      } catch (e) {}

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ 
        ok: true, 
        betLog, 
        activeModules: Array.from(activeModules.values()),
        lastUpdated
      }));
      return;
    }

    if (req.method === "POST" && req.url === "/reset-all") {
      if (!_stateManager) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "No state manager" }));
        return;
      }
      for (const ts of _stateManager.tables.values()) {
        _stateManager._resetShoe(ts, "Manual reset all from dashboard");
      }
      
      sendWhatsAppNotification("[DASHBOARD] User manually reset ALL tables to fresh shoes.")
        .catch(err => console.error("WhatsApp Notification failed:", err));

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, message: "All tables reset" }));
      return;
    }

    if (req.method === "POST" && req.url.startsWith("/reset?")) {
      const url = new URL(req.url, `http://localhost:${PORT}`);
      const tableName = url.searchParams.get("table");

      if (!tableName || !_stateManager) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Missing table param" }));
        return;
      }

      const ts = _stateManager.getTable(tableName);
      if (!ts) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: `Table ${tableName} not found` }));
        return;
      }

      _stateManager._resetShoe(ts, "Manual reset from dashboard");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, table: tableName, deckRemaining: ts.remaining }));
      return;
    }

    // GET routes
    let filePath;
    if (req.url === "/" || req.url === "/index.html") {
      filePath = path.join(__dirname, "index.html");
    } else if (req.url === "/bets.html" || req.url === "/bets") {
      filePath = path.join(__dirname, "bets.html");
    } else if (req.url.startsWith("/tables_state.json")) {
      filePath = path.join(ROOT, "tables_state.json");
    } else {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath);
    const contentType = ext === ".html" ? "text/html" : "application/json";

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("File not found");
        return;
      }
      res.writeHead(200, {
        "Content-Type": contentType,
        "Cache-Control": "no-cache",
      });
      res.end(data);
    });
  });

  server.listen(PORT, () => {
    console.log(`Dashboard → http://localhost:${PORT}`);
  });
}

module.exports = { startDashboard };

if (require.main === module) {
  startDashboard(null);
}
