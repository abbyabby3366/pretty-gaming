const { cleanUpDOM } = require("../utils/cleanUpDOM");
const { ensureMultiplayActive } = require("../utils/ensureMultiplayActive");

/**
 * Pure scrape function. Extracts structured table data from the page using the client-side interceptor cache.
 * @param {import('puppeteer').Page} page
 * @param {string} unused_extractorCode - Obsolete, kept for backwards compatibility in argument signature
 * @returns {Promise<{text: string, tables: Array} | null>}
 */
async function scrapePG(page, unused_extractorCode, acctConfig = {}) {
  if (acctConfig.enableDomCleanup) {
    await cleanUpDOM(page);
  }
  await ensureMultiplayActive(page);

  // Prevent hanging indefinitely if the Chromium tab freezes
  const evaluatePromise = page.evaluate(() => {
    const cache = window.__tableStatesCache || {};
    const roomMap = window.__roomToNameMap || {};
    const tableData = [];

    const stateMapping = {
      "CountDown": "Waiting for Bets",
      "showResult": "Dealing",
      "PayOut": "Result",
      "Shuffle": "Shuffling"
    };

    let tableIndex = 1;
    for (const [roomId, entry] of Object.entries(cache)) {
      const name = roomMap[roomId] || roomId;
      
      // Determine standardized state
      let state = stateMapping[entry.status] || entry.status || "Waiting for Bets";
      let winner = null;

      // Check for winner outcome inside PayOut state
      if (entry.status === "PayOut" && entry.result && entry.result.rsBc) {
        const rs = entry.result.rsBc;
        const pPoints = rs.player123;
        const bPoints = rs.banker123;
        if (pPoints !== undefined && bPoints !== undefined) {
          if (pPoints > bPoints) {
            state = "Result (Player Win)";
            winner = "P";
          } else if (pPoints < bPoints) {
            state = "Result (Banker Win)";
            winner = "B";
          } else {
            state = "Result (Tie Win)";
            winner = "T";
          }
        }
      }

      const playerCards = [];
      const bankerCards = [];
      const allCards = [];

      if (entry.result && entry.result.rsBc) {
        const rs = entry.result.rsBc;
        [rs.player_1, rs.player_2, rs.player_3].forEach(c => {
          if (c && c !== "null" && c !== "Red") {
            playerCards.push(c);
            allCards.push(c);
          }
        });
        [rs.banker_1, rs.banker_2, rs.banker_3].forEach(c => {
          if (c && c !== "null" && c !== "Red") {
            bankerCards.push(c);
            allCards.push(c);
          }
        });
      }

      // Compute wins statistics from server statistics history
      const stats = entry.statistics || [];
      const pWins = stats.filter(c => c.startsWith('p')).length;
      const bWins = stats.filter(c => c.startsWith('b')).length;
      const tWins = stats.filter(c => c.startsWith('t')).length;

      // Compute active round number based on current packet status
      let roundNumber = entry.round || stats.length;
      if (!entry.round) {
        if (entry.status === "CountDown" || entry.status === "showResult" || entry.status === "PayOut") {
          roundNumber = stats.length + 1;
        }
      }

      tableData.push({
        tableIndex: tableIndex++,
        tableName: name,
        state: state,
        timer: entry.timeLeft !== undefined ? entry.timeLeft : -1,
        round: roundNumber,
        wins: { P: pWins, B: bWins, T: tWins },
        playerCards: playerCards,
        bankerCards: bankerCards,
        allCards: allCards,
        winner: winner,
        statistics: stats
      });
    }

    // Compile compact readable view log text
    let textLog = `=== LIVE BACCARAT TABLES COMPACT VIEW ===\n\n`;
    tableData.forEach(t => {
      textLog += `[Table ${t.tableIndex}] ${t.tableName} | State: ${t.state} | Timer: ${t.timer}s | Round: ${t.round} | Wins: P:${t.wins.P} B:${t.wins.B} T:${t.wins.T}\n`;
      textLog += `   Bets:  Standard Baccarat Bets\n`;
      textLog += `   Cards: Player [${t.playerCards.join(", ")}] | Banker [${t.bankerCards.join(", ")}]\n\n`;
    });
    
    return JSON.stringify({
      text: textLog + `\n[Parser Complete] Extracted exactly ${tableData.length} Active Baccarat Tables\n`,
      tables: tableData
    });
  });

  const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("page.evaluate timeout")), 15000));
  
  const rawResult = await Promise.race([evaluatePromise, timeoutPromise]);
  if (!rawResult) return null;

  try {
    return JSON.parse(rawResult);
  } catch {
    return { text: rawResult, tables: [] };
  }
}

module.exports = { scrapePG };
