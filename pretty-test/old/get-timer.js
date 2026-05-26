(async function () {
    // ================= CONFIGURATION =================
    // Set to your specific table name (e.g., "Prettywm6").
    // Leave as "" to automatically detect the currently active table.
    const TARGET_TABLE = "Prettywm6";
    // =================================================

    // Helper: Dynamically locate Pinia state manager across all frames/iframes
    function findPiniaAcrossFrames() {
        const windowsToTry = [window];
        try {
            if (window.parent && window.parent !== window) windowsToTry.push(window.parent);
            if (window.top && window.top !== window) windowsToTry.push(window.top);
        } catch (e) { }

        try {
            const iframes = document.querySelectorAll('iframe');
            for (const iframe of iframes) {
                try {
                    if (iframe.contentWindow) windowsToTry.push(iframe.contentWindow);
                } catch (e) { }
            }
        } catch (e) { }

        for (const w of windowsToTry) {
            try {
                let pinia = w.$nuxt?.$pinia || w.$pinia;
                if (!pinia) {
                    const el = w.document.querySelector('#__nuxt') || w.document.querySelector('#app') || w.document.body;
                    pinia = el?.__vue_app__?.$pinia || el?.__vue_app__?.config?.globalProperties?.$pinia;
                }
                if (pinia) {
                    return { pinia, win: w };
                }
            } catch (e) { }
        }
        return null;
    }

    // Helper: Retrieve WebSocket state cache across all frames
    function getSocketDataAcrossFrames(roomId) {
        const windowsToTry = [window];
        try {
            if (window.parent && window.parent !== window) windowsToTry.push(window.parent);
            if (window.top && window.top !== window) windowsToTry.push(window.top);
        } catch (e) { }

        try {
            const iframes = document.querySelectorAll('iframe');
            for (const iframe of iframes) {
                try {
                    if (iframe.contentWindow) windowsToTry.push(iframe.contentWindow);
                } catch (e) { }
            }
        } catch (e) { }

        for (const w of windowsToTry) {
            try {
                if (w.__tableStatesCache && w.__tableStatesCache[roomId]) {
                    return w.__tableStatesCache[roomId];
                }
            } catch (e) { }
        }
        return null;
    }

    // Helper: Find authorization token across storage instances
    function getAuthToken() {
        const windowsToTry = [window];
        try {
            if (window.parent && window.parent !== window) windowsToTry.push(window.parent);
            if (window.top && window.top !== window) windowsToTry.push(window.top);
        } catch (e) { }

        for (const w of windowsToTry) {
            try {
                for (let i = 0; i < w.localStorage.length; i++) {
                    const key = w.localStorage.key(i);
                    const val = w.localStorage.getItem(key);
                    if (key.toLowerCase().includes('token') && val) return val.replace(/^Bearer\s+/i, '');
                    if (val && val.startsWith('eyJ') && val.split('.').length === 3) return val;
                }
                for (let i = 0; i < w.sessionStorage.length; i++) {
                    const key = w.sessionStorage.key(i);
                    const val = w.sessionStorage.getItem(key);
                    if (key.toLowerCase().includes('token') && val) return val.replace(/^Bearer\s+/i, '');
                    if (val && val.startsWith('eyJ') && val.split('.').length === 3) return val;
                }
            } catch (e) { }
        }
        return null;
    }

    const piniaInfo = findPiniaAcrossFrames();
    const pinia = piniaInfo?.pinia;
    const piniaWin = piniaInfo?.win || window;

    // Resolve roomId & mapping dictionary
    let roomId = null;
    const rooms = {};

    // 1. Resolve room details from Pinia if found
    if (pinia?.state?.value) {
        for (const storeKey of Object.keys(pinia.state.value)) {
            const storeState = pinia.state.value[storeKey];
            if (storeState) {
                for (const prop of Object.keys(storeState)) {
                    if (prop.toLowerCase().includes('table') && Array.isArray(storeState[prop])) {
                        storeState[prop].forEach(t => {
                            if (t && t.roomId) {
                                rooms[t.roomId] = t.tableNumber || t.name || t.tableId;
                                if (TARGET_TABLE && (t.roomId === TARGET_TABLE || t.tableNumber === TARGET_TABLE || t.name === TARGET_TABLE)) {
                                    roomId = t.roomId;
                                }
                            }
                        });
                    }
                }
            }
        }
        if (!roomId) {
            roomId = TARGET_TABLE || pinia.state.value.global?.playingRoomId;
        }
    }

    // 2. Fallback to Member API lobby mapping if Pinia was missing/unpopulated
    if (!roomId) {
        try {
            const token = getAuthToken();
            if (token) {
                const API_BASE = "https://member-api.aghippo168.com";
                const tableData = await fetch(`${API_BASE}/apiRoute/table/getAllBac`, {
                    headers: { "Content-Type": "application/json", "authorization": token }
                }).then(r => r.json());

                if (tableData.code === 0 && Array.isArray(tableData.data)) {
                    tableData.data.forEach(t => {
                        rooms[t.roomId] = t.tableNumber || t.name || t.tableId;
                        if (TARGET_TABLE && (t.roomId === TARGET_TABLE || t.tableNumber === TARGET_TABLE || t.name === TARGET_TABLE)) {
                            roomId = t.roomId;
                        }
                    });
                }
            }
        } catch (e) { }
    }

    // Default to configuration target
    if (!roomId) {
        roomId = TARGET_TABLE;
    }

    if (!roomId) {
        return console.error("❌ Target table or active playing table could not be identified.");
    }

    // Retrieve active WebSocket countdown timer
    let socketData = getSocketDataAcrossFrames(roomId);

    // Pinia fallback for socket retrieval
    if (!socketData && pinia?.state?.value) {
        for (const storeKey of Object.keys(pinia.state.value)) {
            const storeState = pinia.state.value[storeKey];
            if (storeState) {
                for (const prop of Object.keys(storeState)) {
                    if (prop.toLowerCase().includes('socket') && typeof storeState[prop] === 'object' && storeState[prop] !== null) {
                        if (storeState[prop][roomId]) {
                            socketData = storeState[prop][roomId];
                            break;
                        }
                    }
                }
            }
            if (socketData) break;
        }
    }

    if (!socketData || socketData.timeLeft === undefined) {
        return console.error(`❌ No real-time socket timer data found for table "${rooms[roomId] || roomId}".`);
    }

    console.log(`⏱️ Table: ${rooms[roomId] || roomId} | Time Remaining: ${socketData.timeLeft}s`);
    return socketData.timeLeft;
})();
