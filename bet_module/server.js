const http = require("http");
const crypto = require("crypto");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const { launchAccount, buildAccountConfig } = require("../utils/launch_pg");
const { cleanUpDOM } = require("../utils/cleanUpDOM");
const { executeBetInBrowser } = require("./executeBet");

const PORT = parseInt(process.env.PORT || "4001", 10);
const CENTRAL_URL = process.env.CENTRAL_URL || "http://127.0.0.1:3456";
const MODULE_ID = "bet-module-" + PORT;
const BASE_URL = `http://127.0.0.1:${PORT}`;

const betQueue = [];
let isBrowserReady = false;
let browserPage = null;
let domCleanupInterval = null;
let latestBalance = null;

const initialAccountsPath = path.resolve(__dirname, "json", "bet_accounts.json");
const initialAcctConfig = buildAccountConfig(0, initialAccountsPath);
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
      
      if (!isBrowserReady || !browserPage) {
        reason = "Browser not ready for bet";
        console.error(`[Bet Module] ${reason}.`);
      } else {
        // Calculate clicks sequence
        const { buildAccountConfig } = require("../utils/launch_pg");
        const acctConfig = buildAccountConfig(0, path.resolve(__dirname, "json", "bet_accounts.json"));
        const chipValues = acctConfig.chipValues || ["ALL_IN", 10, 50, 100, 500, 1000];
        const targetAmount = bet.recommendedBetAmount || bet.amount || bet.chipIndex || 0;
        
        let clicksSequence = [];
        if ((targetAmount === "ALL_IN" || targetAmount === "all in") && chipValues.map(v => String(v).toUpperCase()).includes("ALL_IN")) {
          const idx = chipValues.findIndex(v => String(v).toUpperCase() === "ALL_IN");
          clicksSequence.push({ chipIndex: idx, times: 1 });
        } else {
          let amount = parseInt(targetAmount, 10);
          if (!isNaN(amount) && amount > 0) {
            let availableChips = chipValues
              .map((val, index) => ({ val: parseInt(val, 10), index }))
              .filter(c => !isNaN(c.val))
              .sort((a, b) => b.val - a.val);

            for (let chip of availableChips) {
              if (amount >= chip.val) {
                let times = Math.floor(amount / chip.val);
                clicksSequence.push({ chipIndex: chip.index, times });
                amount -= times * chip.val;
              }
            }
          } else {
             // Fallback
             clicksSequence.push({ chipIndex: bet.chipIndex || 0, times: 1 });
          }
        }

        const betConfig = {
          tableName: bet.tableName,
          betType: bet.target || bet.betType,
          clicksSequence: clicksSequence,
          clickDelayMs: 200,
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
      }
      
      const status = success ? "SUCCESS" : "FAILED";
      const amountText = success && bet.actualBetAmount ? ` [Amount: ${bet.actualBetAmount}]` : "";
      const reasonText = success ? "" : ` (Reason: ${reason || "None given"})`;
      console.log(`[${currentAccountLabel}] ${success ? '✅' : '❌'} Result: ${status}${amountText}${reasonText}`);

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
          betType: bet.target || bet.betType
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

async function initBrowser() {
  const accountsPath = path.resolve(__dirname, "json", "bet_accounts.json");
  
  while (true) {
    let browserContext = null;
    try {
      // 0 maps to the Winbox config we created earlier
      const acctConfig = buildAccountConfig(0, accountsPath); 
      currentModuleLabel = `Node (${acctConfig.platform})`;
      currentAccountLabel = acctConfig.label || `Account_${PORT}`;
      console.log(`\n[Bet Module] Starting browser launch sequence for ${currentAccountLabel}...`);
      
      const { browser, page } = await launchAccount(acctConfig);
      browserContext = browser;
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
      
      // Wait until browser closes
      while (!page.isClosed()) {
         await new Promise(r => setTimeout(r, 2000));
      }
      
      if (domCleanupInterval) {
        clearInterval(domCleanupInterval);
        domCleanupInterval = null;
      }
      
      console.log(`\x1b[31m[Bet Module] Browser closed or crashed. Relaunching...\x1b[0m`);
      isBrowserReady = false;
      browserPage = null;
    } catch (err) {
      console.error("\x1b[31m[Bet Module] Launch error:\x1b[0m", err.message);
      isBrowserReady = false;
      browserPage = null;
      if (domCleanupInterval) {
        clearInterval(domCleanupInterval);
        domCleanupInterval = null;
      }
      if (browserContext) await browserContext.disconnect().catch(() => {});
      await new Promise(r => setTimeout(r, 5000));
    }
  }
}

server.listen(PORT, () => {
  console.log(`[Bet Module] 🟢 Online on ${BASE_URL} | Targeting Central: ${CENTRAL_URL}`);
  setInterval(sendHeartbeat, 10000);
  setInterval(updateBalance, 5000); // Check balance periodically
  sendHeartbeat(); // initial heartbeat
  runBetPG(); // start processing loop
  initBrowser(); // start browser lifecycle loop
});
