// ================= CONFIGURATION =================
// Edit these values before copying and pasting!
const TARGET_TABLE = "Prettyico116";
const TARGET_POSITION = "player"; // options: "player", "banker", "tie", "playerPair", "bankerPair", etc.
const TARGET_AMOUNT = 10;
// =================================================

(async function () {
  console.clear();
  console.log("🚀 Pretty Gaming Auto-Bet Control Panel Initializing...");

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

  // --- 3. GLOBAL BET PLACER UTILITY ---
  window.placeBet = async function (tableId, position, amount) {
    const formattedPosition = position.toLowerCase();
    const type = "Baccarat";

    console.log(`🎯 [BET INITIATED] Searching for table: "${tableId}"...`);

    try {
      const tableData = await fetch(`${API_BASE}/apiRoute/table/getAllBac`, { headers: getHeaders() }).then(r => r.json());
      
      if (tableData.code !== 0 || !Array.isArray(tableData.data)) {
        throw new Error("Unable to retrieve live game session information.");
      }

      // Match the exact frontend name (t.name or t.tableNumber)
      const tableObj = tableData.data.find(t => t.name === tableId || t.tableNumber === tableId);

      if (!tableObj) {
        throw new Error(`Table "${tableId}" not found in live lobby (exact match failed).`);
      }

      const canonicalRoomId = tableObj.roomId;
      const displayName = tableObj.tableNumber || tableObj.name || `Baccarat ${canonicalRoomId.replace("BAC-", "")}`;
      console.log(`🎯 [RESOLVED] Matched exact table name "${tableId}" (Room ID: ${canonicalRoomId})`);
      console.log(`🎯 [BET DETAILS] Spot: ${formattedPosition} | Amount: ${amount}`);

      // Check live status
      const wsCache = window.__tableStatesCache[canonicalRoomId];
      const piniaSockets = getLivePiniaSockets() || {};
      const piniaState = piniaSockets[canonicalRoomId];
      const activeState = wsCache?.status || piniaState?.status || tableObj.status || "Unknown";

      if (activeState !== "CountDown") {
        console.warn(`⚠️ [WARNING] Table status is currently: "${stateMap[activeState] || activeState}". Your bet might be rejected.`);
      }

      const payload = {
        betLimit: tableObj.limitObj?.limitId || 3016,
        gameId: wsCache?.gameId || piniaState?.gameId || tableObj.gameId,
        type: type,
        txts: [
          {
            position: formattedPosition,
            betValue: amount
          }
        ]
      };

      console.log("✈️ Sending encrypted bet payload:", payload);

      const response = await fetch(`${API_BASE}/apiRoute/transaction/userPlaceBet`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload)
      }).then(r => r.json());

      if (response.code === 0) {
        console.log(`%c✅ [SUCCESS] Bet placed successfully! Server Response: ${response.msg || "Approved"}`, "color: #00ff00; font-weight: bold;");
      } else {
        console.error(`❌ [REJECTED] Code: ${response.code} | Reason: ${response.msg}`);
      }
      return response;
    } catch (err) {
      console.error("❌ [ERROR] Bet placement failed:", err.message);
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

  // --- 5. IMMEDIATE EXECUTION: PLACE AUTO BET ---
  console.log("\n⚡ === AUTO-BET EXECUTION ===");
  console.log(`Configured Auto-Bet: ${TARGET_AMOUNT} chips on ${TARGET_POSITION.toUpperCase()} at table ${TARGET_TABLE}`);
  await window.placeBet(TARGET_TABLE, TARGET_POSITION, TARGET_AMOUNT);
  
  console.log("\n💡 USAGE INFO:\n`placeBet()` function remains active! To place another bet manually, just type: \n👉 placeBet('Prettyico116', 'banker', 20)\n");
})();
