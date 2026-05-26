(async function () {
    console.clear();
    console.log("%c🔮 Pretty Gaming Account Balance Retriever 🔮", "color: #ff007f; font-size: 16px; font-weight: bold; text-shadow: 0 0 5px rgba(255,0,127,0.5);");

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

    const token = getAuthToken();
    if (!token) {
        console.error("%c❌ Error: Authorization token not found in storage. Make sure you are logged in!", "color: #ff3333; font-weight: bold;");
        return;
    }

    console.log("%c🔑 Session token successfully resolved.", "color: #00ffcc;");

    const API_BASE = "https://member-api.aghippo168.com";
    const headers = {
        "Content-Type": "application/json",
        "authorization": token
    };

    try {
        console.log("⏳ Fetching user profile...");
        const profile = await fetch(`${API_BASE}/apiRoute/member/profile`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ lang: "en" })
        }).then(r => r.json());

        if (!profile || !profile._id) {
            throw new Error(profile.msg || "Failed to retrieve profile ID.");
        }

        console.log(`%c👤 User Profile Loaded: ${profile.username} (Nickname: ${profile.nickname || 'N/A'})`, "color: #eedd82; font-weight: bold;");

        console.log("⏳ Fetching account balance...");
        const balanceInfo = await fetch(`${API_BASE}/apiRoute/member/viewBalance/${profile._id}`, {
            method: "GET",
            headers: headers
        }).then(r => r.json());

        const balance = balanceInfo && typeof balanceInfo.balance !== 'undefined' ? balanceInfo.balance : "Unknown";
        const currency = profile.currency && profile.currency[0] ? profile.currency[0] : "THB";

        // Format currency display
        const formattedBalance = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(balance);

        console.log(
            `%c\n=========================================\n` +
            `  💰  ACCOUNT BALANCE: ${formattedBalance}\n` +
            `=========================================\n`,
            "color: #00ff00; font-size: 16px; font-weight: bold; background-color: #111; padding: 10px; border-radius: 8px; border: 2px solid #00ff00;"
        );

        // --- 2. SYNCHRONIZE LOCAL STORE STATE ---
        try {
            let pinia = window.$nuxt?.$pinia || window.$pinia;
            if (!pinia) {
                const el = document.querySelector('#__nuxt') || document.querySelector('#app') || document.body;
                pinia = el?.__vue_app__?.$pinia || el?.__vue_app__?.config?.globalProperties?.$pinia;
            }
            if (pinia && pinia.state && pinia.state.value && pinia.state.value.global) {
                pinia.state.value.global.profile.balance = balance;
                console.log("%c🔄 Web App UI state synchronized.", "color: #9932cc; font-style: italic;");
            }
        } catch (_) { }

    } catch (err) {
        console.error("%c❌ Failed to query balance API:", "color: #ff3333; font-weight: bold;", err.message);
    }
})();
