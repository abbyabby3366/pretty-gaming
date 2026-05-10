const http = require("http");
const crypto = require("crypto");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const { launchAccount, buildAccountConfig } = require("../utils/launch_pg");
const { cleanUpDOM } = require("../utils/cleanUpDOM");
const { executeBetInBrowser } = require("./executeBet");
const { sendWhatsAppNotification } = require("../utils/whatsapp_notifier");

const os = require("os");

const PORT = parseInt(process.env.BET_PORT || "4001", 10);
const CENTRAL_URL = process.env.CENTRAL_URL || "http://127.0.0.1:3456";
const BASE_URL = process.env.BET_MODULE_BASE_URL || `http://127.0.0.1:${PORT}`;
// MODULE_ID must be globally unique across machines. Derive from BASE_URL so
// two computers both using port 4001 don't collide in the dashboard's Map.
const MODULE_ID = process.env.MODULE_ID || `bet-${os.hostname()}-${PORT}`;
const ACCOUNT_INDEX = parseInt(process.env.ACCOUNT_INDEX || "0", 10);

const betQueue = [];
let isBrowserReady = false;
let browserPage = null;
let browserInstance = null;
let domCleanupInterval = null;
let latestBalance = null;
let isBetInProgress = false;
let sessionRestartTimer = null;
let isIntentionalRestart = false;
let consecutiveBetErrors = 0;

const initialAccountsPath = path.resolve(__dirname, "json", "bet_accounts.json");
const initialAcctConfig = buildAccountConfig(ACCOUNT_INDEX, initialAccountsPath);
let currentModuleLabel = `Node (${initialAcctConfig.platform})`;
let currentAccountLabel = initialAcctConfig.label || `Account_${PORT}`;

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

