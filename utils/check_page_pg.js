function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkPGpage(page, logger) {
  // 1. Background task to continuously check and dismiss Confirm/Continue
  const dismissInterval = setInterval(async () => {
    if (page.isClosed && page.isClosed()) {
      clearInterval(dismissInterval);
      return;
    }
    try {
      const action = await page.evaluate(() => {
        // 1. Check for Confirm/Continue
        const btns = Array.from(document.querySelectorAll(".clickActive"));
        const confirmBtn = btns.find((el) => el.innerText && (el.innerText.includes("Confirm") || el.innerText.includes("Continue")));
        if (confirmBtn) { 
          confirmBtn.click(); 
          return "confirm"; 
        }
        
        // 2. Check for "All In" chip being active
        const chipZone = document.querySelector(".chip-zone");
        if (chipZone) {
          const chips = Array.from(chipZone.querySelectorAll(".chip"));
          if (chips.length > 1) {
            const firstChip = chips[0];
            const allInImg = firstChip.querySelector('img[src*="10000000.png"]');
            if (allInImg && firstChip.classList.contains("active")) {
              chips[1].click();
              return "all-in-reset";
            }
          }
        }
        
        // 3. Check for Multiplay if inactive
        const multiBtns = Array.from(document.querySelectorAll(".btn-lobby, .clickActive"));
        const multiBtn = multiBtns.find(el => el.innerText && el.innerText.includes("Multiplay")) 
                      || document.querySelector('img[src*="game_multi.svg"]')?.closest('.clickActive');
        
        if (multiBtn && !multiBtn.classList.contains("inactive")) {
          multiBtn.click();
          return "multiplay";
        }
        
        return null;
      });

      if (action === "confirm") {
        logger.log("Clicked 'Confirm/Continue' modal (background).");
      } else if (action === "all-in-reset") {
        logger.log("Reset 'All-in' chip to '10' chip (background).");
      } else if (action === "multiplay") {
        logger.log("Clicked 'Multiplay' button (background).");
      }
    } catch (err) {
      if (err.message && (err.message.includes("Target closed") || err.message.includes("Session closed"))) {
        clearInterval(dismissInterval);
      }
    }
  }, 2500);

  // 2. Initial wait for Confirm/Continue
  try {
    await page.waitForFunction(() => {
      const btns = Array.from(document.querySelectorAll(".clickActive"));
      const confirmBtn = btns.find((el) => el.innerText && (el.innerText.includes("Confirm") || el.innerText.includes("Continue")));
      if (confirmBtn) { confirmBtn.click(); return true; }
      return false;
    }, { timeout: 8000 });
    logger.log("Clicked 'Confirm/Continue' on Welcome modal.");
  } catch (err) {}
  
  // 3. Wait for and click Multiplay
  try {
    await sleep(1000); // Give it a moment after Confirm
    await page.waitForFunction(() => {
      // Find by class and text, or by image src
      const btns = Array.from(document.querySelectorAll(".btn-lobby, .clickActive"));
      const multiBtn = btns.find(el => el.innerText && el.innerText.includes("Multiplay")) 
                    || document.querySelector('img[src*="game_multi.svg"]')?.closest('.clickActive');
      
      if (multiBtn) { multiBtn.click(); return true; }
      return false;
    }, { timeout: 10000 });
    logger.log("Clicked 'Multiplay' button.");
  } catch (err) {
    logger.warn("Could not find 'Multiplay' button within timeout.");
  }

  // User request: wait 15 more seconds after clicking multiplay before marking as ready
  logger.log("Waiting 15 more seconds for tables to fully load...");
  await sleep(15000);
}

module.exports = {
  checkPGpage,
};
