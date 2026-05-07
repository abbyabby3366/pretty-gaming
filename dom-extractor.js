// Paste this entire block into your Chrome/Browser Console

(function extractBaccaratLobby() {
  const lobbyContent = document.querySelector(".lobby-content");

  if (!lobbyContent) {
    console.error("Could not find the .lobby-content element.");
    return;
  }

  let activeCategory = "Good Road";
  const baccaratCategories = [
    "Good Road",
    "Baccarat",
    "Dragon Tiger",
    "Sic Bo",
    "Thai-HiLo",
    "Roulette",
    "Xoc Dia",
  ];

  let outputTxt = `%c=== LIVE BACCARAT TABLES COMPACT VIEW ===\n\n`;
  let styles = ["color: #4CAF50; font-weight: bold; font-size: 14px;"];
  let baccaratCounter = 1;
  let tablesProcessed = 0;

  Array.from(lobbyContent.children).forEach((block) => {
    const headingEl = block.querySelector(".font24-20");
    if (headingEl) {
      const headingText = (
        headingEl.innerText ||
        headingEl.textContent ||
        ""
      ).trim();
      if (baccaratCategories.includes(headingText)) {
        activeCategory = headingText;
      }
    }

    if (activeCategory === "Baccarat") {
      const tableAnchors = block.querySelectorAll(
        'img[src="/hall/table/online.svg"]',
      );

      Array.from(tableAnchors).forEach((el) => {
        let container = el.parentElement;
        while (container && container.parentElement) {
          const onlineIcons = container.parentElement.querySelectorAll(
            'img[src="/hall/table/online.svg"]',
          );
          if (
            onlineIcons.length === 1 &&
            container.parentElement.tagName !== "BODY"
          ) {
            container = container.parentElement;
          } else {
            break;
          }
        }

        if (!container) return;

        const textContent = container.innerText || container.textContent || "";

        const noMoreBetEl = container.querySelector("#noMoreBet");
        const hasNoMoreBet =
          noMoreBetEl &&
          !noMoreBetEl.classList.contains("hidden") &&
          noMoreBetEl.style.display !== "none";

        const isShuffling =
          textContent.includes("Shuffling") ||
          container.querySelector('img[src*="shuffle"]') !== null;

        let winnerText = "";
        const allLeafElements = Array.from(
          container.querySelectorAll("*"),
        ).filter((node) => node.children.length === 0);
        for (let winEl of allLeafElements) {
          const txt = (winEl.innerText || winEl.textContent || "").trim();
          if (txt.includes("Win") || txt === "Tie") {
            if (!winEl.closest(".clickActive") && !winEl.closest(".hidden")) {
              winnerText = txt;
              break;
            }
          }
        }

        // Cards layout
        const playerCards = [];
        const bankerCards = [];
        const cards = [];

        const showResultEl = container.querySelector("#showResult");
        if (showResultEl && showResultEl.children.length >= 3) {
          const playerContainer = showResultEl.children[0];
          const bankerContainer = showResultEl.children[2];

          const extractCards = (domNode, targetArr) => {
            if (!domNode) return;
            domNode.querySelectorAll('img[src*="/card/"]').forEach((cardEl) => {
              const isHiddenClass = cardEl.closest(".hidden") !== null;
              const isHiddenNative = cardEl.offsetParent === null;

              if (!isHiddenClass && !isHiddenNative) {
                const src = cardEl.getAttribute("src");
                if (src) {
                  const value = src.replace("/card/2/", "").replace(".png", "");
                  targetArr.push(value);
                  cards.push(value);
                }
              }
            });
          };

          extractCards(playerContainer, playerCards);
          extractCards(bankerContainer, bankerCards);
        } else {
          // Fallback
          container.querySelectorAll('img[src*="/card/"]').forEach((cardEl) => {
            const isHiddenClass = cardEl.closest(".hidden") !== null;
            const isHiddenNative = cardEl.offsetParent === null;

            if (!isHiddenClass && !isHiddenNative) {
              const src = cardEl.getAttribute("src");
              if (src) {
                const value = src.replace("/card/2/", "").replace(".png", "");
                cards.push(value);
              }
            }
          });
        }

        // Timer Lookup
        let timerValue = -1;
        const timerDiv = container.querySelector(
          "div.absolute.top-\\[20\\%\\].left-\\[0\\%\\]",
        );
        if (timerDiv) {
          const tMatch = (
            timerDiv.innerText ||
            timerDiv.textContent ||
            ""
          ).trim();
          if (/^\d+$/.test(tMatch)) {
            timerValue = parseInt(tMatch, 10);
          }
        }

        // Robust State machine logic leveraging Timer
        let state = "Waiting for Bets";
        if (winnerText) {
          state = `Result (${winnerText})`;
        } else if (isShuffling) {
          state = "Shuffling";
        } else if (timerValue === 0) {
          state = "Dealing"; // Timer explicitly hit 0 and is persisting silently on the board
        } else if (timerValue > 0) {
          state = "Waiting for Bets"; // Timer actively counting down
        } else if (hasNoMoreBet) {
          state = "Dealing / No More Bets"; // Catch edge cases where timer text is momentarily absent but banner is up
        } else if (cards.length > 0) {
          state = "Dealing"; // Fallback: If no timer exists visually, but cards are physically on table
        }

        const bets = [];
        container.querySelectorAll(".clickActive").forEach((betEl) => {
          const txt = (betEl.innerText || betEl.textContent || "")
            .trim()
            .replace(/\s+/g, " ");
          if (txt && !txt.includes("Bet Limit") && !betEl.closest(".hidden")) {
            bets.push(txt);
          }
        });

        let tableName = `Table ${baccaratCounter}`;
        const firstDiv = container.querySelector("div");
        const possibleName = firstDiv
          ? (firstDiv.innerText || "").split("\n")[0].trim()
          : "";

        if (
          bets[0] &&
          !bets[0].includes("Banker") &&
          !bets[0].includes("Tie") &&
          !bets[0].includes("Dragon")
        ) {
          tableName = bets[0];
        } else if (
          possibleName &&
          possibleName.length < 20 &&
          !possibleName.includes("Points")
        ) {
          tableName = possibleName;
        }

        const cleanBets = [
          ...new Set(
            bets
              .slice(1)
              .map((b) =>
                b
                  .replace(" 1:11", "")
                  .replace(" 1:1", "")
                  .replace(" 1:8", "")
                  .replace(" 1:0.96", "")
                  .replace(" 1:0.95", ""),
              )
              .filter((b) => b !== "P" && b !== "B"),
          ),
        ];

        // Stats Extraction
        let roundNumber = "-";
        let pWins = "0",
          bWins = "0",
          tWins = "0";

        // We find the flex container with the stats
        const statsContainer = container.querySelector(
          ".flex.gap-\\[8px\\].text-black.items-center",
        );
        if (statsContainer) {
          const blockNewline = statsContainer.querySelector(".block-newline");
          if (blockNewline) {
            roundNumber = (
              blockNewline.innerText ||
              blockNewline.textContent ||
              ""
            )
              .replace("#", "")
              .trim();
          }

          statsContainer.querySelectorAll(".flex").forEach((stat) => {
            const img = stat.querySelector("img");
            if (img) {
              const src = img.getAttribute("src");
              const val = (stat.innerText || stat.textContent || "").trim();
              if (src.includes("/stats/timeline/p.svg")) {
                pWins = val;
              } else if (src.includes("/stats/timeline/b.svg")) {
                bWins = val;
              } else if (src.includes("/stats/timeline/t.svg")) {
                tWins = val;
              }
            }
          });
        }

        // Formatting
        const timerDisplay = timerValue >= 0 ? ` | Timer: ${timerValue}s` : "";
        outputTxt += `%c[Table ${baccaratCounter++}] ${tableName} | State: ${state}${timerDisplay} | Round: ${roundNumber} | Wins: P:${pWins} B:${bWins} T:${tWins}\n`;
        styles.push("color: #00bcd4; font-weight: bold;");

        if (state === "Shuffling" || state.startsWith("Result")) {
          outputTxt += `%c   Bets:  Table is ${state.split(" ")[0]} (Bets Closed)\n`;
        } else if (cleanBets.length > 0) {
          outputTxt += `%c   Bets:  ${cleanBets.join(", ")}\n`;
        } else {
          outputTxt += `%c   Bets:  Standard Baccarat Bets\n`;
        }
        styles.push("color: #a0a0a0;");

        if (playerCards.length > 0 || bankerCards.length > 0) {
          outputTxt += `%c   Cards: Player [${playerCards.join(", ")}] | Banker [${bankerCards.join(", ")}]\n\n`;
        } else if (cards.length > 0) {
          outputTxt += `%c   Cards: ${cards.join(", ")}\n\n`;
        } else {
          outputTxt += `%c   Cards: None\n\n`;
        }
        styles.push("color: #a0a0a0;");

        tablesProcessed++;
      });
    }
  });

  console.log(outputTxt, ...styles);
  console.log(
    `%c[Parser Complete] Extracted exactly ${tablesProcessed} Active Baccarat Tables`,
    "color: #ff9800; font-style: italic;",
  );

  // Return clean string for Node backend
  const cleanOutput = outputTxt.replace(/%c/g, "") + `\n[Parser Complete] Extracted exactly ${tablesProcessed} Active Baccarat Tables\n`;
  return cleanOutput;
})();
