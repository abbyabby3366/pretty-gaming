(async function () {
  console.clear();
  console.log("📡 Querying Pretty Gaming live lobby details...");

  const API_BASE = "https://member-api.aghippo168.com";

  // Initialize global state cache in memory
  window.__tableStatesCache = window.__tableStatesCache || {};

  const stateMap = {
    "CountDown": "⏳ Waiting for Bets",
    "showResult": "🃏 Dealing Cards",
    "PayOut": "🏆 Results Outcome",
    "Shuffle": "🔄 Shuffling Deck"
  };

  // --- 1. SESSION TOKEN EXTRACTOR ---
  function getAuthToken() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const val = localStorage.getItem(key);
      if (key.toLowerCase().includes('token') && val) {
        return val.replace(/^Bearer\s+/i, '');
      }
      if (val && val.startsWith('eyJ') && val.split('.').length === 3) {
        return val;
      }
    }
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      const val = sessionStorage.getItem(key);
      if (key.toLowerCase().includes('token') && val) {
        return val.replace(/^Bearer\s+/i, '');
      }
      if (val && val.startsWith('eyJ') && val.split('.').length === 3) {
        return val;
      }
    }
    const cookieMatch = document.cookie.match(/token=([^;]+)/i);
    if (cookieMatch) return decodeURIComponent(cookieMatch[1]);
    return null;
  }

  function getHeaders() {
    const token = getAuthToken();
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["authorization"] = token;
    }
    return headers;
  }

  // --- 2. DEEP PINIA STATE SCANNER ---
  function getLivePiniaSockets() {
    try {
      let pinia = window.$nuxt?.$pinia || window.$pinia;
      if (!pinia) {
        const el = document.querySelector('#__nuxt') || document.querySelector('#app') || document.body;
        pinia = el?.__vue_app__?.$pinia || el?.__vue_app__?.config?.globalProperties?.$pinia;
      }
      if (!pinia && window.$pinia) {
        pinia = window.$pinia;
      }

      if (pinia && pinia.state && pinia.state.value) {
        for (const storeKey of Object.keys(pinia.state.value)) {
          if (storeKey.toLowerCase().includes('baccarat')) {
            const storeState = pinia.state.value[storeKey];
            if (storeState) {
              const sockets = storeState.bacSocket || storeState.sockets;
              if (sockets) return sockets;
            }
          }
        }
      }
    } catch (e) {}
    return null;
  }

  // --- 3. DEDICATED TABLE DIRECTORY LISTER ---
  window.listTables = async function () {
    try {
      const bacRes = await fetch(`${API_BASE}/apiRoute/table/getAllBac`, { headers: getHeaders() }).then(r => r.json());
      if (bacRes.code !== 0 || !Array.isArray(bacRes.data)) {
        throw new Error("Lobby REST endpoint returned invalid data.");
      }

      const piniaSockets = getLivePiniaSockets() || {};
      const tableDirectory = [];
      const activeTablesOnly = bacRes.data.filter(t => t.isActive === true);

      activeTablesOnly.forEach(t => {
        const name = t.tableNumber || t.name || `Baccarat ${t.roomId.replace("BAC-", "")}`;
        
        const wsCache = window.__tableStatesCache[t.roomId];
        const piniaState = piniaSockets[t.roomId];

        const activeState = wsCache?.status || piniaState?.status || t.status || "Unknown";
        const gameId = wsCache?.gameId || piniaState?.gameId || t.gameId || "N/A";
        const timer = wsCache?.timeLeft !== undefined ? `${wsCache.timeLeft}s` : (piniaState?.timeLeft !== undefined ? `${piniaState.timeLeft}s` : "N/A");

        // SEGREGATE RESULTS & CARDS DISPLAY BY ACTIVE STATE
        let winnerOutcome = "N/A";

        if (activeState === "PayOut") {
          // Only show outcome and final cards during the Payout/Settlement phase
          const result = wsCache?.result || piniaState?.result;
          if (result && result.rsBc) {
            const rs = result.rsBc;
            const pCards = [rs.player_1, rs.player_2, rs.player_3].filter(c => c && c !== "null" && c !== "Red");
            const bCards = [rs.banker_1, rs.banker_2, rs.banker_3].filter(c => c && c !== "null" && c !== "Red");
            const pPoints = rs.player123;
            const bPoints = rs.banker123;
            
            if (pPoints !== undefined && bPoints !== undefined) {
              const pCardStr = pCards.join(",");
              const bCardStr = bCards.join(",");
              if (pPoints > bPoints) {
                winnerOutcome = `🔵 Player (${pPoints} vs ${bPoints}) [${pCardStr} vs ${bCardStr}]`;
              } else if (pPoints < bPoints) {
                winnerOutcome = `🔴 Banker (${bPoints} vs ${pPoints}) [${pCardStr} vs ${bCardStr}]`;
              } else {
                winnerOutcome = `🟢 Tie (${pPoints} - ${bPoints}) [${pCardStr} vs ${bCardStr}]`;
              }
            }
          } else {
            winnerOutcome = "⏳ Calculating...";
          }
        } else if (activeState === "showResult") {
          // Active card dealing state
          winnerOutcome = "⏳ Dealing Cards...";
        } else if (activeState === "CountDown") {
          // Betting open state
          winnerOutcome = "⏳ Betting Open";
        } else if (activeState === "Shuffle") {
          // Card shuffle state
          winnerOutcome = "🔄 Shuffling...";
        }

        tableDirectory.push({
          "Name / Number": name,
          "Betting Room ID": t.roomId,
          "Game ID": gameId,
          "Current State": stateMap[activeState] || activeState || "Unknown",
          "Timer Left": timer,
          "Outcome / Winner": winnerOutcome,
          "Allowed Bet Spots": "player, banker, tie, playerPair, bankerPair, small, big, playerNatural, bankerNatural, super6"
        });
      });

      console.clear();
      console.log("\n📋 === PRETTY GAMING LIVE BACCARAT TABLE DIRECTORY ===");
      console.table(tableDirectory);
      console.log(`📡 [WS MONITOR] Tracking ${Object.keys(window.__tableStatesCache).length} active table sockets live.\n`);
      return tableDirectory;
    } catch (err) {
      console.error("❌ Failed to compile table directory:", err.message);
    }
  };

  // --- 4. REAL-TIME WEBSOCKET INTERCEPTOR ---
  if (!WebSocket.prototype.send.isHooked) {
    const originalWsSend = WebSocket.prototype.send;
    WebSocket.prototype.send = function (data) {
      if (!this._hooked) {
        this._hooked = true;
        this.addEventListener('message', function (event) {
          try {
            let rawData = event.data;
            if (event.data instanceof ArrayBuffer || ArrayBuffer.isView(event.data)) {
              rawData = new TextDecoder().decode(event.data);
            }
            const packet = JSON.parse(rawData);

            // Capture real-time updates and cache them
            if (packet && packet.roomId && packet.status) {
              window.__tableStatesCache[packet.roomId] = {
                roomId: packet.roomId,
                gameId: packet.gameId,
                status: packet.status,
                timeLeft: packet.timeLeft,
                result: packet.result // Cache the results/cards payload
              };
            }
          } catch (e) {
            // Ignore binary/heartbeats/non-JSON data
          }
        });
        console.log("🔌 Live WebSocket State Hook Registered!");
      }
      return originalWsSend.apply(this, arguments);
    };
    WebSocket.prototype.send.isHooked = true;
  }

  // Immediate invocation on paste to print directory
  await window.listTables();
})();
