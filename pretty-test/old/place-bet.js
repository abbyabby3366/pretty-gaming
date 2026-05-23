// ================= CONFIGURATION =================
// Edit these values before copying and pasting!
const TARGET_TABLE = "BAC-WM6";
const TARGET_POSITION = "player"; // options: "player", "banker", "tie", "playerPair", "bankerPair", etc.
const TARGET_AMOUNT = 10;
// =================================================

(async function () {
  console.clear();
  console.log("🚀 Pretty Gaming Auto-Bet Control Panel Initializing...");

  const API_BASE = "https://member-api.aghippo168.com";

  const stateMap = {
    "CountDown": "⏳ Waiting for Bets",
    "showResult": "🃏 Dealing",
    "PayOut": "🏆 Results Outcome",
    "Shuffle": "🔄 Shuffling"
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

  // --- 2. GLOBAL BET PLACER UTILITY ---
  window.placeBet = async function (tableId, position, amount) {
    const formattedTableId = tableId.toUpperCase();
    const formattedPosition = position.toLowerCase();
    const type = formattedTableId.startsWith("BAC") ? "Baccarat" : "DragonTiger";

    console.log(`🎯 [BET INITIATED] Table: ${formattedTableId} | Spot: ${formattedPosition} | Amount: ${amount}`);

    try {
      const endpoint = type === "Baccarat" ? `${API_BASE}/apiRoute/table/getAllBac` : `${API_BASE}/apiRoute/table/getAllDar`;
      const tableData = await fetch(endpoint, { headers: getHeaders() }).then(r => r.json());

      if (tableData.code !== 0 || !Array.isArray(tableData.data)) {
        throw new Error("Unable to retrieve live game session information.");
      }

      const tableObj = tableData.data.find(t => t.roomId === formattedTableId);
      if (!tableObj) {
        throw new Error(`Table ${formattedTableId} not found in live lobby.`);
      }

      if (tableObj.status !== "CountDown") {
        console.warn(`⚠️ [WARNING] Table status is currently: "${stateMap[tableObj.status] || tableObj.status}". Your bet might be rejected.`);
      }

      const payload = {
        betLimit: tableObj.limitObj?.limitId || 3016,
        gameId: tableObj.gameId,
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

  // --- 3. IMMEDIATE EXECUTION: BACCARAT LOBBY LISTER ---
  try {
    const bacRes = await fetch(`${API_BASE}/apiRoute/table/getAllBac`, { headers: getHeaders() }).then(async r => {
      const text = await r.text();
      try { return JSON.parse(text); } catch (e) {
        throw new Error(`Baccarat response is not valid JSON. Content: ${text.substring(0, 100)}`);
      }
    });

    const tableDirectory = [];

    if (bacRes.code === 0 && Array.isArray(bacRes.data)) {
      bacRes.data.forEach(t => {
        const name = t.tableNumber || t.name || `Baccarat ${t.roomId.replace("BAC-", "")}`;
        tableDirectory.push({
          "Name / Number": name,
          "Betting Room ID": t.roomId,
          "Game ID": t.gameId || "N/A", // Added Game ID column!
          "Game Type": "Baccarat",
          "Current State": stateMap[t.status] || t.status || "Unknown",
          "Allowed Bet Spots": "player, banker, tie, playerPair, bankerPair, small, big, playerNatural, bankerNatural, super6"
        });
      });
    }

    console.log("\n📋 === PRETTY GAMING LIVE BACCARAT TABLE DIRECTORY ===");
    console.table(tableDirectory);
  } catch (err) {
    console.error("❌ Failed to query lobby directory:", err.message);
  }

  // --- 4. IMMEDIATE EXECUTION: PLACE AUTO BET ---
  console.log("\n⚡ === AUTO-BET EXECUTION ===");
  console.log(`Configured Auto-Bet: ${TARGET_AMOUNT} chips on ${TARGET_POSITION.toUpperCase()} at table ${TARGET_TABLE}`);
  await window.placeBet(TARGET_TABLE, TARGET_POSITION, TARGET_AMOUNT);

  console.log("\n💡 USAGE INFO:\n`placeBet()` function remains active! To place another bet manually, just type: \n👉 placeBet('BAC-01', 'banker', 20)\n");
})();