function sendHeartbeat() {
  const payload = {
    moduleId: MODULE_ID,
    baseUrl: BASE_URL,
    label: currentModuleLabel,
    accounts: [{ label: currentAccountLabel, isAcceptingBets: isBrowserReady, balance: latestBalance }]
  };

  fetch(`${CENTRAL_URL}/api/bet-module/heartbeat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).catch(() => {
    // silently fail if central is offline
  });
}

async function updateBalance() {
  if (isBrowserReady && browserPage) {
    try {
      const evaluatePromise = browserPage.evaluate(() => {
        const el = document.querySelector("#balance-zone .block-newline");
        return el ? el.textContent.trim() : null;
      });
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 5000));
      const balance = await Promise.race([evaluatePromise, timeoutPromise]);
      if (balance) {
        latestBalance = balance;
      }
    } catch (e) {}
  }
}

async function runBetPG() {
  while (true) {
    if (betQueue.length > 0) {
      const bet = betQueue.shift();
      console.log(`\n[${currentAccountLabel}] 📥 Received Bet: ${bet.uuid || bet.id} for ${bet.tableName} (${bet.target || bet.betType})`);
      
      let success = false;
      let reason = "Unknown error";
      
      isBetInProgress = true;
      
      if (!isBrowserReady || !browserPage) {
        reason = "Browser not ready for bet";
        console.error(`[Bet Module] ${reason}.`);
      } else {
        // Calculate clicks sequence
        const targetAmount = bet.recommendedBetAmount || bet.amount || bet.chipIndex || 0;
        const betConfig = {
          tableName: bet.tableName,
          betType: bet.target || bet.betType,
          targetAmount: targetAmount,
          betPlacementDelayMs: parseInt(process.env.BET_PLACEMENT_DELAY_MS || "150", 10),
          chipSettleDelayMs: parseInt(process.env.CHIP_SETTLE_DELAY_MS || "500", 10),
          chipSelector: ".chip",
        };

        const result = await executeBetInBrowser(browserPage, betConfig);
        success = result.success;
        reason = result.reason;
        if (result.betAmount) {
          bet.actualBetAmount = result.betAmount;
        }
        if (result.balance !== undefined && result.balance !== null) {
          latestBalance = result.balance;
        }
        bet.timer = result.timer != null ? result.timer : null;
      }
      
      isBetInProgress = false;
      
      const status = success ? "SUCCESS" : "FAILED";
      
      if (!success) {
        consecutiveBetErrors++;
        if (consecutiveBetErrors >= 3) {
          if (currentAccountLabel && currentAccountLabel.includes("964")) {
            sendWhatsAppNotification(
              `[ALERT] Bet module "${currentAccountLabel}" encountered 3 consecutive bet errors. Last reason: ${reason || "None"}`
            ).catch(err => console.error("WhatsApp notification failed:", err.message));
          }
          consecutiveBetErrors = 0;
        }
      } else {
        consecutiveBetErrors = 0;
      }

      const amountText = success && bet.actualBetAmount ? ` [Amount: ${bet.actualBetAmount}]` : "";
      const reasonText = success ? "" : ` (Reason: ${reason || "None given"})`;
      const timerText = bet.timer != null ? ` [Timer: ${bet.timer}s]` : "";
      console.log(`[${currentAccountLabel}] ${success ? '✅' : '❌'} Result: ${status}${amountText}${reasonText}${timerText}`);

      // Report result to central server
      fetch(`${CENTRAL_URL}/api/telemetry/bet-result`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          betId: bet.uuid || bet.id,
          status: status,
          reason: reason,
          betAmount: bet.actualBetAmount,
          tableNumber: bet.tableName,
          betType: bet.target || bet.betType,
          timer: bet.timer
        })
      }).catch(err => {
        console.error(`[${currentAccountLabel}] Failed to report result to central:`, err.message);
      });
    } else {
      await new Promise(r => setTimeout(r, 500));
    }
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/prettygaming/bet") {
    try {
      const payload = await parseJSONBody(req);
      if (!isBrowserReady) {
        res.writeHead(503, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ ok: false, error: "Browser not ready" }));
      }
      
      betQueue.push(payload);
      res.writeHead(202, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, status: "queued", betId: payload.id || payload.uuid }));
    } catch (e) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: false, error: e.message }));
    }
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

/**
 * Schedules a session restart after the configured number of minutes.
 * Instead of killing Chrome, we close all game/winbox tabs while keeping
 * a blank tab alive. This makes page.isClosed() return true so the
 * initBrowser loop picks up and re-runs launchAccount, which reconnects
 * to the still-running Chrome and re-navigates through login.
 */
function scheduleSessionRestart(acctConfig) {
  const minutes = acctConfig.sessionRestartMinutes;
  if (!minutes || minutes <= 0) return;
  
  // Clear any existing timer
  if (sessionRestartTimer) clearInterval(sessionRestartTimer);
  
  console.log(`[Session Restart] Polling enabled. Will restart ${minutes} minutes after login for ${acctConfig.label}.`);
  const launchTime = Date.now();
  
  sessionRestartTimer = setInterval(async () => {
    let loginTime = launchTime;
    try {
      const timestampsStr = require('fs').readFileSync(require('path').resolve(__dirname, "..", "utils", "login_timestamps.json"), 'utf8');
      const timestamps = JSON.parse(timestampsStr);
      if (timestamps[acctConfig.label]) loginTime = timestamps[acctConfig.label];
    } catch (e) {}
    
    const elapsedMin = (Date.now() - loginTime) / 60000;
    if (elapsedMin < minutes) return;
    
    clearInterval(sessionRestartTimer);
    sessionRestartTimer = null;
    
    console.log(`\x1b[33m[Session Restart] ${elapsedMin.toFixed(1)} mins elapsed for ${acctConfig.label}. Initiating graceful restart...\x1b[0m`);
    
    // Step 1: Stop accepting new bets immediately
    isBrowserReady = false;
    sendHeartbeat(); // Immediately notify central that isAcceptingBets is now false
    
    // Step 2: Wait for any in-progress bet to complete
    const maxWaitMs = 60000; // Max 60s to wait for a bet to finish
    const startWait = Date.now();
    while (isBetInProgress && (Date.now() - startWait < maxWaitMs)) {
      console.log(`[Session Restart] Waiting for current bet to finish...`);
      await new Promise(r => setTimeout(r, 1000));
    }
    if (isBetInProgress) {
      console.log(`\x1b[31m[Session Restart] Bet still in progress after ${maxWaitMs / 1000}s, forcing restart anyway.\x1b[0m`);
    }
    
    // Step 3: Close Winbox and Game pages, but leave the default about:blank to keep Chrome alive
    console.log(`[Session Restart] Closing Winbox and Game pages to force a fresh login...`);
    isIntentionalRestart = true;
    try {
      if (browserInstance) {
        const allPages = await browserInstance.pages();
        for (const p of allPages) {
          const url = p.url() || "";
          if (url !== "about:blank" && !url.startsWith("chrome://")) {
            await p.close().catch(() => {});
          }
        }
        console.log(`[Session Restart] Winbox and Game pages closed. Default page kept alive.`);
        
        // Update login timestamp to prevent immediate re-triggering in subsequent loops
        try {
          const fs = require('fs');
          const path = require('path');
          const tsFile = path.resolve(__dirname, "..", "utils", "login_timestamps.json");
          const timestampsStr = fs.readFileSync(tsFile, 'utf8');
          const timestamps = JSON.parse(timestampsStr);
          timestamps[acctConfig.label] = Date.now();
          fs.writeFileSync(tsFile, JSON.stringify(timestamps, null, 2));
        } catch (e) {
          console.error("[Session Restart] Failed to update login timestamp:", e.message);
        }
      }
    } catch (e) {
      console.error(`[Session Restart] Error closing pages:`, e.message);
    }
    
    // The initBrowser loop will detect page.isClosed() and relaunch via launchAccount
  }, 30000); // Poll every 30 seconds
}

async function initBrowser() {
  const accountsPath = path.resolve(__dirname, "json", "bet_accounts.json");
  
  while (true) {
    let browserContext = null;
    try {
      const acctConfig = buildAccountConfig(ACCOUNT_INDEX, accountsPath); 
      currentModuleLabel = `Node (${acctConfig.platform})`;
      currentAccountLabel = acctConfig.label || `Account_${PORT}`;
      console.log(`\n[Bet Module] Starting browser launch sequence for ${currentAccountLabel} (Account Index: ${ACCOUNT_INDEX})...`);
      
      const { browser, page } = await launchAccount(acctConfig);
      browserContext = browser;
      browserInstance = browser;
      browserPage = page;
      isBrowserReady = true;

      console.log(`\x1b[32m[Bet Module] Winbox Launch Successful! Module is ready to accept bets.\x1b[0m`);
      
      // Get initial balance immediately and send update
      await updateBalance();
      sendHeartbeat();
      
      if (acctConfig.enableDomCleanup) {
        console.log(`[Bet Module] DOM Cleanup is enabled. Starting periodic cleanup...`);
        domCleanupInterval = setInterval(() => {
          if (isBrowserReady && browserPage) {
            cleanUpDOM(browserPage).catch(() => {});
          }
        }, 5000);
      }
      
      // Schedule session restart if configured
      scheduleSessionRestart(acctConfig);
      
      // Wait until browser closes
      while (!page.isClosed()) {
         await new Promise(r => setTimeout(r, 2000));
      }
      
      if (domCleanupInterval) {
        clearInterval(domCleanupInterval);
        domCleanupInterval = null;
      }
      if (sessionRestartTimer) {
        clearInterval(sessionRestartTimer);
        sessionRestartTimer = null;
      }
      
      console.log(`\x1b[31m[Bet Module] Browser closed or crashed. Relaunching...\x1b[0m`);
      if (!isIntentionalRestart) {
        sendWhatsAppNotification(
          `[RECOVERY] Bet module "${currentAccountLabel}" relaunching. Reason: Browser tab was closed unexpectedly.`
        ).catch(err => console.error("WhatsApp notification failed:", err.message));
      }
      isIntentionalRestart = false;

      isBrowserReady = false;
      browserPage = null;
      browserInstance = null;
      // Disconnect puppeteer from the browser (Chrome stays alive if session restart)
      if (browserContext) await browserContext.disconnect().catch(() => {});
    } catch (err) {
      console.error("\x1b[31m[Bet Module] Launch error:\x1b[0m", err.message);
      if (!isIntentionalRestart) {
        sendWhatsAppNotification(
          `[RECOVERY] Bet module "${currentAccountLabel}" failed and is relaunching. Reason: ${err.message}`
        ).catch(e => console.error("WhatsApp notification failed:", e.message));
      }
      isIntentionalRestart = false;

      isBrowserReady = false;
      browserPage = null;
      browserInstance = null;
      if (domCleanupInterval) {
        clearInterval(domCleanupInterval);
        domCleanupInterval = null;
      }
      if (sessionRestartTimer) {
        clearInterval(sessionRestartTimer);
        sessionRestartTimer = null;
      }
      if (browserContext) await browserContext.disconnect().catch(() => {});
      await new Promise(r => setTimeout(r, 5000));
    }
  }
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\x1b[31m[Bet Module] FATAL: Port ${PORT} is already in use. Set a unique BET_PORT env var for each module instance.\x1b[0m`);
    process.exit(1);
  }
  throw err;
});

server.listen(PORT, () => {
  console.log(`[Bet Module] 🟢 Online on ${BASE_URL} | Account Index: ${ACCOUNT_INDEX} | Targeting Central: ${CENTRAL_URL}`);
  setInterval(sendHeartbeat, 10000);
  setInterval(updateBalance, 5000); // Check balance periodically
  sendHeartbeat(); // initial heartbeat
  runBetPG(); // start processing loop
  initBrowser(); // start browser lifecycle loop
});
