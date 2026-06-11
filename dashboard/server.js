const http = require("http");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const { MongoClient } = require("mongodb");
const { sendWhatsAppNotification } = require("../utils/whatsapp_notifier");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const MONGODB_NAME = process.env.MONGODB_NAME || "neuron_baccarat";
let dbCollection = null;
let dbCollectionShuffles = null;
let dbCollectionSnapshots = null;

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
} catch (e) { }

function saveConfig() {
  fs.writeFileSync(path.join(__dirname, "config.json"), JSON.stringify(betConfig, null, 2));
}

const PORT = 3456;
const ROOT = path.join(__dirname, "..");

let latestTablesState = null;

try {
  const initPath = path.join(ROOT, "eyes", "json", "tables_state.json");
  if (fs.existsSync(initPath)) {
    const content = fs.readFileSync(initPath, "utf8");
    if (content && content.trim() !== "") {
      latestTablesState = JSON.parse(content);
      console.log(`[Central] Initialized in-memory tables state from disk`);
    }
  }
} catch (e) {
  console.error(`[Central] Failed to load initial tables state:`, e.message);
}

let _stateManager = null;
const betLog = [];
const centralBetQueue = [];
const MAX_BET_LOG = 1000;

function getRoundCardsFromStateJson(tableName, round) {
  if (latestTablesState && Array.isArray(latestTablesState.tables)) {
    const table = latestTablesState.tables.find(t => t.tableName === tableName);
    if (table && Array.isArray(table.deducedBeadRoad)) {
      const match = table.deducedBeadRoad.find(r => r && r.round === round);
      if (match) {
        return match;
      }
    }
  }
  return null;
}


let cachedSuccessRates = {
  last100: null,
  last1000: null,
  last10000: null,
  allTime: null,
  moduleLast1000: {}
};

let lastSuccessBetTime = null;

