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
async function scrapePG(page, extractorCode, acctConfig = {}) {
  if (acctConfig.enableDomCleanup) {
    await cleanUpDOM(page);
  }
  await ensureMultiplayActive(page);

  // Prevent hanging indefinitely if the Chromium tab freezes
  const evaluatePromise = page.evaluate(extractorCode);
  const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("page.evaluate timeout")), 15000));
  
  const rawResult = await Promise.race([evaluatePromise, timeoutPromise]);
  if (!rawResult) return null;

  try {
    return JSON.parse(rawResult);
  } catch {
    // Fallback: old-style plain text (shouldn't happen)
    return { text: rawResult, tables: [] };
  }
}

module.exports = { scrapePG };
