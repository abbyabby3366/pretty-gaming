async function cleanUpDOM(page) {
  try {
    await page.evaluate(() => {
      const lobbyContent = document.querySelector("div#bg-layout div.lobby-content");
      if (lobbyContent) {
        lobbyContent.remove();
      }
    });
  } catch (e) {
    // Ignore errors
  }
}

module.exports = { cleanUpDOM };