async function updateSuccessRates() {
  if (!dbCollection) return;
  try {
    const validOutcomes = ["SUCCESS", "WRONG_AMOUNT", "UNPLACED", "NETWORK_ERROR", "DISPATCH_FAILED", "FAILED"];
    const successOutcomes = ["SUCCESS"];

    const bets = await dbCollection.find({ outcome: { $in: validOutcomes } })
      .sort({ time: -1 })
      .limit(10000)
      .project({ outcome: 1 })
      .toArray();

    let s100 = 0, t100 = 0;
    let s1000 = 0, t1000 = 0;
    let s10000 = 0, t10000 = bets.length;

    for (let i = 0; i < bets.length; i++) {
      const b = bets[i];
      const isSuccess = successOutcomes.includes(b.outcome);
      if (isSuccess) s10000++;
      if (i < 100) { t100++; if (isSuccess) s100++; }
      if (i < 1000) { t1000++; if (isSuccess) s1000++; }
    }

    const allTimeAgg = await dbCollection.aggregate([
      { $match: { outcome: { $in: validOutcomes } } },
      {
        $group: {
          _id: { $in: ["$outcome", successOutcomes] },
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    let allSuccess = 0;
    let allTotal = 0;
    for (const r of allTimeAgg) {
      allTotal += r.count;
      if (r._id === true) allSuccess += r.count;
    }

    let moduleRates = {};
    for (const m of activeModules.values()) {
      let headerLabel = m.label;
      if (m.accounts && m.accounts.length > 0 && m.accounts[0].label) {
        headerLabel = m.accounts[0].label;
      }

      const modBets = await dbCollection.find({
        outcome: { $in: validOutcomes },
        $or: [
          { targetModuleId: m.moduleId },
          { targetModule: headerLabel },
          { targetModule: m.label }
        ]
      }).sort({ time: -1 }).limit(1000).project({ outcome: 1 }).toArray();

      let ms = 0;
      let mt = modBets.length;
      for (const mb of modBets) {
        if (successOutcomes.includes(mb.outcome)) ms++;
      }
      moduleRates[headerLabel] = mt > 0 ? (ms / mt) : null;
    }

    cachedSuccessRates = {
      last100: t100 > 0 ? (s100 / t100) : null,
      last1000: t1000 > 0 ? (s1000 / t1000) : null,
      last10000: t10000 > 0 ? (s10000 / t10000) : null,
      allTime: allTotal > 0 ? (allSuccess / allTotal) : null,
      moduleLast1000: moduleRates
    };
  } catch (e) {
    console.error("[Stats] Failed to update success rates:", e.message);
  }
}

async function updateSuccessRatesQuick() {
  if (!dbCollection) return;
  try {
    const validOutcomes = ["SUCCESS", "WRONG_AMOUNT", "UNPLACED", "NETWORK_ERROR", "DISPATCH_FAILED", "FAILED"];
    const successOutcomes = ["SUCCESS"];

    const bets = await dbCollection
      .find({ outcome: { $in: validOutcomes } })
      .sort({ time: -1 })
      .limit(1000)
      .project({ outcome: 1 })
      .toArray();

    let s100 = 0, t100 = 0;
    let s1000 = 0, t1000 = bets.length;

    for (let i = 0; i < bets.length; i++) {
      const b = bets[i];
      const isSuccess = successOutcomes.includes(b.outcome);
      if (isSuccess) {
        if (i < 100) s100++;
        s1000++;
      }
      if (i < 100) {
        t100++;
      }
    }

    let moduleRates = {};
    for (const m of activeModules.values()) {
      let headerLabel = m.label;
      if (m.accounts && m.accounts.length > 0 && m.accounts[0].label) {
        headerLabel = m.accounts[0].label;
      }

      const modBets = await dbCollection.find({
        outcome: { $in: validOutcomes },
        $or: [
          { targetModuleId: m.moduleId },
          { targetModule: headerLabel },
          { targetModule: m.label }
        ]
      }).sort({ time: -1 }).limit(1000).project({ outcome: 1 }).toArray();

      let ms = 0;
      let mt = modBets.length;
      for (const mb of modBets) {
        if (successOutcomes.includes(mb.outcome)) ms++;
      }
      moduleRates[headerLabel] = mt > 0 ? (ms / mt) : null;
    }

    cachedSuccessRates.last100 = t100 > 0 ? (s100 / t100) : null;
    cachedSuccessRates.last1000 = t1000 > 0 ? (s1000 / t1000) : null;
    cachedSuccessRates.moduleLast1000 = moduleRates;
  } catch (e) {
    console.error("[Stats] Failed to update quick success rates:", e.message);
  }
}

// Track active bet modules via heartbeat
const activeModules = new Map(); // moduleId -> { moduleId, baseUrl, lastHeartbeat, label, isBusy, busySince }
const cumulativeProfitMap = {}; // keyed by moduleId (stable)
const todayProfitMap = {};       // keyed by moduleId (stable)
let snapshotAutoEnabled = true;  // toggle for hourly auto-snapshots
const STALE_THRESHOLD_MS = 12000;

// Periodically purge stale modules and send WhatsApp alerts
setInterval(() => {
  const now = Date.now();
  for (const [moduleId, m] of activeModules) {
    if (now - m.lastHeartbeat >= STALE_THRESHOLD_MS) {
      const label = (m.accounts && m.accounts[0] && m.accounts[0].label) || m.label || moduleId;
      console.log(`\x1b[31m[Central] Module ${label} (${moduleId}) went stale — removing.\x1b[0m`);
      activeModules.delete(moduleId);
      sendWhatsAppNotification(`[ALERT] Bet module "${label}" (${moduleId}) went offline — no heartbeat for ${Math.round(STALE_THRESHOLD_MS / 1000)}s.`)
        .catch(err => console.error("WhatsApp notification failed:", err.message));
    }
  }
}, 5000);

function getTodayStart() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kuala_Lumpur",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false
  });
  const parts = formatter.formatToParts(now);
  const partMap = Object.fromEntries(parts.map(p => [p.type, p.value]));
  const myYear = parseInt(partMap.year);
  const myMonth = parseInt(partMap.month) - 1; // 0-indexed
  const myDay = parseInt(partMap.day);

  // Today 12pm in Malaysia is Date.UTC(myYear, myMonth, myDay, 4, 0, 0, 0)
  const today12pmUTC = new Date(Date.UTC(myYear, myMonth, myDay, 4, 0, 0, 0));
  if (now < today12pmUTC) {
    return new Date(today12pmUTC.getTime() - 24 * 60 * 60 * 1000);
  }
  return today12pmUTC;
}

let lastRoundRobinIndex = -1;
let lastRoundRobinModuleIds = []; // track the ordered list of module IDs for stable cycling
let lastUsedModuleId = null;      // track which module was last dispatched to

function resolveBetModuleTarget() {
  const now = Date.now();
  // Filter modules that sent a heartbeat in the last 12 seconds AND are not busy
  let online = Array.from(activeModules.values()).filter(m => {
    // Timeout stuck busy modules (e.g. > 60s)
    if (m.isBusy && m.busySince && now - m.busySince > 60000) {
      m.isBusy = false;
      m.busySince = null;
    }
    return now - m.lastHeartbeat < 12000 && !m.isBusy;
  });

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
    // Build a stable sorted list of module IDs to cycle through
    const currentIds = online.map(m => m.moduleId).sort();
    const idsChanged = JSON.stringify(currentIds) !== JSON.stringify(lastRoundRobinModuleIds);

    if (idsChanged) {
      lastRoundRobinModuleIds = currentIds;
      // When modules change, find where the last-used module sits in the new list
      // and continue from the NEXT one to avoid double-picking
      if (lastUsedModuleId) {
        const lastPos = currentIds.indexOf(lastUsedModuleId);
        lastRoundRobinIndex = lastPos >= 0 ? lastPos : -1;
      } else {
        lastRoundRobinIndex = -1;
      }
    }

    // Advance to next module
    lastRoundRobinIndex = (lastRoundRobinIndex + 1) % currentIds.length;
    const targetModuleId = currentIds[lastRoundRobinIndex];
    const targetModule = online.find(m => m.moduleId === targetModuleId);

    if (targetModule) {
      lastUsedModuleId = targetModuleId;
      return { baseUrl: targetModule.baseUrl, moduleId: targetModule.moduleId };
    }
    return null;
  }

  // Default fallback if mode isn't recognized or we add others later
  const fallback = online[0];
  lastUsedModuleId = fallback.moduleId;
  return { baseUrl: fallback.baseUrl, moduleId: fallback.moduleId };
}

