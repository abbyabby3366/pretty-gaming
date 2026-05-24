// ================= CONFIGURATION =================
// Set to "ALL" to fetch all bead roads, or a specific visual name/Room ID (e.g., "Prettyonsexy01" or "BAC-001")
const WATCHED_TABLE = "Prettyonsexy01";
// const WATCHED_TABLE = "ALL";
// =================================================

(async function () {
  console.clear();
  console.log("%c 📊 [BEAD ROAD EXTRACTOR] Initializing... ", "background: #1e1e1e; color: #00ff00; padding: 4px; font-weight: bold; border-radius: 4px;");

  const API_BASE = "https://member-api.aghippo168.com";

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

  // --- 2. OUTCOME MAPPING SYSTEM ---
  const outcomeMap = {
    "b":   { label: "Banker Win",                 emoji: "🔴" },
    "bb":  { label: "Banker Win + Banker Pair",   emoji: "🔴" },
    "bp":  { label: "Banker Win + Player Pair",   emoji: "🔴" },
    "bpb": { label: "Banker Win + Both Pairs",    emoji: "🔴" },
    "p":   { label: "Player Win",                 emoji: "🔵" },
    "pb":  { label: "Player Win + Banker Pair",   emoji: "🔵" },
    "pp":  { label: "Player Win + Player Pair",   emoji: "🔵" },
    "t":   { label: "Tie Win",                    emoji: "🟢" },
    "tb":  { label: "Tie Win + Banker Pair",      emoji: "🟢" },
    "tp":  { label: "Tie Win + Player Pair",      emoji: "🟢" },
    "n":   { label: "Empty",                      emoji: "⚪" }
  };

  // Helper to resolve detailed display name including pairs
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

  // --- 3. LOBBY PRELOADER ---
  async function fetchRoomMapping() {
    const roomMap = {};
    try {
      // 1. Fetch Baccarat Tables
      const bacRes = await fetch(`${API_BASE}/apiRoute/table/getAllBac`, { headers: getHeaders() }).then(r => r.json());
      if (bacRes.code === 0 && Array.isArray(bacRes.data)) {
        bacRes.data.forEach(t => {
          const displayName = t.tableNumber || t.name || `Baccarat ${t.roomId.replace("BAC-", "")}`;
          roomMap[t.roomId.toUpperCase()] = { name: displayName, type: "Baccarat", roomId: t.roomId };
          roomMap[displayName.toUpperCase()] = { name: displayName, type: "Baccarat", roomId: t.roomId };
        });
      }

      // 2. Fetch Dragon Tiger Tables
      const dtRes = await fetch(`${API_BASE}/apiRoute/table/getAllDar`, { headers: getHeaders() }).then(r => r.json());
      if (dtRes.code === 0 && Array.isArray(dtRes.data)) {
        dtRes.data.forEach(t => {
          const displayName = t.tableNumber || t.name || `Dragon Tiger ${t.roomId.replace("DT-", "")}`;
          roomMap[t.roomId.toUpperCase()] = { name: displayName, type: "DragonTiger", roomId: t.roomId };
          roomMap[displayName.toUpperCase()] = { name: displayName, type: "DragonTiger", roomId: t.roomId };
        });
      }
    } catch (err) {
      console.warn("⚠️ Failed to load visual names map from REST APIs. Map will build dynamically.", err.message);
    }
    return roomMap;
  }

  // --- 4. EXPOSED API FUNCTION ---
  window.getBeadRoad = async function (tableNameOrRoomId) {
    if (!tableNameOrRoomId) {
      console.error("❌ Please provide a table name or Room ID (e.g., 'Prettyonsexy01', 'BAC-001', or 'ALL')");
      return;
    }

    console.log(`🔍 [BEAD ROAD] Fetching lobby visual layout...`);
    const roomMap = await fetchRoomMapping();

    const roomsToQuery = [];
    if (tableNameOrRoomId.toUpperCase() === "ALL") {
      const seen = new Set();
      Object.values(roomMap).forEach(info => {
        if (!seen.has(info.roomId)) {
          seen.add(info.roomId);
          roomsToQuery.push(info);
        }
      });
    } else {
      const match = roomMap[tableNameOrRoomId.toUpperCase()];
      if (match) {
        roomsToQuery.push(match);
      } else {
        // Direct Room ID fallback
        roomsToQuery.push({ name: `Table ${tableNameOrRoomId}`, type: "Unknown", roomId: tableNameOrRoomId });
      }
    }

    if (roomsToQuery.length === 0) {
      console.error(`❌ Table matching "${tableNameOrRoomId}" not found in lobby list.`);
      return;
    }

    for (const room of roomsToQuery) {
      try {
        const url = `${API_BASE}/apiRoute/table/getStatResult/${room.roomId}`;
        const res = await fetch(url, { headers: getHeaders() }).then(r => r.json());

        if (res.code !== 0 || !res.data) {
          console.warn(`⚠️ Failed to retrieve statistics for ${room.name} (${room.roomId})`);
          continue;
        }

        const statistics = res.data.statistics || [];

        // Build 6-row columns for Bead Road visualization
        const lineOutput = statistics.map(code => {
          const info = outcomeMap[code] || { emoji: "❓" };
          return info.emoji;
        }).join(" ");

        console.log(
          `\n%c 📊 BEAD ROAD %c ${room.name} %c Room: ${room.roomId} | Type: ${room.type} | Rounds: ${statistics.length} `,
          "background: #1e1e1e; color: #00ff00; padding: 2px 6px; border-radius: 4px 0 0 4px; font-weight: bold;",
          "background: #2b2b2b; color: #ffffff; padding: 2px 6px; font-weight: bold; border-left: 2px solid #00ff00;",
          "background: #1e1e1e; color: #8b949e; padding: 2px 6px; border-radius: 0 4px 4px 0;"
        );

        if (statistics.length === 0) {
          console.log("  ⚪ No games played in the current shoe yet.");
          continue;
        }

        console.log("%cBead Road Sequence (Left ➡️ Right):", "color: #ffaa00; font-weight: bold;");
        console.log(`  ${lineOutput}`);
        console.log(`  %c🔵 Player: ${statistics.filter(c => c.startsWith('p')).length} | 🔴 Banker: ${statistics.filter(c => c.startsWith('b')).length} | 🟢 Tie: ${statistics.filter(c => c.startsWith('t')).length}`, "color: #8b949e; font-size: 11px;");

        // Text summary list of last 10 rounds
        console.log("%cLast 10 Rounds Sequential Outcome:", "color: #58a6ff; font-weight: bold;");
        const last10 = statistics.slice(-10);
        last10.forEach((code, idx) => {
          const roundNum = statistics.length - last10.length + idx + 1;
          const info = outcomeMap[code] || { label: "Unknown", emoji: "❓" };
          const detailedLabel = getDetailedLabel(code);
          console.log(`  Round #${roundNum}: ${info.emoji} ${detailedLabel}`);
        });

      } catch (err) {
        console.error(`❌ Error querying table ${room.name}:`, err.message);
      }
    }
  };

  console.log(`🔌 [BEAD ROAD EXPORTED] Call %cgetBeadRoad("Prettyonsexy01")%c or %cgetBeadRoad("ALL")%c in this console!`, "color: #ffaa00; font-weight: bold;", "", "color: #ffaa00; font-weight: bold;", "");

  // Immediate invocation on paste to print bead roads for specified table(s)
  console.log(`🚀 Running immediate extraction for: ${WATCHED_TABLE}...`);
  await window.getBeadRoad(WATCHED_TABLE);
})();
