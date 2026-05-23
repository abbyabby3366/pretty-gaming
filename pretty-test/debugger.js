(function () {
  if (window.__clickTrackerActive) {
    console.log("Click Tracker is already running.");
    return;
  }
  window.__clickTrackerActive = true;

  const originalWsSend = WebSocket.prototype.send;
  const originalXhrSend = XMLHttpRequest.prototype.send;
  const originalOpen = XMLHttpRequest.prototype.open;
  const originalFetch = window.fetch;

  let lastClickTime = 0;

  const pointerDownListener = () => {
    lastClickTime = Date.now();
    console.log(
      "🖱️ [Click Detected] Listening for network requests for the next 2 seconds...",
    );
  };

  // Listen to all clicks (pointerdown catches mouse, touch, and pen)
  window.addEventListener("pointerdown", pointerDownListener, true); // Capture phase to get it before the game engine does

  function isClickRecent() {
    return Date.now() - lastClickTime < 2000;
  }

  // Intercept WebSocket
  WebSocket.prototype.send = function (data) {
    if (isClickRecent()) {
      let textData = data;
      if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
        try {
          textData = new TextDecoder().decode(data);
        } catch (e) {}
      }
      console.log("🚀 [WS OUTGOING]", textData);
      debugger; // Freezes the browser!
    }
    return originalWsSend.apply(this, arguments);
  };

  // Intercept XHR
  XMLHttpRequest.prototype.open = function (method, url) {
    this._url = url;
    return originalOpen.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function (data) {
    if (isClickRecent()) {
      console.log("🚀 [XHR OUTGOING]", this._url, data);
      debugger; // Freezes the browser!
    }
    return originalXhrSend.apply(this, arguments);
  };

  // Intercept Fetch
  window.fetch = async function (...args) {
    if (isClickRecent()) {
      console.log("🚀 [FETCH OUTGOING]", args[0]);
      debugger; // Freezes the browser!
    }
    return originalFetch.apply(this, arguments);
  };

  // Function to stop the debugger
  window.clearDebugger = function () {
    if (!window.__clickTrackerActive) {
      console.log("Click Tracker is not running.");
      return;
    }

    // Restore original functions
    WebSocket.prototype.send = originalWsSend;
    XMLHttpRequest.prototype.send = originalXhrSend;
    XMLHttpRequest.prototype.open = originalOpen;
    window.fetch = originalFetch;

    // Remove event listener
    window.removeEventListener("pointerdown", pointerDownListener, true);

    // Reset state
    window.__clickTrackerActive = false;
    delete window.clearDebugger;

    console.log(
      "🛑 Click Tracker has been stopped. Network functions restored to normal.",
    );
  };

  console.log(
    "✅ Click Tracker Active! Now simply click on the table you want to join. Type clearDebugger() in the console to stop.",
  );
})();
