const fs = require("fs");
const path = require("path");
const { cleanUpDOM } = require("../utils/cleanUpDOM");
const { ensureMultiplayActive } = require("../utils/ensureMultiplayActive");

/**
 * Pure scrape function. Extracts structured table data from the page.
 * @param {import('puppeteer').Page} page
 * @param {string} extractorCode - The dom_extractor.js source to evaluate
 * @returns {Promise<{text: string, tables: Array} | null>}
 */
async function scrapePG(page, extractorCode) {
  if (String(process.env.ENABLE_DOM_CLEANUP).toLowerCase() !== "false") {
    await cleanUpDOM(page);
  }
  await ensureMultiplayActive(page);

  const rawResult = await page.evaluate(extractorCode);
  if (!rawResult) return null;

  try {
    return JSON.parse(rawResult);
  } catch {
    // Fallback: old-style plain text (shouldn't happen)
    return { text: rawResult, tables: [] };
  }
}

module.exports = { scrapePG };
