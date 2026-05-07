const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { getBrowserArgs } = require("./browserArgs");

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

  const extractorPath = path.join(__dirname, "dom-extractor.js");
  const extractorCode = fs.readFileSync(extractorPath, "utf8");

  async function cleanUpDOM(page) {
    try {
      await page.evaluate(() => {
        // 1. Remove promotional banners
        const banners = document.querySelectorAll(
          ".snap-mandatory.scroll-smooth.no-scrollbar",
        );
        banners.forEach((b) => {
          if (b.parentElement) {
            b.parentElement.remove();
          } else {
            b.remove();
          }
        });

        // 2. Remove non-baccarat tables
        const lobbyContent = document.querySelector(".lobby-content");
        if (!lobbyContent) return;

        let activeCategory = "Good Road";
        const allCategories = [
          "Good Road",
          "Baccarat",
          "Dragon Tiger",
          "Sic Bo",
          "Thai-HiLo",
          "Roulette",
          "Xoc Dia",
        ];

        Array.from(lobbyContent.children).forEach((block) => {
          const headingEl = block.querySelector(".font24-20");
          if (headingEl) {
            const headingText = (
              headingEl.innerText ||
              headingEl.textContent ||
              ""
            ).trim();
            if (allCategories.includes(headingText)) {
              activeCategory = headingText;
            }
          }

          if (activeCategory !== "Baccarat") {
            block.remove();
          }
        });
      });
    } catch (e) {
      // Ignore errors
    }
  }

  async function removeCockroachRoad(page) {
    try {
      await page.evaluate(() => {
        const roadmaps = document.querySelectorAll(
          ".roadmap-timeline img, .roadmap-donut img",
        );
        roadmaps.forEach((img) => img.remove());
      });
    } catch (e) {
      // Ignore errors
    }
  }

  async function ensureMultiplayActive(page) {
    try {
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll(".btn-lobby"));
        const multiplayBtn = btns.find(
          (el) => el.innerText && el.innerText.includes("Multiplay"),
        );
        if (multiplayBtn && !multiplayBtn.classList.contains("inactive")) {
          multiplayBtn.click();
        }
      });
    } catch (e) {
      // Ignore errors
    }
  }

  setInterval(async () => {
    try {
      const startTime = Date.now();
      await cleanUpDOM(page);
      await removeCockroachRoad(page);
      await ensureMultiplayActive(page);
      const extractedText = await page.evaluate(extractorCode);
      if (extractedText) {
        const timestamp = new Date()
          .toISOString()
          .replace(/:/g, "-")
          .split(".")[0];
        const logEntry = `\n\n--- [${timestamp}] ---\n${extractedText}`;
        fs.writeFileSync(path.join(__dirname, "scrape_log.txt"), logEntry);
        const duration = Date.now() - startTime;
        console.log(`Scraped and saved at ${timestamp} (took ${duration}ms)`);
      }
    } catch (err) {
      console.error("Error during extraction:", err.message);
    }
  }, process.env.SCRAPE_INTERVAL ? parseInt(process.env.SCRAPE_INTERVAL) : 500);
})();
