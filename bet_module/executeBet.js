/**
 * Injects the betting script into the live Chromium page to place the bet and verify.
 * @param {import('puppeteer').Page} page 
 * @param {Object} betConfig 
 * @returns {Promise<{success: boolean, reason?: string}>} 
 */
async function executeBetInBrowser(page, betConfig) {
  try {
    return await page.evaluate(async (config) => {
      const chips = document.querySelectorAll(config.chipSelector);
      if (chips.length === 0) {
        return { success: false, reason: "No chips found on screen" };
      }

      // 1.5 DYNAMIC CHIP SELECTION
      if (config.targetAmount && config.targetAmount !== "ALL_IN") {
        let parsedChips = [];
        chips.forEach((c, index) => {
          let chipValue = 0;
          const img = c.querySelector('img.chipVal') || c.querySelector('img');
          
          if (img && img.src) {
            const match = img.src.match(/chip\/([a-zA-Z0-9.]+)\.svg/);
            if (match) {
              let valStr = match[1].toUpperCase();
              let val = parseFloat(valStr);
              if (valStr.endsWith('K')) val *= 1000;
              if (!isNaN(val) && val > 0) chipValue = val;
            }
          }
          
          if (chipValue === 0) {
            let text = c.textContent.trim().replace(/,/g, '');
            if (text.toUpperCase().endsWith('K')) {
              let num = parseFloat(text);
              if (!isNaN(num)) chipValue = num * 1000;
            } else {
              let num = parseFloat(text);
              if (!isNaN(num)) chipValue = num;
            }
          }
          
          if (chipValue > 0) {
            parsedChips.push({ element: c, val: chipValue, index });
          }
        });

        let amount = parseInt(config.targetAmount, 10);
        let dynamicClicks = [];
        parsedChips.sort((a, b) => b.val - a.val);
        for (let chip of parsedChips) {
          if (amount >= chip.val) {
            let times = Math.floor(amount / chip.val);
            dynamicClicks.push({ chipIndex: chip.index, times });
            amount -= times * chip.val;
          }
        }
        
        if (dynamicClicks.length > 0) {
          config.clicksSequence = dynamicClicks;
        }
      }
      // 1. VERIFY WE HAVE A CLICKS SEQUENCE
      if (!config.clicksSequence || config.clicksSequence.length === 0) {
        return { success: false, reason: "No valid chip clicks calculated for bet amount (dynamic parsing failed)" };
      }

      // Redundant declaration removed

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
      
      // Wait until the scroll animation finishes by monitoring its position
      let lastTop = targetTable.getBoundingClientRect().top;
      let settledCount = 0;
      for (let i = 0; i < 20; i++) { // max 2 seconds timeout
        await new Promise(r => setTimeout(r, 100));
        let currTop = targetTable.getBoundingClientRect().top;
        if (Math.abs(currTop - lastTop) < 1) {
          settledCount++;
          if (settledCount >= 2) break; // Position stable for 200ms
        } else {
          settledCount = 0;
        }
        lastTop = currTop;
      }

      // Additional wait after scroll settles
      await new Promise(resolve => setTimeout(resolve, 500));

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

      function getBalance() {
        try {
          const el = document.querySelector("#balance-zone .block-newline");
          if (el) {
            let clean = el.textContent.trim().replace(/[^0-9.]/g, '');
            let val = parseFloat(clean);
            if (!isNaN(val)) return val;
          }
        } catch(e) {}
        return null;
      }

      let balanceBefore = getBalance();

      // 5. EXECUTE BETS
      for (let clickCmd of config.clicksSequence) {
        const chipEl = chips[clickCmd.chipIndex];
        if (!chipEl) {
          return { success: false, reason: `Chip index ${clickCmd.chipIndex} out of bounds` };
        }
        const delayMs = config.betPlacementDelayMs || 150;
        
        // Select this chip only if it's not already visibly active
        if (!chipEl.classList.contains("active") && !chipEl.classList.contains("selected") && !chipEl.classList.contains("current")) {
           chipEl.click();
           await new Promise(resolve => setTimeout(resolve, delayMs));
        }

        // Click target area 'times' times
        for (let t = 0; t < clickCmd.times; t++) {
          targetBetArea.click();
          await new Promise(resolve => setTimeout(resolve, delayMs)); 
        }
      }

      // 6. VERIFY
      let betConfirmed = false;
      let betAmount = null;

      for (let i = 0; i < 20; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        const chip = targetBetArea.querySelector(".bettingChip.placed");
        if (chip) {
          betConfirmed = true;
          // Wait an extra 300ms to allow animations or rapid updates to settle
          await new Promise(resolve => setTimeout(resolve, 300));
          
          let sum = 0;
          const placedChips = targetBetArea.querySelectorAll('.bettingChip.placed');
          
          for (let c of placedChips) {
            let chipValue = 0;
            const img = c.querySelector('img.chipVal') || c.querySelector('img');
            
            if (img && img.src) {
              const match = img.src.match(/chip\/([a-zA-Z0-9.]+)\.svg/);
              if (match) {
                let valStr = match[1].toUpperCase();
                let val = parseFloat(valStr);
                if (valStr.endsWith('K')) val *= 1000;
                
                if (!isNaN(val) && val > 0) chipValue = val;
              }
            }
            
            if (chipValue === 0) {
              let text = c.textContent.trim().replace(/,/g, '');
              if (text.toUpperCase().endsWith('K')) {
                let num = parseFloat(text);
                if (!isNaN(num)) chipValue = num * 1000;
              } else {
                let num = parseFloat(text);
                if (!isNaN(num)) chipValue = num;
              }
            }
            
            sum += chipValue;
          }
          
          betAmount = sum > 0 ? sum.toString() : "";
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
