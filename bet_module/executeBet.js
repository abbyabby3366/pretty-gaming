/**
 * Injects the betting script into the live Chromium page to place the bet and verify.
 * @param {import('puppeteer').Page} page 
 * @param {Object} betConfig 
 * @returns {Promise<{success: boolean, reason?: string}>} 
 */
async function executeBetInBrowser(page, betConfig) {
  try {
    return await page.evaluate(async (config) => {
      // 1. VERIFY WE HAVE A CLICKS SEQUENCE
      if (!config.clicksSequence || config.clicksSequence.length === 0) {
        return { success: false, reason: "No valid chip clicks calculated for bet amount" };
      }

      const chips = document.querySelectorAll(config.chipSelector);
      if (chips.length === 0) {
        return { success: false, reason: "No chips found on screen" };
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
        
        // Exact match OR starts with label followed by a number (odds like 1:1)
        // This prevents "Player" from accidentally matching "Player Pair 11:1"
        const regex = new RegExp(`^${domLabel}(\\s+\\d.*)?$`, 'i');
        if (regex.test(areaText)) {
          targetBetArea = area;
          break;
        }
      }
      if (!targetBetArea) return { success: false, reason: `Bet area not found (looking for "${domLabel}" from betType "${config.betType}")` };

      // 5. EXECUTE BETS
      for (let clickCmd of config.clicksSequence) {
        const chipEl = chips[clickCmd.chipIndex];
        if (!chipEl) {
          return { success: false, reason: `Chip index ${clickCmd.chipIndex} out of bounds` };
        }
        // Select this chip
        chipEl.click();
        await new Promise(resolve => setTimeout(resolve, config.clickDelayMs));

        // Click target area 'times' times
        const placementDelay = config.betPlacementDelayMs || 150;
        for (let t = 0; t < clickCmd.times; t++) {
          targetBetArea.click();
          await new Promise(resolve => setTimeout(resolve, placementDelay)); 
        }
      }

      // 6. VERIFY
      let betConfirmed = false;
      let betAmount = null;
      for (let i = 0; i < 20; i++) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        const chip = targetBetArea.querySelector(".bettingChip.placed");
        if (chip) {
          betConfirmed = true;
          // Extract the text inside the chip which represents the bet amount
          betAmount = chip.textContent.trim();
          break;
        }
      }

      // 7. GET BALANCE
      let currentBalance = null;
      try {
        const balanceZone = document.querySelector("#balance-zone .block-newline");
        if (balanceZone) {
          currentBalance = balanceZone.textContent.trim();
        }
      } catch (e) {}

      if (!betConfirmed) {
        return { success: false, reason: "Betting chip not placed visually", balance: currentBalance };
      }

      return { success: true, betAmount: betAmount, balance: currentBalance };
    }, betConfig);
  } catch (err) {
    console.error(`[Bet Module] Puppeteer evaluate error:`, err.message);
    return { success: false, reason: `Evaluate error: ${err.message}` };
  }
}

module.exports = { executeBetInBrowser };
