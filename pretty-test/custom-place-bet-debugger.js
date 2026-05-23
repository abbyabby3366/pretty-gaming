(function () {
    if (window.__clickTrackerActive) {
        console.log("Click Tracker is already running.");
        return;
    }
    window.__clickTrackerActive = true;

    const originalFetch = window.fetch;
    const originalXhrSend = XMLHttpRequest.prototype.send;
    const originalOpen = XMLHttpRequest.prototype.open;

    // Intercept Fetch (Catch EVERYTHING)
    window.fetch = async function (...args) {
        const url = args[0];
        console.log("✈️ [FETCH OUTGOING] Attempting to request:", url);

        if (typeof url === 'string' && url.includes('userPlaceBet')) {
            console.log("🎯 [BET DETECTED] Fetch request matches userPlaceBet!");
            debugger; // Freezes the browser!
        }
        return originalFetch.apply(this, arguments);
    };

    // Intercept XHR
    XMLHttpRequest.prototype.open = function (method, url) {
        this._url = url;
        return originalOpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function (data) {
        console.log("✈️ [XHR OUTGOING] Attempting to request:", this._url);
        if (this._url && this._url.includes('userPlaceBet')) {
            console.log("🎯 [BET DETECTED] XHR request matches userPlaceBet!");
            debugger; // Freezes the browser!
        }
        return originalXhrSend.apply(this, arguments);
    };

    window.clearDebugger = function () {
        window.fetch = originalFetch;
        XMLHttpRequest.prototype.send = originalXhrSend;
        XMLHttpRequest.prototype.open = originalOpen;
        window.__clickTrackerActive = false;
        delete window.clearDebugger;
        console.log("🛑 Debugger stopped.");
    };

    console.log("✅ Custom Debugger Active! Watching for userPlaceBet...");
})();
