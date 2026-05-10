const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, '..', '.env') });
const { getBrowserArgs } = require("../utils/browserArgs");
const { runEyesPG, stateManager } = require("./runEyesPG");
const { sendWhatsAppNotification } = require("../utils/whatsapp_notifier");

const { launchAccount, buildAccountConfig } = require("../utils/launch_pg");

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
        console.log(`[Session Restart] Polling enabled. Will restart ${restartMinutes} minutes after login for ${acctConfig.label}.`);
        const launchTime = Date.now();
        
        sessionRestartTimer = setInterval(async () => {
          let loginTime = launchTime;
          try {
            const timestampsStr = require('fs').readFileSync(require('path').resolve(__dirname, "..", "utils", "login_timestamps.json"), 'utf8');
            const timestamps = JSON.parse(timestampsStr);
            if (timestamps[acctConfig.label]) loginTime = timestamps[acctConfig.label];
          } catch (e) {}
          
          const elapsedMin = (Date.now() - loginTime) / 60000;
          if (elapsedMin < restartMinutes) return;
          
          clearInterval(sessionRestartTimer);
          sessionRestartTimer = null;

          console.log(`\x1b[33m[Session Restart] ${elapsedMin.toFixed(1)} mins elapsed for ${acctConfig.label}. Closing game pages...\x1b[0m`);

          // Step 3: Close Winbox and Game pages, but leave the default about:blank to keep Chrome alive
          console.log(`[Session Restart] Closing Winbox and Game pages to force a fresh login...`);
          try {
            if (browserContext) {
              const allPages = await browserContext.pages();
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

          sendWhatsAppNotification(
            `[SESSION RESTART] Eyes module "${acctConfig.label}" session restart after ${restartMinutes} min. Relaunching...`
          ).catch(err => console.error("WhatsApp notification failed:", err.message));
        }, 30000); // Check every 30 seconds
      }

      await runEyesPG(page, extractorCode, acctConfig);
      
      if (sessionRestartTimer) {
        clearInterval(sessionRestartTimer);
        sessionRestartTimer = null;
      }

      console.log("\x1b[31m[RECOVERY] Extractor loop exited. Disconnecting and relaunching...\x1b[0m");
      sendWhatsAppNotification(
        `[RECOVERY] Eyes module "${acctConfig.label}" relaunching. Reason: Browser tab was closed unexpectedly.`
      ).catch(err => console.error("WhatsApp notification failed:", err.message));

      if (browserContext) await browserContext.disconnect().catch(() => {});
      
      await new Promise(r => setTimeout(r, 2000));
    } catch (err) {
      console.error("\x1b[31m[RECOVERY] Launch/Recovery error:\x1b[0m", err.message);
      if (sessionRestartTimer) {
        clearInterval(sessionRestartTimer);
        sessionRestartTimer = null;
      }
      
      const label = (typeof acctConfig !== 'undefined' && acctConfig.label) ? acctConfig.label : "PG Eyes";
      sendWhatsAppNotification(
        `[RECOVERY] Eyes module "${label}" failed and is relaunching. Reason: ${err.message}`
      ).catch(e => console.error("WhatsApp notification failed:", e.message));

      if (browserContext) await browserContext.disconnect().catch(() => {});
      await new Promise(r => setTimeout(r, 5000));
    }
  }
})();
