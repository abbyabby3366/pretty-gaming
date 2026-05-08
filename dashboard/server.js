const http = require("http");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const { MongoClient } = require("mongodb");
const { sendWhatsAppNotification } = require("../utils/whatsapp_notifier");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
let dbCollection = null;

let betConfig = {
  mode: 'round_robin',
  startingBankroll: 1000,
  method: 'kelly',
  kellyFraction: 1.0,
  flatRatio: 0.01,
  rounding: 10,
  maxBet: 500,
  autoBetEnabled: true,
  minAccountBalance: 1000
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
const activeModules = new Map(); // moduleId -> { baseUrl, lastHeartbeat, label }
const cumulativeProfitMap = {};
const todayProfitMap = {};

function getTodayStart() {
  const now = new Date();
  const today12pm = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0);
  if (now < today12pm) {
     const yesterday12pm = new Date(today12pm);
     yesterday12pm.setDate(yesterday12pm.getDate() - 1);
     return yesterday12pm;
  }
  return today12pm;
}

let lastRoundRobinIndex = 0;

function resolveBetModuleTarget() {
  const now = Date.now();
  // Filter modules that sent a heartbeat in the last 35 seconds
  let online = Array.from(activeModules.values()).filter(m => now - m.lastHeartbeat < 35000);
  
  if (betConfig.minAccountBalance != null && betConfig.minAccountBalance > 0) {
    online = online.filter(m => {
      if (m.accounts && m.accounts.length > 0) {
        // If ANY account has balance < minAccountBalance, exclude this module
        const hasLowBalance = m.accounts.some(acc => {
          if (acc.balance != null) {
            const cleanBalance = String(acc.balance).replace(/[^0-9.]/g, '');
            const parsedBalance = parseFloat(cleanBalance);
            if (!isNaN(parsedBalance)) {
              return parsedBalance < betConfig.minAccountBalance;
            }
          }
          return false;
        });
        return !hasLowBalance;
      }
      return true; // Keep modules with no reported account balances just in case
    });
  }

  // ONLY allow modules that are fully launched and accepting bets
  online = online.filter(m => {
    if (m.accounts && m.accounts.length > 0) {
       return m.accounts.some(acc => acc.isAcceptingBets === true);
    }
    return false; // If no accounts reported, don't blindly route to it
  });

  if (online.length === 0) return null;
  
  if (betConfig.mode === 'round_robin' || !betConfig.mode) {
    lastRoundRobinIndex = (lastRoundRobinIndex + 1) % online.length;
    return online[lastRoundRobinIndex].baseUrl;
  }
  
  // Default fallback if mode isn't recognized or we add others later
  return online[0].baseUrl;
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

      const agg = await dbCollection.aggregate([
        { $match: { profit: { $ne: null } } },
        { $group: { _id: "$targetModule", total: { $sum: "$profit" } } }
      ]).toArray();
      for (const r of agg) {
        cumulativeProfitMap[r._id] = r.total;
      }

      // Periodically update today's profit
      setInterval(async () => {
        try {
          const todayStartStr = getTodayStart().toISOString();
          const todayAgg = await dbCollection.aggregate([
            { $match: { profit: { $ne: null }, time: { $gte: todayStartStr } } },
            { $group: { _id: "$targetModule", total: { $sum: "$profit" } } }
          ]).toArray();
          for (const k of Object.keys(todayProfitMap)) todayProfitMap[k] = 0;
          for (const r of todayAgg) todayProfitMap[r._id] = r.total;
        } catch(e) {}
      }, 5000);
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
            const newWinner = body.ocr?.winner || "UNKNOWN";
            if (['B', 'P', 'T'].includes(newWinner) && existingBet.roundOutcome !== newWinner) {
              existingBet.roundOutcome = newWinner;
              existingBet.outcomeState = body;
              
              let profit = 0;
              const amt = parseFloat(existingBet.actualBetAmount);
              if ((existingBet.outcome === 'SUCCESS' || existingBet.outcome === 'WRONG_AMOUNT') && !isNaN(amt)) {
                let targetSide = '';
                if (existingBet.target.includes('Banker')) targetSide = 'B';
                else if (existingBet.target.includes('Player')) targetSide = 'P';
                else if (existingBet.target.includes('Tie')) targetSide = 'T';

                if (existingBet.roundOutcome === 'T' && targetSide !== 'T') {
                  profit = 0;
                } else if (existingBet.roundOutcome === targetSide) {
                  if (targetSide === 'B') profit = amt * 0.95;
                  else if (targetSide === 'P') profit = amt * 1;
                  else if (targetSide === 'T') profit = amt * 8;
                } else {
                  profit = -amt;
                }
              }
              existingBet.profit = profit;
              if (existingBet.targetModule) {
                cumulativeProfitMap[existingBet.targetModule] = (cumulativeProfitMap[existingBet.targetModule] || 0) + profit;
                todayProfitMap[existingBet.targetModule] = (todayProfitMap[existingBet.targetModule] || 0) + profit;
              }

              if (dbCollection) {
                dbCollection.updateOne(
                  { id: existingBet.id },
                  { $set: { roundOutcome: existingBet.roundOutcome, outcomeState: existingBet.outcomeState, profit: existingBet.profit } }
                ).catch(() => {});
              }
            } else if (!['B', 'P', 'T'].includes(existingBet.roundOutcome)) {
              existingBet.outcomeState = body;
              if (dbCollection) {
                dbCollection.updateOne(
                  { id: existingBet.id },
                  { $set: { outcomeState: existingBet.outcomeState } }
                ).catch(() => {});
              }
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
        
        let targetModuleLabel = targetBaseUrl || "NONE";
        if (targetBaseUrl) {
           const mod = Array.from(activeModules.values()).find(m => m.baseUrl === targetBaseUrl);
           if (mod) {
             targetModuleLabel = mod.label || targetModuleLabel;
             if (mod.accounts && mod.accounts.length > 0 && mod.accounts[0].label) {
               targetModuleLabel = mod.accounts[0].label;
             }
           }
        }

        const betEntry = {
          id: betId,
          time: new Date().toISOString(),
          tableName: body.tableNumber,
          round: body.ocr?.roundNumber,
          target: bestTarget,
          ev: bestEv,
          targetModule: targetModuleLabel,
          reasonState: body,
          executionState: null,
          outcomeState: null,
          outcome: !betConfig.autoBetEnabled ? "AUTOBET_OFF" : (targetBaseUrl ? "PENDING" : "NO_MODULES_ONLINE"),
          recommendedBetAmount: recommendedBetAmount,
          actualBetAmount: "-",
          roundOutcome: "WAITING",
          profit: null
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
          bet.executionState = body;
          
          let placedAmtStr = String(body.betAmount || "").replace(/,/g, '');
          let placedAmt = parseFloat(placedAmtStr);
          let targetAmt = parseFloat(bet.recommendedBetAmount);
          
          if (body.status === "SUCCESS") {
            if (isNaN(placedAmt) || placedAmt <= 0) {
              bet.outcome = "UNPLACED";
            } else if (placedAmt !== targetAmt) {
              bet.outcome = "WRONG_AMOUNT";
            } else {
              bet.outcome = "SUCCESS";
            }
          } else {
            bet.outcome = "UNPLACED";
          }
          
          bet.actualBetAmount = body.betAmount || "-";
          
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

    if (req.method === "GET" && req.url.startsWith("/api/stats")) {
      try {
        if (!dbCollection) throw new Error("DB not connected");

        const url = new URL(req.url, `http://localhost:${PORT}`);
        const range = url.searchParams.get("range") || "all_time";
        
        let startStr = null;
        let endStr = null;
        let dateInfo = "All Time";
        
        if (range !== "all_time") {
          const now = new Date();
          const today12pm = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0);
          let currentPeriodStart = new Date(today12pm);
          if (now < today12pm) {
            currentPeriodStart.setDate(currentPeriodStart.getDate() - 1);
          }
          
          let startDate = null;
          let endDate = null;
          
          if (range === 'today') {
            startDate = new Date(currentPeriodStart);
            endDate = new Date(currentPeriodStart);
            endDate.setDate(endDate.getDate() + 1);
          } else if (range === 'yesterday') {
            startDate = new Date(currentPeriodStart);
            startDate.setDate(startDate.getDate() - 1);
            endDate = new Date(currentPeriodStart);
          } else if (range === 'this_week') {
            let dayOfWeek = currentPeriodStart.getDay();
            let daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
            startDate = new Date(currentPeriodStart);
            startDate.setDate(startDate.getDate() - daysSinceMonday);
            endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 7);
          }
          
          if (startDate && endDate) {
             startStr = startDate.toISOString();
             endStr = endDate.toISOString();
             const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit', hour12: true };
             dateInfo = `${startDate.toLocaleString('en-GB', options)} to ${endDate.toLocaleString('en-GB', options)}`;
          }
        }
        
        const matchQ = { outcome: { $in: ["SUCCESS", "WRONG_AMOUNT"] } };
        if (startStr && endStr) {
          matchQ.time = { $gte: startStr, $lt: endStr };
        }
        
        const bets = await dbCollection.find(matchQ).toArray();

        const statsMap = {};
        let totalStats = { pnl: 0, turnover: 0, effTurnover: 0, expValue: 0, bal: 0 };

        for (const b of bets) {
          const mod = b.targetModule || "UNKNOWN";
          if (!statsMap[mod]) statsMap[mod] = { pnl: 0, turnover: 0, effTurnover: 0, expValue: 0, bal: 0 };
          
          let amt = parseFloat(b.actualBetAmount);
          if (isNaN(amt)) continue;

          const profit = b.profit || 0;
          const ev = b.ev || 0;

          statsMap[mod].pnl += profit;
          totalStats.pnl += profit;
          
          statsMap[mod].turnover += amt;
          totalStats.turnover += amt;
          
          if (b.roundOutcome !== "T") {
            statsMap[mod].effTurnover += amt;
            totalStats.effTurnover += amt;
          }

          const evAmt = ev * amt;
          statsMap[mod].expValue += evAmt;
          totalStats.expValue += evAmt;
        }

        // Get current balance of nodes (from activeModules)
        for (const m of activeModules.values()) {
           const label = m.label || m.baseUrl;
           if (!statsMap[label]) statsMap[label] = { pnl: 0, turnover: 0, effTurnover: 0, expValue: 0, bal: 0 };
           if (m.accounts && m.accounts[0] && m.accounts[0].balance != null) {
              const bval = parseFloat(m.accounts[0].balance);
              if (!isNaN(bval)) {
                 statsMap[label].bal = bval;
                 totalStats.bal += bval;
              }
           }
        }

        const formatStats = (st) => {
          const effRebate = st.effTurnover * 0.012;
          const avgEv = st.turnover > 0 ? (st.expValue / st.turnover) : 0;
          return {
            pnl: st.pnl,
            effTurnover: st.effTurnover,
            effRebate: effRebate,
            expLoss: -st.expValue, // requested "expected loss"
            avgEv: avgEv,
            bal: st.bal
          };
        };

        const result = {
           nodes: {},
           total: formatStats(totalStats)
        };
        for (const [mod, st] of Object.entries(statsMap)) {
           result.nodes[mod] = formatStats(st);
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, stats: result, dateInfo }));
      } catch(e) {
        res.writeHead(500, { "Content-Type": "application/json" });
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
        activeModules: Array.from(activeModules.values()).map(m => {
           const label = m.label;
           const accLabel = m.accounts && m.accounts.length > 0 ? m.accounts[0].label : null;
           const c1 = cumulativeProfitMap[label] || 0;
           const c2 = accLabel ? (cumulativeProfitMap[accLabel] || 0) : 0;
           const t1 = todayProfitMap[label] || 0;
           const t2 = accLabel ? (todayProfitMap[accLabel] || 0) : 0;
           return {
             ...m,
             cumulativeProfit: c1 + c2,
             todayProfit: t1 + t2
           };
        }),
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