function processCentralQueue() {
  if (centralBetQueue.length === 0) return;

  // ─── STALE BET PURGE (QUEUE TTL) ───
  const now = Date.now();
  const QUEUE_TTL_MS = 15000; // Max 15 seconds allowed in queue

  while (centralBetQueue.length > 0) {
    const oldestBet = centralBetQueue[0];
    const betAge = now - new Date(oldestBet.time).getTime();

    if (betAge > QUEUE_TTL_MS) {
      console.log(
        `\x1b[33m[Central] Purged stale bet ${oldestBet.id} (Age: ${Math.round(betAge / 1000)}s > ${QUEUE_TTL_MS / 1000}s)\x1b[0m`
      );
      // Remove from the queue
      centralBetQueue.shift();

      // Update outcome to EXPIRED in-memory and in DB
      oldestBet.outcome = "EXPIRED";
      oldestBet.executionState = {
        status: "EXPIRED",
        reason: `Queue TTL exceeded (${Math.round(betAge / 1000)}s)`,
      };

      if (dbCollection) {
        dbCollection
          .updateOne(
            { id: oldestBet.id },
            {
              $set: {
                outcome: oldestBet.outcome,
                executionState: oldestBet.executionState,
              },
            },
          )
          .catch(() => {});
      }
    } else {
      // The oldest bet is still fresh, so all subsequent bets are also fresh
      break;
    }
  }

  if (centralBetQueue.length === 0) return;

  const targetResult = resolveBetModuleTarget();
  if (!targetResult) {
    // Debug logging to understand why targetResult is null
    const now = Date.now();
    console.log(`[Central] processCentralQueue: No target found! Queue length: ${centralBetQueue.length}. Active modules: ${activeModules.size}`);
    for (const [id, m] of activeModules) {
      console.log(` - Module ${id}: isBusy=${m.isBusy}, heartbeatAge=${now - m.lastHeartbeat}ms, accounts=${m.accounts ? m.accounts.length : 0}`);
      if (m.accounts && m.accounts.length > 0) {
        console.log(`   - Acc[0]: isAcceptingBets=${m.accounts[0].isAcceptingBets}, balance=${m.accounts[0].balance}`);
      }
    }
    return; // no available modules right now
  }

  const betEntry = centralBetQueue.shift();
  const targetModuleId = targetResult.moduleId;
  const targetBaseUrl = targetResult.baseUrl;

  const mod = activeModules.get(targetModuleId);
  if (mod) {
    mod.isBusy = true;
    mod.busySince = Date.now();
  }

  let targetModuleLabel = mod && mod.label ? mod.label : targetModuleId;
  if (mod && mod.accounts && mod.accounts.length > 0 && mod.accounts[0].label) {
    targetModuleLabel = mod.accounts[0].label;
  }

  betEntry.targetModuleId = targetModuleId;
  betEntry.targetModule = targetModuleLabel;
  betEntry.outcome = "PENDING";

  if (dbCollection) {
    dbCollection.updateOne(
      { id: betEntry.id },
      { $set: { targetModuleId: betEntry.targetModuleId, targetModule: betEntry.targetModule, outcome: betEntry.outcome } }
    ).catch(() => { });
  }

  fetch(targetBaseUrl + "/prettygaming/bet", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(betEntry)
  }).then(async (resp) => {
    if (!resp.ok) {
      // Non-2xx response (e.g. 503 "Browser not ready" during session restart)
      let errMsg = `HTTP ${resp.status}`;
      try { const body = await resp.json(); errMsg = body.error || errMsg; } catch (e) { }
      console.error(`[Central] Bet dispatch to ${targetModuleLabel} rejected: ${errMsg}`);
      betEntry.outcome = "DISPATCH_FAILED";
      betEntry.executionState = { status: "DISPATCH_FAILED", reason: errMsg };
      if (mod) {
        mod.isBusy = false;
        mod.busySince = null;
      }
      if (dbCollection) {
        dbCollection.updateOne(
          { id: betEntry.id },
          { $set: { outcome: betEntry.outcome, executionState: betEntry.executionState } }
        ).catch(() => { });
      }
    }
  }).catch(err => {
    console.error("[Central] Failed to dispatch bet:", err.message);
    betEntry.outcome = "NETWORK_ERROR";
    betEntry.executionState = { status: "NETWORK_ERROR", reason: err.message };
    if (mod) {
      mod.isBusy = false;
      mod.busySince = null;
    }
    if (dbCollection) {
      dbCollection.updateOne(
        { id: betEntry.id },
        { $set: { outcome: betEntry.outcome, executionState: betEntry.executionState } }
      ).catch(() => { });
    }
    processCentralQueue(); // try next bet
  });

  if (centralBetQueue.length > 0) {
    processCentralQueue();
  }
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

