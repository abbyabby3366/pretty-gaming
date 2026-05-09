const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
require("dotenv").config({ path: path.join(__dirname, '..', '.env') });
const { getBrowserArgs } = require("../utils/browserArgs");
const { runEyesPG, stateManager } = require("./runEyesPG");
const { sendWhatsAppNotification } = require("../utils/whatsapp_notifier");

const { launchAccount, buildAccountConfig } = require("../utils/launch_pg");

/**
 * Kill Chrome by its remote debugging port.
 * Uses taskkill on Windows to find and terminate the process that owns the port.
 */
function killChromeByPort(port) {
  try {
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

(async () => {
  const accountsPath = path.resolve(__dirname, "json", "eyes_accounts.json");
  const extractorPath = path.join(__dirname, "dom_extractor.js");
  const extractorCode = fs.readFileSync(extractorPath, "utf8");


  while (true) {
    let browserContext = null;
    let sessionRestartTimer = null;
    try {
      const acctConfig = buildAccountConfig(0, accountsPath);
      const { browser, page } = await launchAccount(acctConfig);
      browserContext = browser;

      console.log("Page loaded. Starting the extractor loop...");

      // Schedule session restart if configured
      const restartMinutes = acctConfig.sessionRestartMinutes;
      if (restartMinutes && restartMinutes > 0) {
        console.log(`[Session Restart] Scheduled in ${restartMinutes} minutes for ${acctConfig.label}.`);
        sessionRestartTimer = setTimeout(async () => {
          console.log(`\x1b[33m[Session Restart] Timer fired for ${acctConfig.label}. Killing browser...`);

          const port = acctConfig.chrome.remoteDebuggingPort;
          killChromeByPort(port);

          sendWhatsAppNotification(
            `[SESSION RESTART] Eyes module "${acctConfig.label}" restarting after ${restartMinutes} min uptime. Browser killed, relaunching...`
          ).catch(err => console.error("WhatsApp notification failed:", err.message));
        }, restartMinutes * 60 * 1000);
      }

      await runEyesPG(page, extractorCode, acctConfig);
      
      if (sessionRestartTimer) {
        clearTimeout(sessionRestartTimer);
        sessionRestartTimer = null;
      }

      console.log("\x1b[31m[RECOVERY] Extractor loop exited. Disconnecting and relaunching...\x1b[0m");
      if (browserContext) await browserContext.disconnect().catch(() => {});
      
      await new Promise(r => setTimeout(r, 2000));
    } catch (err) {
      console.error("\x1b[31m[RECOVERY] Launch/Recovery error:\x1b[0m", err.message);
      if (sessionRestartTimer) {
        clearTimeout(sessionRestartTimer);
        sessionRestartTimer = null;
      }
      if (browserContext) await browserContext.disconnect().catch(() => {});
      await new Promise(r => setTimeout(r, 5000));
    }
  }
})();
