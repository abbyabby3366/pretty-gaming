// ================= CONFIGURATION =================
// Set to "ALL" to watch all tables, or a specific visual name like "Prettyonsexy01"
// const WATCHED_TABLE = "PrettyMG05";
const WATCHED_TABLE = "PrettyXPG93";
// const WATCHED_TABLE = "ALL";
// =================================================

(async function () {
  console.clear();
  console.log("📊 [TABLE TRACKER] Initializing...");

  const API_BASE = "https://member-api.aghippo168.com";

  // Global cache registries
  window.__roomToNameMap = window.__roomToNameMap || {};
  window.__tableStatesHistoryCache = window.__tableStatesHistoryCache || {};
  window.__activeRooms = window.__activeRooms || new Set();

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

  // Helper to construct headers
  function getHeaders() {
    const token = getAuthToken();
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["authorization"] = token;
    }
    return headers;
  }

  // --- BEAD ROAD INTEGRATION ---
  const outcomeMap = {
    "b": { label: "Banker Win", emoji: "🔴" },
    "bb": { label: "Banker Win + Banker Pair", emoji: "🔴" },
    "bp": { label: "Banker Win + Player Pair", emoji: "🔴" },
    "bpb": { label: "Banker Win + Both Pairs", emoji: "🔴" },
    "p": { label: "Player Win", emoji: "🔵" },
    "pb": { label: "Player Win + Banker Pair", emoji: "🔵" },
    "pp": { label: "Player Win + Player Pair", emoji: "🔵" },
    "t": { label: "Tie Win", emoji: "🟢" },
    "tb": { label: "Tie Win + Banker Pair", emoji: "🟢" },
    "tp": { label: "Tie Win + Player Pair", emoji: "🟢" },
    "n": { label: "Empty", emoji: "⚪" }
  };

  function getDetailedLabel(code) {
    const details = outcomeMap[code] || { label: `Unknown (${code})`, emoji: "❓" };
    let tags = [];
    if (code.includes('pp') || code.includes('bp') || (code.startsWith('p') && code.endsWith('p') && code.length > 1) || code === 'tp') {
      tags.push("Player Pair");
    }
    if (code.includes('bb') || code.includes('pb') || (code.startsWith('b') && code.endsWith('b') && code.length > 1) || code === 'tb') {
      tags.push("Banker Pair");
    }
    if (code === 'bpb') {
      tags = ["Player Pair", "Banker Pair"];
    }

    if (tags.length > 0) {
      return `${details.label} (${tags.join(" + ")})`;
    }
    return details.label;
  }

  async function fetchAndLogBeadRoad(roomId, displayName) {
    try {
      const url = `${API_BASE}/apiRoute/table/getStatResult/${roomId}`;
      const res = await fetch(url, { headers: getHeaders() }).then(r => r.json());

      if (res.code === 0 && res.data && Array.isArray(res.data.statistics)) {
        const statistics = res.data.statistics;
        const lineOutput = statistics.map(code => {
          const info = outcomeMap[code] || { emoji: "❓" };
          return info.emoji;
        }).join(" ");

        console.log(
          `  %c📊 BEAD ROAD %c ${lineOutput}`,
          "color: #ffaa00; font-weight: bold;",
          "color: inherit;"
        );
        console.log(
          `  %c📊 STATS     %c🔵 Player: ${statistics.filter(c => c.startsWith('p')).length} | 🔴 Banker: ${statistics.filter(c => c.startsWith('b')).length} | 🟢 Tie: ${statistics.filter(c => c.startsWith('t')).length}`,
          "color: #58a6ff; font-weight: bold;",
          "color: #8b949e; font-size: 11px;"
        );
      }
    } catch (err) {
      console.warn("⚠️ Failed to fetch bead road for table transition:", err.message);
    }
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
    } catch (e) { }
    return null;
  }

  // Helper to fetch live table statistics length from Baccarat active stores
  function getRoundCount(roomId, packet) {
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
              // Retrieve Baccarat table round history array length
              if (Array.isArray(storeState.bacTable)) {
                const tbl = storeState.bacTable.find(t => t.roomId === roomId);
                if (tbl && tbl.statistics) {
                  return tbl.statistics.length;
                }
              }
              // Retrieve Dragon Tiger table round history array length
              if (Array.isArray(storeState.dtTable)) {
                const tbl = storeState.dtTable.find(t => t.roomId === roomId);
                if (tbl && tbl.statistics) {
                  return tbl.statistics.length;
                }
              }
            }
          }
        }
      }
    } catch (e) { }

    // Fallback: check packet data statistics
    if (packet) {
      const stats = packet.statistics || [];
      if (stats.length) return stats.length;
    }
    return 0;
  }

  // --- 3. LOBBY MAPPING ENGINE ---
  async function loadLobbyMapping() {
    try {
      const bacRes = await fetch(`${API_BASE}/apiRoute/table/getAllBac`, { headers: getHeaders() }).then(r => r.json());
      if (bacRes.code === 0 && Array.isArray(bacRes.data)) {
        window.__activeRooms.clear();
        bacRes.data.forEach(t => {
          // Pre-map visual names
          window.__roomToNameMap[t.roomId] = t.tableNumber || t.name || `Baccarat ${t.roomId.replace("BAC-", "")}`;
          // Track only if active (isActive === true) just like list-tables.js
          if (t.isActive === true) {
            window.__activeRooms.add(t.roomId);
          }
        });
        console.log(`🗺️  Lobby Name Map populated (${Object.keys(window.__roomToNameMap).length} rooms mapped, ${window.__activeRooms.size} active tables monitored)`);
      }
    } catch (err) {
      console.warn("⚠️  Could not preload lobby visual mapping. Map will build dynamically.", err.message);
    }
  }

  await loadLobbyMapping();

  // --- 4. ROBUST PACKET EXTRACTOR (FALLBACK FOR RAW WS) ---
  function extractPacketData(rawData) {
    // A. Direct JSON Parser
    try {
      const parsed = JSON.parse(rawData);
      if (parsed) {
        if (parsed.roomId && parsed.status) {
          return parsed;
        }
        if (parsed.method && parsed.data && parsed.data.roomId && parsed.data.status) {
          return parsed.data;
        }
      }
    } catch (e) { }

    // B. Socket.IO Event Array Frame Parser (e.g. 42["event", {...}])
    if (typeof rawData === "string" && rawData.startsWith("42[")) {
      try {
        const parsedArray = JSON.parse(rawData.slice(2));
        if (Array.isArray(parsedArray) && parsedArray.length >= 2) {
          const inner = parsedArray[1];
          if (inner) {
            if (inner.roomId && inner.status) {
              return inner;
            }
            if (inner.method && inner.data && inner.data.roomId && inner.data.status) {
              return inner.data;
            }
          }
        }
      } catch (e) { }
    }

    return null;
  }

  // --- 5. LOGGING CONTROLLER ---
  function handleTableStatePacket(packet, source) {
    const roomId = packet.roomId;
    const newStatus = packet.status;

    // Only track active tables mapped from list-tables.js
    if (!window.__activeRooms.has(roomId)) {
      return;
    }

    // Dynamically capture mapping if room ID was not pre-mapped
    if (!window.__roomToNameMap[roomId]) {
      window.__roomToNameMap[roomId] = `Baccarat ${roomId.replace("BAC-", "")}`;
    }
    const displayName = window.__roomToNameMap[roomId];

    // Filtering: skip logging if configured for a specific table that doesn't match
    if (WATCHED_TABLE !== "ALL" && displayName !== WATCHED_TABLE) {
      return;
    }

    const prevCache = window.__tableStatesHistoryCache[roomId];
    const prevStatus = prevCache?.status || "Unknown";
    const prevGameId = prevCache?.gameId;
    const prevRound = prevCache?.roundCount || 0;

    // Check if state transition occurred
    if (newStatus !== prevStatus) {
      const piniaSockets = getLivePiniaSockets() || {};
      const piniaState = piniaSockets[roomId];

      const gameId = packet.gameId || piniaState?.gameId || "N/A";
      const timer = packet.timeLeft !== undefined ? `${packet.timeLeft}s` : (piniaState?.timeLeft !== undefined ? `${piniaState.timeLeft}s` : "N/A");

      // Dynamic Round Counter driven by Game ID changes
      let roundCount = prevRound;
      const baseStoreCount = getRoundCount(roomId, packet);

      if (!roundCount || !prevGameId) {
        // Initialize on first run
        if (newStatus === "Shuffle") {
          roundCount = baseStoreCount;
        } else {
          roundCount = baseStoreCount + 1;
        }
      } else if (gameId !== "N/A" && gameId !== prevGameId) {
        // Increment round count when Game ID changes (new round starts)
        roundCount = prevRound + 1;
      }

      // Header styling selection
      const labelPrev = stateMap[prevStatus] || prevStatus;
      const labelNew = stateMap[newStatus] || newStatus;

      console.log(
        `\n%c ⚡ TRANSITION %c ${displayName} %c State changed from [ ${labelPrev} ] to ➡️ [ ${labelNew} ] %c via ${source} `,
        "background: #1e1e1e; color: #00ff00; padding: 2px 6px; border-radius: 4px 0 0 4px; font-weight: bold;",
        "background: #2b2b2b; color: #ffffff; padding: 2px 6px; font-weight: bold; border-left: 2px solid #00ff00;",
        "background: #1e1e1e; color: #a9b7c6; padding: 2px 6px;",
        "background: #ff7b72; color: #ffffff; padding: 2px 6px; border-radius: 0 4px 4px 0; font-weight: bold; font-size: 10px;"
      );

      console.log(
        `  ├ 🏷️  Game ID: %c${gameId}%c\n` +
        `  ├ ⏱️  Timer: %c${timer}%c\n` +
        `  └ 📊 Shoe Round: %c#${roundCount}%c`,
        "color: #58a6ff; font-weight: bold;", "color: inherit;",
        "color: #ffaa00; font-weight: bold;", "color: inherit;",
        "color: #6ec06e; font-weight: bold;", "color: inherit;"
      );

      // Fetch and print Bead Road sequence when entering "Waiting for Bets" (CountDown) state
      if (newStatus === "CountDown") {
        fetchAndLogBeadRoad(roomId, displayName);
      }

      // Detailed payout logs including winning points, winner outcome, and exact card sequences
      if (newStatus === "PayOut") {
        const result = packet.result || piniaState?.result;
        const stats = packet.statistics || piniaState?.statistics || [];

        if (result && result.rsBc) {
          const rs = result.rsBc;
          const pCards = [rs.player_1, rs.player_2, rs.player_3].filter(c => c && c !== "null" && c !== "Red");
          const bCards = [rs.banker_1, rs.banker_2, rs.banker_3].filter(c => c && c !== "null" && c !== "Red");
          const pPoints = rs.player123;
          const bPoints = rs.banker123;

          let outcomeText = "Awaiting Server Statistics...";
          let outcomeColor = "color: #909399; font-weight: bold;";
          const pCardStr = pCards.join(",");
          const bCardStr = bCards.join(",");

          if (pPoints !== undefined && bPoints !== undefined) {
            if (pPoints > bPoints) {
              outcomeText = `🔵 Player (${pPoints} vs ${bPoints}) [${pCardStr} vs ${bCardStr}]`;
              outcomeColor = "color: #58a6ff; font-weight: bold;";
            } else if (pPoints < bPoints) {
              outcomeText = `🔴 Banker (${bPoints} vs ${pPoints}) [${pCardStr} vs ${bCardStr}]`;
              outcomeColor = "color: #ff7b72; font-weight: bold;";
            } else {
              outcomeText = `🟢 Tie (${pPoints} - ${bPoints}) [${pCardStr} vs ${bCardStr}]`;
              outcomeColor = "color: #7ee787; font-weight: bold;";
            }
          }

          function mapServerCodeToWinner(code) {
            if (!code) return null;
            const c = code.toLowerCase();
            if (c.startsWith('p')) return 'Player';
            if (c.startsWith('b')) return 'Banker';
            if (c.startsWith('t')) return 'Tie';
            return null;
          }

          if (stats && stats.length >= roundCount) {
            const serverCode = stats[roundCount - 1];
            const winner = mapServerCodeToWinner(serverCode);

            if (winner === "Player") {
              outcomeText = `🔵 Player (${pPoints} vs ${bPoints}) [${pCardStr} vs ${bCardStr}] (Server Code: ${serverCode})`;
              outcomeColor = "color: #58a6ff; font-weight: bold;";
            } else if (winner === "Banker") {
              outcomeText = `🔴 Banker (${bPoints} vs ${pPoints}) [${pCardStr} vs ${bCardStr}] (Server Code: ${serverCode})`;
              outcomeColor = "color: #ff7b72; font-weight: bold;";
            } else if (winner === "Tie") {
              outcomeText = `🟢 Tie (${pPoints} - ${bPoints}) [${pCardStr} vs ${bCardStr}] (Server Code: ${serverCode})`;
              outcomeColor = "color: #7ee787; font-weight: bold;";
            }
          }

          console.log(
            `  🏆 %c[ROUND RESULTS]%c ${outcomeText}`,
            "color: #ff9800; font-weight: bold;", outcomeColor
          );
        }
      }

      // Shuffling announcement and total elapsed rounds played before shuffling
      if (newStatus === "Shuffle") {
        console.log(
          `  🔄 %c[SHUFFLE DETECTED] Table "${displayName}" is now reshuffling the shoe!%c\n` +
          `  └ 📊 Total rounds played in the previous shoe: %c${roundCount}%c`,
          "color: #e040fb; font-weight: bold; font-size: 13px;", "",
          "color: #ffaa00; font-weight: bold;", ""
        );
      }

      // Update history cache
      window.__tableStatesHistoryCache[roomId] = {
        status: newStatus,
        gameId: gameId,
        roundCount: roundCount
      };
    }
  }

  // --- 6. PINIA STORE DIRECT STATE INTERCEPTOR ---
  function hookPiniaStores() {
    try {
      let pinia = window.$nuxt?.$pinia || window.$pinia;
      if (!pinia) {
        const el = document.querySelector('#__nuxt') || document.querySelector('#app') || document.body;
        pinia = el?.__vue_app__?.$pinia || el?.__vue_app__?.config?.globalProperties?.$pinia;
      }
      if (!pinia && window.$pinia) {
        pinia = window.$pinia;
      }

      if (pinia && pinia._s) {
        // pinia._s can be a Map or a plain Object cache of active store instances
        const storeKeys = pinia._s.keys ? Array.from(pinia._s.keys()) : Object.keys(pinia._s);

        for (const key of storeKeys) {
          if (key.toLowerCase().includes('baccarat')) {
            const store = pinia._s.get ? pinia._s.get(key) : pinia._s[key];
            if (store && store.setSocket && !store.setSocket.isTableTrackerHooked) {
              const originalSetSocket = store.setSocket;
              store.setSocket = function (roomId, packet) {
                try {
                  if (packet && roomId) {
                    if (!packet.roomId) packet.roomId = roomId;
                    handleTableStatePacket(packet, "Pinia Store");
                  }
                } catch (e) { }
                return originalSetSocket.apply(this, arguments);
              };
              store.setSocket.isTableTrackerHooked = true;
              console.log(`🔌 Pinia: Intercepted Baccarat Store "${key}" updates!`);
            }
          }
        }
      }
    } catch (e) {
      console.warn("⚠️ Failed to scan or hook Pinia stores:", e.message);
    }
  }

  // --- 7. SOCKET.IO APPLICATION LAYER INTERCEPTOR ---
  function hookSocketIoInstance(socket) {
    if (!socket || socket._tableTrackerHooked) return;
    socket._tableTrackerHooked = true;

    // Hook onevent to capture fully parsed server events directly bypassing wire transport formats
    const originalOnevent = socket.onevent;
    socket.onevent = function (packet) {
      try {
        const args = packet.data || [];
        const payload = args[1];

        if (payload) {
          let tableData = null;
          if (payload.roomId && payload.status) {
            tableData = payload;
          } else if (payload.method && payload.data && payload.data.roomId && payload.data.status) {
            tableData = payload.data;
          }

          if (tableData) {
            handleTableStatePacket(tableData, "Socket.IO");
          }
        }
      } catch (err) {
        // Safe catch
      }
      return originalOnevent.apply(this, arguments);
    };

    console.log("🔌 Active Socket.IO instance hooked successfully!");
  }

  // --- 8. RAW WEBSOCKET WIRE-LEVEL FALLBACK (WITH BLOB SUPPORT) ---
  function hookWebSocketInstance(ws) {
    if (!ws || ws._wsTableTrackerHooked) return;
    ws._wsTableTrackerHooked = true;

    ws.addEventListener('message', async function (event) {
      try {
        let rawData = event.data;
        if (event.data instanceof Blob) {
          rawData = await event.data.text();
        } else if (event.data instanceof ArrayBuffer || ArrayBuffer.isView(event.data)) {
          rawData = new TextDecoder().decode(event.data);
        }

        const packet = extractPacketData(rawData);
        if (packet && packet.roomId && packet.status) {
          handleTableStatePacket(packet, "WebSocket");
        }
      } catch (err) {
        // Ignore parsing errors
      }
    });

    console.log("🔌 Active low-level WebSocket connection hooked!");
  }

  // --- 9. AUTOMATIC CONNECTION SCANNER ---
  function scanAndHookExistingSockets() {
    try {
      if (window.io && window.io.managers) {
        const managers = window.io.managers;
        let count = 0;
        for (const url of Object.keys(managers)) {
          const mgr = managers[url];
          if (mgr && mgr.nsps) {
            for (const nspName of Object.keys(mgr.nsps)) {
              const socket = mgr.nsps[nspName];
              if (socket) {
                hookSocketIoInstance(socket);
                count++;

                // Fallback: Hook underlying WebSocket transport too
                const ws = socket.io && socket.io.engine && socket.io.engine.transport && socket.io.engine.transport.ws;
                if (ws) {
                  hookWebSocketInstance(ws);
                }
              }
            }
          }
        }
        if (count > 0) {
          console.log(`🔌 Socket.IO Scanner: Hooked ${count} active namespace socket(s) instantly!`);
        }
      }
    } catch (err) {
      console.warn("⚠️ Scanning Socket.IO managers failed:", err.message);
    }
  }

  // Run immediate scans
  hookPiniaStores();
  scanAndHookExistingSockets();

  // Periodic polling hooks to ensure resilience during page changes or deferred lazy loads
  const scanInterval = setInterval(() => {
    hookPiniaStores();
    scanAndHookExistingSockets();
  }, 2000);
  setTimeout(() => clearInterval(scanInterval), 16000);

  // --- 10. LOW-LEVEL PROTOTYPE FALLBACK ---
  if (!WebSocket.prototype.send.isTableTrackerHooked) {
    const originalWsSend = WebSocket.prototype.send;
    WebSocket.prototype.send = function (data) {
      hookWebSocketInstance(this);
      return originalWsSend.apply(this, arguments);
    };
    WebSocket.prototype.send.isTableTrackerHooked = true;
    console.log("🔌 Live WebSocket Prototype Send Hook Registered!");
  }

  // --- 11. NEW SOCKET.IO CONSTRUCTOR WRAPPER ---
  if (window.io && !window.io.isTableTrackerHooked) {
    const originalIo = window.io;
    window.io = function (...args) {
      const socket = originalIo.apply(this, args);
      if (socket) {
        hookSocketIoInstance(socket);

        try {
          if (socket.io) {
            socket.io.on("open", () => {
              const transport = socket.io.engine && socket.io.engine.transport;
              if (transport && transport.ws) {
                hookWebSocketInstance(transport.ws);
              }
            });
          }
        } catch (e) { }
      }
      return socket;
    };
    window.io.isTableTrackerHooked = true;
    Object.assign(window.io, originalIo);
    console.log("🔌 window.io Hook Registered!");
  }

  console.log(`📊 [TABLE TRACKER RUNNING] Currently watching: %c${WATCHED_TABLE}%c`, "color: #00ff00; font-weight: bold;", "");
})();
