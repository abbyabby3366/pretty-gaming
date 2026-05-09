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
        console.log(`[Session Restart] Scheduled in ${restartMinutes} minutes for ${acctConfig.label}.`);
        sessionRestartTimer = setTimeout(async () => {
          console.log(`\x1b[33m[Session Restart] Timer fired for ${acctConfig.label}. Closing game pages...`);

          // Close all game pages, keep Chrome alive with a blank tab
          try {
            if (browserContext) {
              const blankPage = await browserContext.newPage();
              await blankPage.goto('about:blank').catch(() => {});
              
              const allPages = await browserContext.pages();
              for (const p of allPages) {
                if (p !== blankPage) {
                  await p.close().catch(() => {});
                }
              }
              console.log(`[Session Restart] All game pages closed. Blank tab kept alive for reconnect.`);
            }
          } catch (e) {
            console.error(`[Session Restart] Error closing pages:`, e.message);
          }

          sendWhatsAppNotification(
            `[SESSION RESTART] Eyes module "${acctConfig.label}" session restart after ${restartMinutes} min. Relaunching...`
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
