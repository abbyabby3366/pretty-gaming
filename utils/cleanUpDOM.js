async function cleanUpDOM(page) {
  try {
    await page.evaluate(() => {
      // 1. Hide promotional banners instead of removing
      const banners = document.querySelectorAll(
        ".snap-mandatory.scroll-smooth.no-scrollbar",
      );
      banners.forEach((b) => {
        if (b.parentElement) {
          b.parentElement.style.display = "none";
        } else {
          b.style.display = "none";
        }
      });

      // 2. Hide non-baccarat tables instead of removing
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
          block.style.display = "none";
        }
      });

      // 3. Hide cockroach roadmaps instead of removing
      const roadmaps = document.querySelectorAll(
        ".roadmap-timeline img, .roadmap-donut img",
      );
      roadmaps.forEach((img) => {
        img.style.display = "none";
      });
    });
  } catch (e) {
    // Ignore errors
  }
}

module.exports = { cleanUpDOM };
