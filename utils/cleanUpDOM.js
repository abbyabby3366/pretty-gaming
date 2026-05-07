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

      // 3. Remove cockroach roadmaps
      const roadmaps = document.querySelectorAll(
        ".roadmap-timeline img, .roadmap-donut img",
      );
      roadmaps.forEach((img) => img.remove());
    });
  } catch (e) {
    // Ignore errors
  }
}

module.exports = { cleanUpDOM };
