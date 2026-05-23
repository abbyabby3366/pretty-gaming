(function () {
  console.clear();
  console.log("🚀 Pretty Gaming API Control Panel Initializing...");

  const API_BASE = "https://member-api.aghippo168.com";

  // --- 1. SESSION TOKEN EXTRACTOR ---
  function getAuthToken() {
    // Search localStorage
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
    // Search sessionStorage
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
    // Search Cookies
    const cookieMatch = document.cookie.match(/token=([^;]+)/i);
    if (cookieMatch) return decodeURIComponent(cookieMatch[1]);
    return null;
  }

  // Helper to construct headers
  function getHeaders() {
    const token = getAuthToken();
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
    }
    return headers;
  }

  // --- 2. API TABLE STATUS EXTRACTOR ---
  const stateMap = {
    "CountDown": "⏳ Waiting for Bets",
    "showResult": "🃏 Dealing",
    "PayOut": "🏆 Results Outcome",
    "Shuffle": "🔄 Shuffling"
  };

  window.fetchTableStates = async function () {
    console.log("📡 Fetching table states from API...");
    try {
      const [bacRes, dtRes] = await Promise.all([
        fetch(`${API_BASE}/apiRoute/table/getAllBac`, { headers: getHeaders() }).then(r => r.json()),
        fetch(`${API_BASE}/apiRoute/table/getAllDar`, { headers: getHeaders() }).then(r => r.json()).catch(() => ({ data: [] }))
      ]);

      const activeTables = [];

      if (bacRes.code === 0 && Array.isArray(bacRes.data)) {
        bacRes.data.forEach(t => {
          activeTables.push({
            "Table ID": t.roomId,
            "Game ID": t.gameId,
            "Type": "Baccarat",
            "State": stateMap[t.status] || t.status || "Unknown",
            "Countdown": t.timeLeft !== undefined ? `${t.timeLeft}s` : "N/A",
            "Active Limit ID": t.limitObj?.limitId || "Default"
          });
        });
      }

      if (dtRes.code === 0 && Array.isArray(dtRes.data)) {
        dtRes.data.forEach(t => {
          activeTables.push({
            "Table ID": t.roomId,
            "Game ID": t.gameId,
            "Type": "DragonTiger",
            "State": stateMap[t.status] || t.status || "Unknown",
            "Countdown": t.timeLeft !== undefined ? `${t.timeLeft}s` : "N/A",
            "Active Limit ID": t.limitObj?.limitId || "Default"
          });
        });
      }

      console.table(activeTables);
      return activeTables;
    } catch (err) {
      console.error("❌ Failed to fetch table states:", err.message);
    }
  };

  // --- 2.5 DEDICATED TABLE NICKNAME & BET OPTION LISTER ---
  window.listTables = async function () {
    console.log("📡 Querying lobby for table mapping and betting spots...");
    try {
      const [bacRes, dtRes] = await Promise.all([
        fetch(`${API_BASE}/apiRoute/table/getAllBac`, { headers: getHeaders() }).then(r => r.json()),
        fetch(`${API_BASE}/apiRoute/table/getAllDar`, { headers: getHeaders() }).then(r => r.json()).catch(() => ({ data: [] }))
      ]);

      const tableDirectory = [];

      if (bacRes.code === 0 && Array.isArray(bacRes.data)) {
        bacRes.data.forEach(t => {
          const name = t.tableNumber || t.name || `Baccarat ${t.roomId.replace("BAC", "")}`;
          tableDirectory.push({
            "Name / Number": name,
            "Betting Room ID": t.roomId,
            "Game Type": "Baccarat",
            "Current State": stateMap[t.status] || t.status || "Unknown",
            "Allowed Bet Spots": "player, banker, tie, playerPair, bankerPair, small, big, playerNatural, bankerNatural, super6"
          });
        });
      }

      if (dtRes.code === 0 && Array.isArray(dtRes.data)) {
        dtRes.data.forEach(t => {
          const name = t.tableNumber || t.name || `DragonTiger ${t.roomId.replace("DT", "")}`;
          tableDirectory.push({
            "Name / Number": name,
            "Betting Room ID": t.roomId,
            "Game Type": "DragonTiger",
            "Current State": stateMap[t.status] || t.status || "Unknown",
            "Allowed Bet Spots": "dragon, tiger, tie"
          });
        });
      }

      console.log("\n📋 === PRETTY GAMING LIVE TABLE DIRECTORY ===");
      console.table(tableDirectory);
      console.log("\n💡 USAGE EXAMPLE:\nTo bet 50 on Player at Baccarat 1 (BAC01), type: \n👉 placeBet('BAC01', 'player', 50)\n");
      return tableDirectory;
    } catch (err) {
      console.error("❌ Failed to list tables:", err.message);
    }
  };

  // --- 3. DIRECT API BET PLACER ---
  window.placeBet = async function (tableId, position, amount) {
    const formattedTableId = tableId.toUpperCase();
    const formattedPosition = position.toLowerCase(); // e.g. "player", "banker", "tie"
    const type = formattedTableId.startsWith("BAC") ? "Baccarat" : "DragonTiger";

    console.log(`🎯 [BET INITIATED] Table: ${formattedTableId} | Spot: ${formattedPosition} | Amount: ${amount}`);

    try {
      // 1. Fetch live table state to grab fresh Game ID and Limit ID
      const endpoint = type === "Baccarat" ? `${API_BASE}/apiRoute/table/getAllBac` : `${API_BASE}/apiRoute/table/getAllDar`;
      const tableData = await fetch(endpoint, { headers: getHeaders() }).then(r => r.json());
      
      if (tableData.code !== 0 || !Array.isArray(tableData.data)) {
        throw new Error("Unable to retrieve live game session information.");
      }

      const tableObj = tableData.data.find(t => t.roomId === formattedTableId);
      if (!tableObj) {
        throw new Error(`Table ${formattedTableId} not found in live lobby.`);
      }

      // Check if betting is allowed
      if (tableObj.status !== "CountDown") {
        console.warn(`⚠️ [WARNING] Table is currently: "${stateMap[tableObj.status] || tableObj.status}". Bet might be rejected.`);
      }

      const payload = {
        betLimit: tableObj.limitObj?.limitId || 3016, // Use active limitId
        gameId: tableObj.gameId,                     // Direct active gameId
        type: type,
        txts: [
          {
            position: formattedPosition,
            betValue: amount
          }
        ]
      };

      console.log("✈️ Sending encrypted bet payload:", payload);

      // 2. Submit Direct POST request
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

          // Listen for live status change notifications from the game server
          if (packet && packet.roomId && packet.status) {
            const state = stateMap[packet.status] || packet.status;
            const timer = packet.timeLeft !== undefined ? ` | ⏱️ ${packet.timeLeft}s` : "";
            console.log(`📡 [WS Live State] Table: ${packet.roomId} | Game ID: ${packet.gameId} | State: ${state}${timer}`);
          }
        } catch (e) {
          // Ignore binary/heartbeats/non-JSON data
        }
      });
      console.log("🔌 Connected & Hooked real-time WebSocket state monitor!");
    }
    return originalWsSend.apply(this, arguments);
  };

  console.log("🔌 Pretty Gaming API Control Panel Active!");
  console.log("👉 Type listTables() to see all table IDs and betting spots.");
  console.log("👉 Type fetchTableStates() to list active state countdowns.");
  console.log("👉 Type placeBet('BAC01', 'player', 10) to place a direct API bet.");
})();