async function takeHourlySnapshot(isManual = false) {
  console.log(`[Snapshot] Running ${isManual ? 'manual' : 'hourly'} snapshot...`);
  if (!dbCollectionSnapshots) {
    console.error(`[Snapshot] dbCollectionSnapshots not initialized yet.`);
    return;
  }

  for (const [id, m] of activeModules) {
    try {
      const response = await fetch(`${m.baseUrl}/prettygaming/bet-summary`, {
        method: "GET",
        signal: AbortSignal.timeout(15000)
      });
      if (!response.ok) {
        console.error(`[Snapshot] Bet module ${id} returned status ${response.status}`);
        continue;
      }
      const data = await response.json();
      if (!data.ok || !data.summary) {
        console.error(`[Snapshot] Bet module ${id} response error:`, data.error || "no summary");
        continue;
      }

      const sum = data.summary;
      const summaries = sum.summaries || { turnOver: 0, totalBet: 0, winLose: 0 };

      const parseLocalToUTC = (localStr, tzOffset) => {
        const cleanOffset = tzOffset.replace("GMT", "").trim();
        let formattedOffset = "+00:00";
        if (cleanOffset.startsWith("+") || cleanOffset.startsWith("-")) {
          formattedOffset = cleanOffset.length === 5 
            ? `${cleanOffset.slice(0, 3)}:${cleanOffset.slice(3)}` 
            : cleanOffset;
        } else if (cleanOffset.match(/^\d{4}$/)) {
          formattedOffset = `+${cleanOffset.slice(0, 2)}:${cleanOffset.slice(2)}`;
        }
        return new Date(localStr.replace(" ", "T") + formattedOffset);
      };

      const actualStart = parseLocalToUTC(sum.queryStart, sum.tzOffset);
      const actualEnd = parseLocalToUTC(sum.queryEnd, sum.tzOffset);

      let dbBets = [];
      if (dbCollection) {
        const label = (m.accounts && m.accounts[0] && m.accounts[0].label) || m.label || m.moduleId;
        dbBets = await dbCollection.find({
          $or: [
            { targetModuleId: m.moduleId },
            { targetModule: label },
            { targetModule: m.label }
          ],
          time: {
            $gte: actualStart.toISOString(),
            $lte: actualEnd.toISOString()
          },
          outcome: { $in: ["SUCCESS", "WRONG_AMOUNT"] }
        }).toArray();
      }

      let dbEffTurnover = 0;
      let dbWinLose = 0;
      for (const b of dbBets) {
        const amt = parseFloat(b.actualBetAmount || 0);
        dbWinLose += parseFloat(b.profit || 0);
        // Effective turnover excludes ties (same logic as stats effTurnover)
        if (b.roundOutcome !== "T") {
          dbEffTurnover += amt;
        }
      }

      const now = new Date();
      const cleanBalance = parseFloat(String(sum.balance).replace(/[^0-9.-]/g, '')) || 0;

      const snapshot = {
        timestamp: now.toISOString(),
        hour: now.getHours(),
        minute: now.getMinutes(),
        manual: isManual,
        dateStr: now.toISOString().split("T")[0],
        moduleId: m.moduleId,
        label: (m.accounts && m.accounts[0] && m.accounts[0].label) || m.label || m.moduleId,
        actualBalance: cleanBalance,
        actualTurnover: parseFloat(summaries.turnOver || 0),
        actualWinLose: parseFloat(summaries.winLose || 0),
        dbEffTurnover: dbEffTurnover,
        dbWinLose: dbWinLose
      };

      await dbCollectionSnapshots.insertOne(snapshot);
      console.log(`[Snapshot] Saved ${isManual ? 'manual' : 'hourly'} snapshot for ${snapshot.label}: Balance=${snapshot.actualBalance}, ActualTurnover=${snapshot.actualTurnover}, DBEffTurnover=${snapshot.dbEffTurnover}`);
    } catch (err) {
      console.error(`[Snapshot] Error during snapshot run for module ${id}:`, err.message);
    }
  }
}

