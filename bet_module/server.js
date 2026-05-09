const http = require("http");
const crypto = require("crypto");
const path = require("path");
const { execSync } = require("child_process");
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
let sessionRestartPending = false;
let isBetInProgress = false;
let sessionRestartTimer = null;

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
      const balance = await browserPage.evaluate(() => {
        const el = document.querySelector("#balance-zone .block-newline");
        return el ? el.textContent.trim() : null;
      });
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
 * Kill Chrome by its remote debugging port.
 * Uses taskkill on Windows to find and terminate the process that owns the port.
 */
function killChromeByPort(port) {
  try {
    // Find the PID listening on the debugging port
    const result = execSync(`netstat -ano | findstr :${port} | findstr LISTENING`, { encoding: 'utf-8' });
    const lines = result.trim().split('\n');
    const pids = new Set();
    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid && /^\d+$/.test(pid) && pid !== '0') pids.add(pid);
    }
    for (const pid of pids) {
      console.log(`[Session Restart] Killing Chrome process PID ${pid}...`);
      execSync(`taskkill /PID ${pid} /T /F`, { encoding: 'utf-8' });
    }
    return true;
  } catch (e) {
    console.error(`[Session Restart] Failed to kill Chrome on port ${port}:`, e.message);
    return false;
  }
}

/**
 * Schedules a session restart after the configured number of minutes.
 * For the bet module, it:
 * 1. Immediately sets isBrowserReady = false so central won't route new bets
 * 2. Waits for any in-progress bet to complete
 * 3. Kills the Chrome browser process
 * 4. Sends a WhatsApp notification
 * The existing browser lifecycle loop then auto-relaunches.
 */
function scheduleSessionRestart(acctConfig) {
  const minutes = acctConfig.sessionRestartMinutes;
  if (!minutes || minutes <= 0) return;
  
  // Clear any existing timer
  if (sessionRestartTimer) clearTimeout(sessionRestartTimer);
  
  const ms = minutes * 60 * 1000;
  console.log(`[Session Restart] Scheduled in ${minutes} minutes for ${acctConfig.label}.`);
  
  sessionRestartTimer = setTimeout(async () => {
    console.log(`\x1b[33m[Session Restart] Timer fired for ${acctConfig.label}. Initiating graceful restart...\x1b[0m`);
    
    // Step 1: Stop accepting new bets immediately
    isBrowserReady = false;
    sessionRestartPending = true;
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
    
    // Step 3: Close Chrome gracefully (avoids stale lock files)
    console.log(`[Session Restart] Closing Chrome gracefully...`);
    let closed = false;
    if (browserInstance) {
      try {
        await browserInstance.close();
        closed = true;
        console.log(`[Session Restart] Chrome closed gracefully.`);
      } catch (e) {
        console.error(`[Session Restart] Graceful close failed: ${e.message}. Falling back to taskkill...`);
      }
    }
    if (!closed) {
      const port = acctConfig.chrome.remoteDebuggingPort;
      killChromeByPort(port);
    }
    
    // Step 4: Send WhatsApp notification
    const uptimeStr = `${minutes} min`;
    sendWhatsAppNotification(
      `[SESSION RESTART] Bet module "${acctConfig.label}" restarting after ${uptimeStr} uptime. Browser killed, relaunching...`
    ).catch(err => console.error("WhatsApp notification failed:", err.message));
    
    sessionRestartPending = false;
    // The existing browser lifecycle loop in initBrowser will detect the closed page and relaunch
  }, ms);
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
        clearTimeout(sessionRestartTimer);
        sessionRestartTimer = null;
      }
      
      console.log(`\x1b[31m[Bet Module] Browser closed or crashed. Relaunching...\x1b[0m`);
      isBrowserReady = false;
      browserPage = null;
      browserInstance = null;
    } catch (err) {
      console.error("\x1b[31m[Bet Module] Launch error:\x1b[0m", err.message);
      isBrowserReady = false;
      browserPage = null;
      browserInstance = null;
      if (domCleanupInterval) {
        clearInterval(domCleanupInterval);
        domCleanupInterval = null;
      }
      if (sessionRestartTimer) {
        clearTimeout(sessionRestartTimer);
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
