const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, '..', '.env') });
const { getBrowserArgs } = require("../utils/browserArgs");
const { runEyesPG, stateManager } = require("./runEyesPG");
const { startDashboard } = require("../dashboard/server");
const { launchAccount, buildAccountConfig } = require("../utils/launch_pg");

(async () => {
  const accountsPath = path.resolve(__dirname, "json", "eyes_accounts.json");
  const extractorPath = path.join(__dirname, "dom_extractor.js");
  const extractorCode = fs.readFileSync(extractorPath, "utf8");

  startDashboard(stateManager);

  while (true) {
    let browserContext = null;
    try {
      const acctConfig = buildAccountConfig(0, accountsPath);
      const { browser, page } = await launchAccount(acctConfig);
      browserContext = browser;

      console.log("Page loaded. Starting the extractor loop...");

      await runEyesPG(page, extractorCode);
      
      console.log("\x1b[31m[RECOVERY] Extractor loop exited. Disconnecting and relaunching...\x1b[0m");
      if (browserContext) await browserContext.disconnect().catch(() => {});
      
      await new Promise(r => setTimeout(r, 2000));
    } catch (err) {
      console.error("\x1b[31m[RECOVERY] Launch/Recovery error:\x1b[0m", err.message);
      if (browserContext) await browserContext.disconnect().catch(() => {});
      await new Promise(r => setTimeout(r, 5000));
    }
  }
})();