function startDashboard(stateManager) {
  _stateManager = stateManager;

  // Initialize MongoDB connection
  (async function initDB() {
    try {
      const client = new MongoClient(MONGODB_URI);
      await client.connect();
      const db = client.db(MONGODB_NAME);
      dbCollection = db.collection("PRETTYGAMING_BETS");
      dbCollectionShuffles = db.collection("PRETTYGAMING_SHUFFLES");
      dbCollectionSnapshots = db.collection("PRETTYGAMING_SNAPSHOTS");

      const recentBets = await dbCollection.find().sort({ time: -1 }).limit(MAX_BET_LOG).toArray();
      for (const b of recentBets) {
        // If a bet was queued or pending when the server died/restarted, it's stale now.
        if (b.outcome === "QUEUED" || b.outcome === "PENDING") {
          b.outcome = "CANCELLED";
          b.executionState = { status: "CANCELLED", reason: "Server restarted" };
          dbCollection.updateOne({ id: b.id }, { $set: { outcome: b.outcome, executionState: b.executionState } }).catch(() => { });
        }

        if (!betLog.find(existing => existing.id === b.id)) betLog.push(b);
      }
      betLog.sort((a, b) => new Date(b.time) - new Date(a.time));
      const lastSuccess = recentBets.find(b => b.outcome === "SUCCESS");
      if (lastSuccess) {
        lastSuccessBetTime = lastSuccess.time;
        console.log(`[MongoDB] Initialized last success bet time: ${lastSuccessBetTime}`);
      }
      console.log(`[MongoDB] Connected. Loaded ${recentBets.length} recent bets from PRETTYGAMING_BETS.`);

      const agg = await dbCollection.aggregate([
        { $match: { profit: { $ne: null } } },
        { $group: { _id: { $ifNull: ["$targetModuleId", "$targetModule"] }, total: { $sum: "$profit" } } }
      ]).toArray();
      for (const r of agg) {
        cumulativeProfitMap[r._id] = r.total;
      }

      // Populate today's profit immediately
      try {
        const todayStartStr = getTodayStart().toISOString();
        const todayAgg = await dbCollection.aggregate([
          { $match: { profit: { $ne: null }, time: { $gte: todayStartStr } } },
          { $group: { _id: { $ifNull: ["$targetModuleId", "$targetModule"] }, total: { $sum: "$profit" } } }
        ]).toArray();
        for (const r of todayAgg) todayProfitMap[r._id] = r.total;
      } catch (e) {
        console.error("[MongoDB] Failed to initialize today profit:", e.message);
      }

      // Periodically update today's profit
      setInterval(async () => {
        try {
          const todayStartStr = getTodayStart().toISOString();
          const todayAgg = await dbCollection.aggregate([
            { $match: { profit: { $ne: null }, time: { $gte: todayStartStr } } },
            { $group: { _id: { $ifNull: ["$targetModuleId", "$targetModule"] }, total: { $sum: "$profit" } } }
          ]).toArray();
          for (const k of Object.keys(todayProfitMap)) todayProfitMap[k] = 0;
          for (const r of todayAgg) todayProfitMap[r._id] = r.total;
        } catch (e) { }
      }, 5000);

      updateSuccessRates();
    } catch (err) {
      console.error("[MongoDB] Failed to connect:", err.message);
    }

  })();

  async function compileStatsJSON(range = "all_time", from = null, to = null) {
    if (!dbCollection) throw new Error("DB not connected");

    let startStr = null;
    let endStr = null;
    let dateInfo = "All Time";

    if (range === "custom") {
      if (from) {
        startStr = new Date(from).toISOString();
      }
      if (to) {
        endStr = new Date(to).toISOString();
      }
      const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kuala_Lumpur' };
      const fromStr = from ? new Date(from).toLocaleString('en-GB', options) : "Beginning";
      const toStr = to ? new Date(to).toLocaleString('en-GB', options) : "End";
      dateInfo = `Custom: ${fromStr} to ${toStr}`;
    } else if (range !== "all_time") {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kuala_Lumpur",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false
      });
      const parts = formatter.formatToParts(now);
      const partMap = Object.fromEntries(parts.map(p => [p.type, p.value]));
      const myYear = parseInt(partMap.year);
      const myMonth = parseInt(partMap.month) - 1; // 0-indexed
      const myDay = parseInt(partMap.day);

      const today12pmUTC = new Date(Date.UTC(myYear, myMonth, myDay, 4, 0, 0, 0));
      let currentPeriodStart = today12pmUTC;
      if (now < today12pmUTC) {
        currentPeriodStart = new Date(today12pmUTC.getTime() - 24 * 60 * 60 * 1000);
      }

      let startDate = null;
      let endDate = null;

      if (range === 'today') {
        startDate = new Date(currentPeriodStart);
        endDate = new Date(currentPeriodStart.getTime() + 24 * 60 * 60 * 1000);
      } else if (range === 'yesterday') {
        startDate = new Date(currentPeriodStart.getTime() - 24 * 60 * 60 * 1000);
        endDate = new Date(currentPeriodStart);
      } else if (range === 'last_7_days') {
        startDate = new Date(currentPeriodStart.getTime() - 6 * 24 * 60 * 60 * 1000);
        endDate = new Date(currentPeriodStart.getTime() + 24 * 60 * 60 * 1000);
      }

      if (startDate && endDate) {
        startStr = startDate.toISOString();
        endStr = endDate.toISOString();
        const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kuala_Lumpur' };
        dateInfo = `${startDate.toLocaleString('en-GB', options)} to ${endDate.toLocaleString('en-GB', options)}`;
      }
    }

    const matchQ = { outcome: { $in: ["SUCCESS", "WRONG_AMOUNT"] } };
    if (startStr || endStr) {
      matchQ.time = {};
      if (startStr) matchQ.time.$gte = startStr;
      if (endStr) matchQ.time.$lt = endStr;
    }

    const bets = await dbCollection.find(matchQ).toArray();

    const statsMap = {};
    let totalStats = { pnl: 0, turnover: 0, effTurnover: 0, expValue: 0, bal: 0, betCount: 0 };

    for (const b of bets) {
      const modId = b.targetModuleId || b.targetModule || "UNKNOWN";
      const modLabel = b.targetModule || modId;
      if (!statsMap[modLabel]) statsMap[modLabel] = { pnl: 0, turnover: 0, effTurnover: 0, expValue: 0, bal: 0, displayLabel: modLabel, betCount: 0 };

      let amt = parseFloat(b.actualBetAmount);
      if (isNaN(amt)) continue;

      statsMap[modLabel].betCount += 1;
      totalStats.betCount += 1;

      const profit = b.profit || 0;
      const ev = b.ev || 0;

      statsMap[modLabel].pnl += profit;
      totalStats.pnl += profit;

      statsMap[modLabel].turnover += amt;
      totalStats.turnover += amt;

      if (b.roundOutcome !== "T") {
        statsMap[modLabel].effTurnover += amt;
        totalStats.effTurnover += amt;

        const evAmt = ev * amt;
        statsMap[modLabel].expValue += evAmt;
        totalStats.expValue += evAmt;
      }
    }

    for (const m of activeModules.values()) {
      let label = m.label;
      if (m.accounts && m.accounts.length > 0 && m.accounts[0].label) {
        label = m.accounts[0].label;
      }
      if (!statsMap[label]) {
        statsMap[label] = { pnl: 0, turnover: 0, effTurnover: 0, expValue: 0, bal: 0, displayLabel: label, betCount: 0 };
      } else {
        statsMap[label].displayLabel = label;
      }
      if (m.accounts && m.accounts[0] && m.accounts[0].balance != null) {
        const cleanBalance = String(m.accounts[0].balance).replace(/[^0-9.-]/g, '');
        const bval = parseFloat(cleanBalance);
        if (!isNaN(bval)) {
          statsMap[label].bal = bval;
          totalStats.bal += bval;
        }
      }
    }

    const formatStats = (st) => {
      const rebateRate = betConfig.rebateRate !== undefined ? parseFloat(betConfig.rebateRate) : 0.012;
      const effRebate = st.effTurnover * rebateRate;
      const avgEv = st.effTurnover > 0 ? (st.expValue / st.effTurnover) : 0;
      return {
        pnl: st.pnl,
        turnover: st.turnover,
        effTurnover: st.effTurnover,
        effRebate: effRebate,
        expLoss: st.expValue - effRebate,
        expValue: st.expValue,
        avgEv: avgEv,
        bal: st.bal,
        betCount: st.betCount || 0,
        avgBet: st.betCount > 0 ? (st.turnover / st.betCount) : 0
      };
    };

    const result = {
      nodes: {},
      total: formatStats(totalStats)
    };
    for (const [mod, st] of Object.entries(statsMap)) {
      const displayName = st.displayLabel || mod;
      result.nodes[displayName] = formatStats(st);
    }

    return { ok: true, stats: result, dateInfo };
  }

  async function reportStatsToCentral() {
    if (!dbCollection) return;

    try {
      await updateSuccessRatesQuick();
    } catch (err) {
      console.error("[Telemetry] Failed to update success rates:", err.message);
    }

    const ranges = ["today", "yesterday", "last_7_days", "all_time"];
    const reportData = {
      platform: "PG",
      label: "Pretty Gaming",
      timestamp: new Date().toISOString(),
      lastSuccessBetTime: lastSuccessBetTime,
      successRates: {
        last100: cachedSuccessRates.last100,
        last1000: cachedSuccessRates.last1000
      },
      ranges: {}
    };

    Promise.all(ranges.map(async (r) => {
      try {
        const statsData = await compileStatsJSON(r);
        reportData.ranges[r] = statsData;
      } catch (err) { }
    })).then(() => {
      const payload = JSON.stringify(reportData);
      const options = {
        hostname: "statsdashboard.onrender.com",
        port: 443,
        path: "/api/report-stats",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload)
        },
        timeout: 5000
      };

      const req = require("https").request(options, (res) => {
        res.resume();
      });

      req.on("error", (e) => {
        // Quietly consume connection errors to avoid printing spam
      });

      req.write(payload);
      req.end();
    }).catch(() => { });
  }

  // Ping every 10 seconds
  setInterval(reportStatsToCentral, 10000);

  const server = http.createServer(async (req, res) => {
    // Reconciliation & Completed Hand API Endpoints
    if (req.method === "GET" && req.url.startsWith("/api/reconcile-round")) {
      try {
        const url = new URL(req.url, `http://localhost:${PORT}`);
        const tableName = url.searchParams.get("table");
        const roundStr = url.searchParams.get("round");
        if (!tableName || !roundStr) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: false, error: "Missing table or round param" }));
          return;
        }
        const round = parseInt(roundStr, 10);
        
        // 1. Check local state json
        const localMatch = getRoundCardsFromStateJson(tableName, round);
        if (localMatch) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: true, cards: localMatch }));
          return;
        }
        
        // 2. Query peer if configured
        const peerUrl = process.env.PEER_CENTRAL_URL;
        if (peerUrl) {
          const peerRequestUrl = `${peerUrl.replace(/\/$/, '')}/api/peer/round-cards?table=${encodeURIComponent(tableName)}&round=${round}`;
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
            const peerResponse = await fetch(peerRequestUrl, { signal: controller.signal });
            clearTimeout(timeoutId);
            if (peerResponse.ok) {
              const peerData = await peerResponse.json();
              if (peerData.ok && peerData.cards) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ ok: true, cards: peerData.cards }));
                return;
              }
            }
          } catch (err) {
            const isTimeout = err.name === 'AbortError' || err.message.includes('aborted');
            if (isTimeout) {
              console.error(`[P2P Reconciliation] Peer query to ${peerUrl} timed out after 10s`);
            } else {
              console.error(`[P2P Reconciliation] Error querying peer Central ${peerUrl}:`, err.message);
            }
            // Return 502 with peer_error reason so caller knows it was a connectivity issue, not a "not found"
            res.writeHead(502, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ ok: false, reason: "peer_error", error: isTimeout ? "Peer timeout" : err.message }));
            return;
          }
        }
        
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, reason: "not_found", error: "Round cards not found in local state json or peer" }));
      } catch (e) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, reason: "peer_error", error: e.message }));
      }
      return;
    }

    if (req.method === "GET" && req.url.startsWith("/api/peer/round-cards")) {
      try {
        const url = new URL(req.url, `http://localhost:${PORT}`);
        const tableName = url.searchParams.get("table");
        const roundStr = url.searchParams.get("round");
        if (!tableName || !roundStr) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: false, error: "Missing table or round param" }));
          return;
        }
        const round = parseInt(roundStr, 10);
        const localMatch = getRoundCardsFromStateJson(tableName, round);
        if (localMatch) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: true, cards: localMatch }));
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: false, error: "Round not found in local state json" }));
        }
      } catch (e) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
      return;
    }

    // API endpoints
    if (req.method === "POST" && req.url.startsWith("/api/bet-module/heartbeat")) {
      try {
        const body = await parseJSONBody(req);
        if (body.moduleId && body.baseUrl) {
          const existing = activeModules.get(body.moduleId);
          activeModules.set(body.moduleId, {
            moduleId: body.moduleId,
            baseUrl: body.baseUrl,
            label: body.label || body.moduleId,
            accounts: body.accounts || [],
            lastHeartbeat: Date.now(),
            isBusy: existing ? existing.isBusy : false,
            busySince: existing ? existing.busySince : null
          });

          // If any bets are queued, try to process them now that a module is checking in
          processCentralQueue();
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
              if (existingBet.targetModuleId) {
                cumulativeProfitMap[existingBet.targetModuleId] = (cumulativeProfitMap[existingBet.targetModuleId] || 0) + profit;
                todayProfitMap[existingBet.targetModuleId] = (todayProfitMap[existingBet.targetModuleId] || 0) + profit;
              }

              if (dbCollection) {
                dbCollection.updateOne(
                  { id: existingBet.id },
                  { $set: { roundOutcome: existingBet.roundOutcome, outcomeState: existingBet.outcomeState, profit: existingBet.profit } }
                ).catch(() => { });
              }
            } else if (!['B', 'P', 'T'].includes(existingBet.roundOutcome)) {
              existingBet.outcomeState = body;
              if (dbCollection) {
                dbCollection.updateOne(
                  { id: existingBet.id },
                  { $set: { outcomeState: existingBet.outcomeState } }
                ).catch(() => { });
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
          targetModuleId: null,
          targetModule: "NONE",
          reasonState: body,
          executionState: null,
          outcomeState: null,
          outcome: !betConfig.autoBetEnabled ? "AUTOBET_OFF" : "QUEUED",
          recommendedBetAmount: recommendedBetAmount,
          actualBetAmount: "-",
          roundOutcome: "WAITING",
          profit: null
        };

        betLog.unshift(betEntry);
        if (betLog.length > MAX_BET_LOG) betLog.length = MAX_BET_LOG;

        if (dbCollection) {
          dbCollection.insertOne(betEntry).catch(() => { });
        }

        if (!betConfig.autoBetEnabled) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: true, action: "SKIPPED", reason: "Auto Bet is disabled", betId }));
          return;
        }

        centralBetQueue.push(betEntry);
        processCentralQueue();

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, action: "QUEUED_CENTRALLY", betId }));
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
      return;
    }

    if (req.method === "POST" && req.url.startsWith("/api/telemetry/shuffle")) {
      try {
        const body = await parseJSONBody(req);
        if (dbCollectionShuffles) {
          const shuffleEntry = {
            id: "shuffle_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
            time: new Date().toISOString(),
            tableName: body.tableName,
            reason: body.reason || "Shuffling detected",
            finalRound: body.finalRound || 0
          };
          dbCollectionShuffles.insertOne(shuffleEntry).catch(() => { });
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, action: "SHUFFLE_RECORDED" }));
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
              lastSuccessBetTime = bet.time;
            }
          } else {
            bet.outcome = "UNPLACED";
          }

          bet.actualBetAmount = body.betAmount || "-";
          bet.timer = body.timer != null ? body.timer : null;

          if (dbCollection) {
            dbCollection.updateOne(
              { id: bet.id },
              { $set: { outcome: bet.outcome, actualBetAmount: bet.actualBetAmount, executionState: bet.executionState, timer: bet.timer } }
            ).catch(() => { });
          }

          if (bet.targetModuleId) {
            const mod = activeModules.get(bet.targetModuleId);
            if (mod) {
              mod.isBusy = false;
              mod.busySince = null;
            }
          }

          processCentralQueue();
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
        dbCollection.deleteMany({}).catch(() => { });
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


    if (req.method === "GET" && req.url.startsWith("/api/bet-summary")) {
      const url = new URL(req.url, `http://localhost:${PORT}`);
      const targetModuleId = url.searchParams.get("moduleId");

      try {
        const modulesToQuery = [];
        for (const [id, m] of activeModules) {
          if (!targetModuleId || id === targetModuleId) {
            modulesToQuery.push(m);
          }
        }

        if (modulesToQuery.length === 0) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: true, results: [] }));
          return;
        }

        const results = await Promise.all(
          modulesToQuery.map(async (m) => {
            try {
              const controller = new AbortController();
              const timeoutId = setTimeout(() => controller.abort(), 10000);
              const response = await fetch(`${m.baseUrl}/prettygaming/bet-summary`, {
                method: "GET",
                signal: controller.signal
              });
              clearTimeout(timeoutId);
              if (!response.ok) {
                throw new Error(`Module responded with status ${response.status}`);
              }
              const data = await response.json();
              return {
                moduleId: m.moduleId,
                label: (m.accounts && m.accounts[0] && m.accounts[0].label) || m.label || m.moduleId,
                ok: data.ok,
                summary: data.summary,
                error: data.error
              };
            } catch (err) {
              return {
                moduleId: m.moduleId,
                label: (m.accounts && m.accounts[0] && m.accounts[0].label) || m.label || m.moduleId,
                ok: false,
                error: err.message
              };
            }
          })
        );

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, results }));
      } catch (e) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
      return;
    }

    if (req.method === "GET" && req.url.startsWith("/api/snapshots")) {
      try {
        if (!dbCollectionSnapshots) throw new Error("DB not connected yet");

        const now = new Date();
        const todayStr = now.toISOString().split("T")[0];

        const snapshots = await dbCollectionSnapshots.find({ dateStr: todayStr }).sort({ timestamp: 1 }).toArray();

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, snapshots }));
      } catch (e) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
      return;
    }

    // Take a snapshot on demand
    if (req.method === "POST" && req.url === "/api/take-snapshot") {
      try {
        if (!dbCollectionSnapshots) throw new Error("DB not connected yet");
        await takeHourlySnapshot(true);
        const now = new Date();
        const todayStr = now.toISOString().split("T")[0];
        const snapshots = await dbCollectionSnapshots.find({ dateStr: todayStr }).sort({ timestamp: 1 }).toArray();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, snapshots }));
      } catch (e) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
      return;
    }

    // Get / toggle auto-snapshot
    if (req.url === "/api/snapshot-auto") {
      if (req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, enabled: snapshotAutoEnabled }));
        return;
      }
      if (req.method === "POST") {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
          try {
            const parsed = JSON.parse(body);
            snapshotAutoEnabled = !!parsed.enabled;
            console.log(`[Snapshot] Auto-snapshot ${snapshotAutoEnabled ? 'ENABLED' : 'DISABLED'}`);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ ok: true, enabled: snapshotAutoEnabled }));
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ ok: false, error: e.message }));
          }
        });
        return;
      }
    }

    if (req.method === "GET" && req.url.startsWith("/api/stats")) {
      try {
        const url = new URL(req.url, `http://localhost:${PORT}`);
        const range = url.searchParams.get("range") || "all_time";
        const from = url.searchParams.get("from");
        const to = url.searchParams.get("to");
        const result = await compileStatsJSON(range, from, to);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      } catch (e) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
      return;
    }

    if (req.method === "GET" && req.url.startsWith("/api/shuffles")) {
      try {
        if (!dbCollectionShuffles) throw new Error("DB not connected");

        const shuffles = await dbCollectionShuffles.find({}).sort({ time: 1 }).toArray();
        const dailyCounts = {};

        shuffles.forEach(s => {
          const t = new Date(s.time);
          let dayStart = new Date(t.getFullYear(), t.getMonth(), t.getDate(), 12, 0, 0, 0);
          if (t < dayStart) {
            dayStart.setDate(dayStart.getDate() - 1);
          }
          let dayEnd = new Date(dayStart);
          dayEnd.setDate(dayEnd.getDate() + 1);

          const options = { weekday: 'short', day: 'numeric', month: 'short' };
          const label = `${dayStart.toLocaleDateString('en-GB', options)}, 12:00 pm to ${dayEnd.toLocaleDateString('en-GB', options)}, 12:00 pm`;

          if (!dailyCounts[label]) dailyCounts[label] = { count: 0, finalRounds: [] };
          dailyCounts[label].count++;
          if (s.finalRound) dailyCounts[label].finalRounds.push(s.finalRound);
        });

        const sortedDays = Object.keys(dailyCounts).map(k => ({
          label: k,
          count: dailyCounts[k].count,
          finalRounds: dailyCounts[k].finalRounds
        })).reverse();

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, stats: sortedDays }));
      } catch (e) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
      return;
    }

    if (req.method === "POST" && req.url.startsWith("/api/refresh-success-rate")) {
      try {
        await updateSuccessRates();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, successRates: cachedSuccessRates }));
      } catch (e) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
      return;
    }

    if (req.method === "GET" && req.url.startsWith("/api/bets")) {
      try {
        const url = new URL(req.url, `http://localhost:${PORT}`);
        const page = parseInt(url.searchParams.get("page")) || 1;
        const limit = parseInt(url.searchParams.get("limit")) || 100;
        const statusFilter = url.searchParams.get("status") || "ALL";
        const outcomeFilter = url.searchParams.get("outcome") || "ALL";
        const startFilter = url.searchParams.get("start");
        const endFilter = url.searchParams.get("end");

        const matchQ = {};
        if (statusFilter !== "ALL") {
          if (statusFilter === "NON_SUCCESS") {
            matchQ.outcome = { $ne: "SUCCESS" };
          } else {
            matchQ.outcome = statusFilter;
          }
        }
        if (outcomeFilter !== "ALL") {
          matchQ.roundOutcome = outcomeFilter;
        }
        if (startFilter || endFilter) {
          matchQ.time = {};
          if (startFilter) matchQ.time.$gte = startFilter;
          if (endFilter) matchQ.time.$lte = endFilter;
        }

        const skip = (page - 1) * limit;

        let lastUpdated = null;
        if (latestTablesState && latestTablesState.timestamp) {
          try {
            const parts = latestTablesState.timestamp.split('T');
            if (parts.length === 2) {
              const isoTime = parts[0] + 'T' + parts[1].replace(/-/g, ':') + 'Z';
              lastUpdated = new Date(isoTime).toISOString();
            } else {
              lastUpdated = new Date(latestTablesState.timestamp).toISOString();
            }
          } catch (e) {
            lastUpdated = new Date().toISOString();
          }
        } else {
          try {
            const stats = fs.statSync(path.join(ROOT, "eyes", "json", "tables_state.json"));
            lastUpdated = stats.mtime.toISOString();
          } catch (e) { }
        }

        const onlineModules = Array.from(activeModules.values()).map(m => {
          const mid = m.moduleId;
          return {
            ...m,
            cumulativeProfit: cumulativeProfitMap[mid] || 0,
            todayProfit: todayProfitMap[mid] || 0
          };
        });

        let totalBets = 0;
        let paginatedBets = [];
        if (!dbCollection) {
          throw new Error("DB not connected yet");
        }

        totalBets = await dbCollection.countDocuments(matchQ);
        paginatedBets = await dbCollection.find(matchQ).sort({ time: -1 }).skip(skip).limit(limit).toArray();

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          ok: true,
          betLog: paginatedBets,
          totalBets: totalBets,
          activeModules: onlineModules,
          lastUpdated,
          successRates: cachedSuccessRates
        }));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
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

    if (req.method === "POST" && req.url.startsWith("/api/update-state")) {
      try {
        const body = await parseJSONBody(req);
        latestTablesState = body;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
      return;
    }

    // GET routes
    let filePath;
    if (req.url === "/" || req.url === "/index.html") {
      filePath = path.join(__dirname, "index.html");
    } else if (req.url === "/bets.html" || req.url === "/bets") {
      filePath = path.join(__dirname, "bets.html");
    } else if (req.url === "/stats.html" || req.url === "/stats") {
      filePath = path.join(__dirname, "stats.html");
    } else if (req.url === "/summary.html" || req.url === "/summary") {
      filePath = path.join(__dirname, "summary.html");
    } else if (req.url.startsWith("/tables_state.json")) {
      if (latestTablesState) {
        res.writeHead(200, {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        });
        res.end(JSON.stringify(latestTablesState));
        return;
      }
      filePath = path.join(ROOT, "eyes", "json", "tables_state.json");
    } else if (req.url === "/favicon.ico") {
      filePath = path.join(__dirname, "favicon.ico");
    } else {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath);
    let contentType = "application/json";
    if (ext === ".html") contentType = "text/html";
    else if (ext === ".ico") contentType = "image/x-icon";

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

    // Start hourly snapshot automation (respects snapshotAutoEnabled toggle)
    // Delay first run slightly to let DB connect
    setTimeout(() => {
      if (snapshotAutoEnabled) takeHourlySnapshot().catch(console.error);
    }, 5000);

    // Schedule snapshot to run at the top of every hour
    const msToNextHour = (60 - new Date().getMinutes()) * 60 * 1000 - new Date().getSeconds() * 1000;
    setTimeout(() => {
      if (snapshotAutoEnabled) takeHourlySnapshot().catch(console.error);
      setInterval(() => {
        if (snapshotAutoEnabled) {
          takeHourlySnapshot().catch(console.error);
        } else {
          console.log('[Snapshot] Skipping hourly snapshot (auto-snapshot disabled)');
        }
      }, 60 * 60 * 1000);
    }, msToNextHour);
  });
}

module.exports = { startDashboard };

if (require.main === module) {
  startDashboard(null);
}
