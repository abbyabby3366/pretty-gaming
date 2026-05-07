const fs = require("fs");
const path = require("path");
const { cleanUpDOM } = require("../utils/cleanUpDOM");
const { ensureMultiplayActive } = require("../utils/ensureMultiplayActive");

function scrapePG(page, extractorCode) {
  setInterval(async () => {
    try {
      const startTime = Date.now();
      if (String(process.env.ENABLE_DOM_CLEANUP).toLowerCase() !== "false") {
        await cleanUpDOM(page);
      }
      await ensureMultiplayActive(page);
      const extractedText = await page.evaluate(extractorCode);
      if (extractedText) {
        const timestamp = new Date()
          .toISOString()
          .replace(/:/g, "-")
          .split(".")[0];
        const logEntry = `\n\n--- [${timestamp}] ---\n${extractedText}`;
        fs.writeFileSync(path.join(__dirname, "..", "scrape_log.txt"), logEntry);
        const duration = Date.now() - startTime;
        console.log(`Scraped and saved at ${timestamp} (took ${duration}ms)`);
      }
    } catch (err) {
      console.error("Error during extraction:", err.message);
    }
  }, process.env.SCRAPE_INTERVAL ? parseInt(process.env.SCRAPE_INTERVAL) : 500);
}

module.exports = { scrapePG };
