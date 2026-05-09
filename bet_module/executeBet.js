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

        // Optimize chip strategy: minimize total operations (selections + clicks)
        // Try greedy largest-first, but also evaluate fewest-operations approach
        parsedChips.sort((a, b) => b.val - a.val);
        
        let dynamicClicks = [];
        let remaining = amount;
        for (let chip of parsedChips) {
          if (remaining >= chip.val) {
            let times = Math.floor(remaining / chip.val);
            dynamicClicks.push({ chipIndex: chip.index, times });
            remaining -= times * chip.val;
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

      // Helper: check if "no more bets" is active on a table
      function isNoMoreBets(table) {
        const el = table.querySelector("#noMoreBet");
        if (!el) return false;
        if (el.classList.contains("hidden")) return false;
        if (el.style.display === "none") return false;
        // Also check computed visibility/opacity
        const style = window.getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") return false;
        return true;
      }

      // Helper: read countdown timer from a table container
      function getTimer(table) {
        try {
          const timerDiv = table.querySelector('div.absolute.top-\\[20\\%\\].left-\\[0\\%\\]');
          if (timerDiv) {
            const txt = (timerDiv.innerText || timerDiv.textContent || '').trim();
            if (/^\d+$/.test(txt)) return parseInt(txt, 10);
          }
        } catch(e) {}
        return null;
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

      // Brief wait after scroll settles for DOM to update
      await new Promise(resolve => setTimeout(resolve, 200));

      // 3. CHECK NO MORE BETS
      if (isNoMoreBets(targetTable)) {
        return { success: false, reason: "No more bets accepted", timer: getTimer(targetTable) };
      }

      // 4. FIND BET AREA (with retry - DOM may still be updating after scroll)
      const betTypeMap = {
        "PlayerBet": "Player",
        "BankerBet": "Banker",
        "TieBet": "Tie",
        "Player": "Player",
        "Banker": "Banker",
        "Tie": "Tie",
      };
      const domLabel = betTypeMap[config.betType] || config.betType;

      function findBetArea() {
        const betAreas = targetTable.querySelectorAll(".clickActive");
        for (let area of betAreas) {
          const areaText = (area.innerText || area.textContent || "").replace(/\s+/g, " ").trim();
          // Exact match OR starts with label followed by a number (odds like 1:1)
          // This prevents "Player" from accidentally matching "Player Pair 11:1"
          const regex = new RegExp(`^${domLabel}(\\s+\\d.*)?$`, 'i');
          if (regex.test(areaText)) {
            return area;
          }
        }
        return null;
      }

      let targetBetArea = null;
      // Retry up to 3 times with 300ms gaps if bet area isn't found immediately
      for (let attempt = 0; attempt < 3; attempt++) {
        targetBetArea = findBetArea();
        if (targetBetArea) break;
        if (attempt < 2) {
          await new Promise(r => setTimeout(r, 300));
        }
      }
      if (!targetBetArea) return { success: false, reason: `Bet area not found (looking for "${domLabel}" from betType "${config.betType}")`, timer: getTimer(targetTable) };

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

      // 4.5 PRE-FLIGHT BALANCE CHECK
      if (balanceBefore != null && config.targetAmount && config.targetAmount !== "ALL_IN") {
        let requiredAmount = parseInt(config.targetAmount, 10);
        if (!isNaN(requiredAmount) && balanceBefore < requiredAmount) {
          return { success: false, reason: `Insufficient balance (have ${balanceBefore}, need ${requiredAmount})`, balance: String(balanceBefore), timer: getTimer(targetTable) };
        }
      }

      // 5. EXECUTE BETS
      const areaClickDelay = config.betPlacementDelayMs || 150;

      // Helper: check if a chip element is the currently selected one
      function isChipActive(el) {
        if (!el) return false;
        // Check common class names the platform may use
        if (el.classList.contains("active") || el.classList.contains("selected") || el.classList.contains("current")) return true;
        // Also check for visual indicators like a highlight border or scale transform
        const style = window.getComputedStyle(el);
        if (style.transform && style.transform !== 'none' && style.transform.includes('scale')) return true;
        return false;
      }

      for (let clickCmd of config.clicksSequence) {
        // Re-query chips fresh each iteration to avoid stale DOM references
        const freshChips = document.querySelectorAll(config.chipSelector);
        const chipEl = freshChips[clickCmd.chipIndex];
        if (!chipEl) {
          return { success: false, reason: `Chip index ${clickCmd.chipIndex} out of bounds (found ${freshChips.length} chips)` };
        }
        
        // Bail early if no more bets appeared mid-execution
        if (isNoMoreBets(targetTable)) {
          break;
        }

        // ALWAYS click the chip to ensure it's selected — the "skip if active"
        // optimization was causing wrong-chip bets when the class state was stale
        chipEl.click();

        // Wait and VERIFY the chip is now active before proceeding
        let chipConfirmed = false;
        for (let poll = 0; poll < 10; poll++) {
          await new Promise(resolve => setTimeout(resolve, 50));
          // Re-query to get the freshest state
          const latestChips = document.querySelectorAll(config.chipSelector);
          if (latestChips[clickCmd.chipIndex] && isChipActive(latestChips[clickCmd.chipIndex])) {
            chipConfirmed = true;
            break;
          }
        }
        // If we couldn't confirm, add a longer safety delay
        if (!chipConfirmed) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }

        // Re-query bet area fresh — placing a chip can cause the platform to
        // re-render the bet area DOM, detaching the original reference.
        // Clicking a detached node is silently ignored by the browser.
        const currentBetArea = findBetArea();
        if (!currentBetArea) {
          return { success: false, reason: `Bet area lost after chip selection (DOM re-rendered)`, timer: getTimer(targetTable) };
        }

        // Click target area 'times' times
        for (let t = 0; t < clickCmd.times; t++) {
          // Bail early if no more bets appeared between clicks
          if (isNoMoreBets(targetTable)) {
            break;
          }
          currentBetArea.click();
          if (t < clickCmd.times - 1) {
            // Delay between repeated clicks of same chip (not after the last one)
            await new Promise(resolve => setTimeout(resolve, areaClickDelay));
          }
        }

        // Small settle between chip commands to let the DOM update after placement
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Small settle after all clicks before verification
      await new Promise(resolve => setTimeout(resolve, 200));

      // 6. VERIFY
      let betConfirmed = false;
      let betAmount = null;

      for (let i = 0; i < 25; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        const chip = targetBetArea.querySelector(".bettingChip.placed");
        if (chip) {
          betConfirmed = true;
          // Wait for animations/rapid DOM updates to settle
          await new Promise(resolve => setTimeout(resolve, 200));
          
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
        return { success: false, reason: "Betting chip not placed visually", balance: currentBalance, timer: getTimer(targetTable) };
      }

      return { success: true, betAmount: betAmount, balance: currentBalance, timer: getTimer(targetTable) };
    }, betConfig);
  } catch (err) {
    console.error(`[Bet Module] Puppeteer evaluate error:`, err.message);
    return { success: false, reason: `Evaluate error: ${err.message}` };
  }
}

module.exports = { executeBetInBrowser };
