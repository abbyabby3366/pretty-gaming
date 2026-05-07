const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, '..', '.env') });
const { getBrowserArgs } = require("../utils/browserArgs");
const { runEyesPG, stateManager } = require("./runPG");
const { startDashboard } = require("./dashboard/server");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    protocolTimeout: 30000,
    args: getBrowserArgs(),
  });
  const page = await browser.newPage();

  // ==========================================
  // NAVIGATE TO YOUR LOBBY
  // ==========================================
  await page.goto("https://hippo168.com/lobby/multiplay", {
    waitUntil: "networkidle2",
  });

  // Handle the "Welcome to Pretty Gaming" Confirm modal
  try {
    console.log("Waiting for 'Confirm' button...");
    await page.waitForFunction(
      () => {
        const btns = Array.from(document.querySelectorAll(".clickActive"));
        const confirmBtn = btns.find(
          (el) => el.innerText && el.innerText.includes("Confirm"),
        );
        if (confirmBtn) {
          confirmBtn.click();
          return true;
        }
        return false;
      },
      { timeout: 15000 },
    );
    console.log("Clicked 'Confirm' on Welcome modal.");
  } catch (err) {
    console.log("No 'Confirm' modal found or timed out.");
  }

  console.log("Page loaded. Starting the extractor every second...");

  const extractorPath = path.join(__dirname, "dom_extractor.js");
  const extractorCode = fs.readFileSync(extractorPath, "utf8");


  startDashboard(stateManager);
  runEyesPG(page, extractorCode);
})();
