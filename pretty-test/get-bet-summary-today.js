(async function () {
    // --- CONFIGURATION ---
    // Customize the date/time range below (Format: "YYYY-MM-DD HH:mm:ss").
    // Leave as null to default to today's full day (00:00:00 to 23:59:59).
    const START_DATE = null;
    const END_DATE = null;

    function getAuthToken() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const val = localStorage.getItem(key);
            if (key.toLowerCase().includes('token') && val) return val.replace(/^Bearer\s+/i, '');
            if (val && val.startsWith('eyJ') && val.split('.').length === 3) return val;
        }
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            const val = sessionStorage.getItem(key);
            if (key.toLowerCase().includes('token') && val) return val.replace(/^Bearer\s+/i, '');
            if (val && val.startsWith('eyJ') && val.split('.').length === 3) return val;
        }
        const cookieMatch = document.cookie.match(/token=([^;]+)/i);
        if (cookieMatch) return decodeURIComponent(cookieMatch[1]);
        return null;
    }

    const token = getAuthToken();
    if (!token) {
        console.error("Error: Authorization token not found.");
        return;
    }

    const API_BASE = window.location.origin.includes("api") 
        ? window.location.origin 
        : "https://member-api.aghippo168.com";

    const headers = {
        "Content-Type": "application/json",
        "authorization": token
    };

    // Calculate dates and timezone info
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    
    const defaultStart = `${yyyy}-${mm}-${dd} 00:00:00`;
    const defaultEnd = `${yyyy}-${mm}-${dd} 23:59:59`;

    const queryStart = START_DATE || defaultStart;
    const queryEnd = END_DATE || defaultEnd;

    // Get time zone name (e.g. "Asia/Bangkok") and offset abbreviation (e.g. "GMT+0800")
    const tzName = Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown Zone";
    const tzOffset = now.toTimeString().split(' ')[1] || "";

    try {
        // --- 1. FETCH BALANCE ---
        console.log("⏳ Fetching account balance...");
        const profile = await fetch(`${API_BASE}/apiRoute/member/profile`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ lang: "en" })
        }).then(r => r.json());

        let balance = "Unknown";
        if (profile && profile._id) {
            const balanceInfo = await fetch(`${API_BASE}/apiRoute/member/viewBalance/${profile._id}`, {
                method: "GET",
                headers: headers
            }).then(r => r.json());
            if (balanceInfo && typeof balanceInfo.balance !== 'undefined') {
                const currency = profile.currency && profile.currency[0] ? profile.currency[0] : "THB";
                balance = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: currency
                }).format(balanceInfo.balance);
            }
        }

        // --- 2. FETCH BET SUMMARY ---
        console.log("⏳ Fetching betting data...");
        const response = await fetch(`${API_BASE}/apiRoute/transaction/myBet2`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                startDate: queryStart,
                endDate: queryEnd,
                type: "All",
                limit: 100,
                page: 1
            })
        }).then(r => r.json());

        if (response.code !== 0) {
            throw new Error(response.msg || `Server error ${response.code}`);
        }

        const summaries = response.data?.summaries || { turnOver: 0, totalBet: 0, winLose: 0 };
        const results = response.data?.result || [];

        // Print simple summary report
        console.log("\n--- Betting Summary Report ---");
        console.log(`Current Balance: ${balance}`);
        console.log(`Query Range:     ${queryStart} to ${queryEnd} (${tzName} ${tzOffset})`);
        console.log(`Turnover:        ${summaries.turnOver}`);
        console.log(`Total Bet:       ${Math.abs(summaries.totalBet)}`);
        console.log(`Total Win/Lose:  ${summaries.winLose}`);
        console.log(`Total Rounds:    ${results.length}`);
        console.log("------------------------------");

        // Print detailed table if any results exist
        if (results.length > 0) {
            const detailedTable = results.map(round => {
                const spotsDetail = (round.txtList || []).map(b => {
                    const statusStr = b.winLose > 0 ? `+${b.winLose}` : `${b.winLose}`;
                    return `${b.betPosition}: ${b.betAmt} (${statusStr})`;
                }).join(" | ");

                return {
                    "Date & Time": round.date ? new Date(round.date).toLocaleString() : "N/A",
                    "Table": round.tableId === "0" ? "Parlay" : round.tableId,
                    "Round": round.round || "N/A",
                    "Total Bet": Math.abs(round.totalBet),
                    "Win/Lose": round.winLose,
                    "Bets Placed": spotsDetail
                };
            });

            console.log("\n--- Detailed Bet List ---");
            console.table(detailedTable);
        } else {
            console.log("No bets found for this query range.");
        }

    } catch (err) {
        console.error("Failed to query transaction API:", err.message);
    }
})();
