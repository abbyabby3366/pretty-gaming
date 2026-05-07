/**
 * Injects the betting script into the live Chromium page to place the bet and verify.
 * @param {import('puppeteer').Page} page 
 * @param {Object} betConfig 
 * @returns {Promise<{success: boolean, reason?: string}>} 
 */
async function executeBetInBrowser(page, betConfig) {
  try {
    return await page.evaluate(async (config) => {
      // 1. SELECT CHIP
      const chips = document.querySelectorAll(config.chipSelector);
      if (chips.length > 0) {
        if (chips[config.chipIndex]) {
          chips[config.chipIndex].click();
          await new Promise(resolve => setTimeout(resolve, config.clickDelayMs));
        } else {
          return { success: false, reason: "Chip index out of bounds" };
        }
      } else {
        return { success: false, reason: "No chips found" };
      }

      // 2. FIND TABLE
      const allTables = document.querySelectorAll(".bg-table");
      let targetTable = null;
      for (let table of allTables) {
        const titleEl = table.querySelector('img[src*="fav"]')?.nextElementSibling;
        if (titleEl && titleEl.textContent.trim() === config.tableName) {
          targetTable = table;
          break;
        }
      }
      if (!targetTable) return { success: false, reason: "Table not found" };

      // SCROLL TABLE INTO VIEW
      targetTable.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await new Promise(resolve => setTimeout(resolve, 300));

      // 3. CHECK NO MORE BETS
      const noMoreBetEl = targetTable.querySelector("#noMoreBet");
      if (noMoreBetEl && !noMoreBetEl.classList.contains("hidden") && noMoreBetEl.style.display !== "none") {
        return { success: false, reason: "No more bets accepted" };
      }

      // 4. FIND BET AREA
      // Map EV snapshot keys to DOM visible text labels
      const betTypeMap = {
        "PlayerBet": "Player",
        "BankerBet": "Banker",
        "TieBet": "Tie",
        "Player": "Player",
        "Banker": "Banker",
        "Tie": "Tie",
      };
      const domLabel = betTypeMap[config.betType] || config.betType;

      const betAreas = targetTable.querySelectorAll(".clickActive");
      let targetBetArea = null;
      for (let area of betAreas) {
        const areaText = (area.innerText || area.textContent || "").replace(/\s+/g, " ").trim();
        if (areaText === domLabel || areaText.startsWith(domLabel + " ")) {
          targetBetArea = area;
          break;
        }
      }
      if (!targetBetArea) return { success: false, reason: `Bet area not found (looking for "${domLabel}" from betType "${config.betType}")` };

      // 5. CLICK AND VERIFY
      targetBetArea.click();

      let betConfirmed = false;
      for (let i = 0; i < 10; i++) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        if (targetBetArea.querySelector(".bettingChip.placed")) {
          betConfirmed = true;
          break;
        }
      }

      if (!betConfirmed) {
        return { success: false, reason: "Betting chip not placed visually" };
      }

      return { success: true };
    }, betConfig);
  } catch (err) {
    console.error(`[Bet Module] Puppeteer evaluate error:`, err.message);
    return { success: false, reason: `Evaluate error: ${err.message}` };
  }
}

module.exports = { executeBetInBrowser };
