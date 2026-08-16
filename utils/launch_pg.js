/**
 * launch_pg.js - Launch Chrome, login to Winbox, and navigate to Pretty Gaming.
 * Patterned after launch_bet.js from hotroad_learn.
 */

require("dotenv").config({ path: require("path").resolve(__dirname, "..", ".env") });
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const { spawn, exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec);
const { getBrowserArgs } = require("./browserArgs");
const { verifyProxyIp } = require("./proxy_verifier");
const { checkPGpage } = require("./check_page_pg");

const LOGIN_TIMESTAMPS_FILE = path.resolve(__dirname, "login_timestamps.json");
function readLoginTimestamps() {
  try { return JSON.parse(fs.readFileSync(LOGIN_TIMESTAMPS_FILE, "utf8")); } catch (e) { return {}; }
}
function writeLoginTimestamp(label) {
  const timestamps = readLoginTimestamps();
  timestamps[label] = Date.now();
  try { fs.writeFileSync(LOGIN_TIMESTAMPS_FILE, JSON.stringify(timestamps, null, 2)); } catch (e) {}
  return timestamps[label];
}

const SELECTORS = {
  uid: 'input[placeholder="Enter UID / Email"], input[placeholder*="UID"], input[placeholder*="Email"], input[placeholder*="User"], input[placeholder*="Account"]',
  password: 'input[placeholder="Enter password"], input[type="password"]',
  myNav: "#My-Nav",
  loginPopup: "button.winbox-login-popup-btn",
  // Matches the provided DOM: img[src*="WINBOX/gamelist/PRETY/pc/cover.png"]
  prettyGamingIcon: 'img[src*="PRETY/pc/cover"], img[src*="PRETY"]', 
};

const TIMEOUTS = {
  dashboardWait: 3000,
  navigationWait: 30000,
  selectorWait: 10000,
  tabWait: 30000,
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function withTimeout(promise, ms = 2500, fallback = null) {
  return Promise.race([
    promise,
    new Promise((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

async function killZombieChromeOnPort(port, logger) {
  const targetFlag = `--remote-debugging-port=${port}`;
  try {
    const psCommand = [
      `Get-CimInstance Win32_Process -Filter "Name='chrome.exe'"`,
      `| Where-Object { $_.CommandLine -like '*${targetFlag}*' -and $_.CommandLine -notlike '*--type=*' }`,
      `| Select-Object -ExpandProperty ProcessId`,
    ].join(" ");
    const { stdout } = await execAsync(
      `powershell -NoProfile -NonInteractive -Command "${psCommand}"`,
      { encoding: "utf8", timeout: 10000 },
    );
    const pids = stdout.split(/\r?\n/).map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n) && n > 0);
    if (pids.length === 0) return;
    for (const pid of pids) {
      try {
        logger.warn(`Found zombie Chrome (PID ${pid}) with ${targetFlag}. Killing...`);
        await execAsync(`taskkill /PID ${pid} /F /T`, { timeout: 5000 });
      } catch (e) {}
    }
  } catch (e) {}
}

/**
 * Perform a single immediate check (or quick wait) on the page for error overlays
 * and dismiss them. Helpful right after launch/navigation.
 * 
 * @param {import('puppeteer').Page} page
 * @param {Object} logger
 */
async function checkPageErrors(page, logger = console) {
  try {
    const errorState = await page.evaluate(() => {
      const selectors = [
        ".el-message-box",
        ".swal2-container",
        ".swal-modal",
        ".modal-dialog",
        ".dialog-container",
        ".popup-box",
        ".EmailVerificationRoot"
      ];

      let foundBox = null;
      let boxText = "";

      for (const selector of selectors) {
        const el = document.querySelector(selector);
        if (el) {
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);
          const isVisible = rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
          if (isVisible) {
            foundBox = el;
            boxText = el.innerText || "";
            break;
          }
        }
      }

      if (foundBox) {
        const lowerText = boxText.toLowerCase();
        const errorPatterns = [
          "session timeout",
          "access denied",
          "another device",
          "logged out",
          "kick out",
          "please login",
          "connection lost",
          "disconnected",
          "network error",
          "maintenance",
          "login expired",
          "log in from elsewhere"
        ];

        const hasError = errorPatterns.some(pat => lowerText.includes(pat));
        if (hasError) {
          const confirmSelectors = [
            "button.swal2-confirm",
            ".el-message-box__btns button",
            ".el-message-box__btns .el-button--primary",
            "button.swal-button--confirm",
            ".modal-footer button",
            "button"
          ];

          let clicked = false;
          for (const sel of confirmSelectors) {
            const btns = Array.from(foundBox.querySelectorAll(sel));
            const confirmBtn = btns.find(b => {
              const txt = (b.textContent || b.innerText || "").trim().toLowerCase();
              return /ok|confirm|yes|close|retry|continue/i.test(txt);
            });

            if (confirmBtn) {
              confirmBtn.click();
              clicked = true;
              break;
            }
          }

          return { found: true, text: boxText.trim(), clicked };
        }
      }

      return { found: false };
    });

    if (errorState && errorState.found) {
      logger.warn(`[PageCheck] Found error overlay on start: "${errorState.text}". Dismissed: ${errorState.clicked}`);
      await sleep(1500);
      await page.reload({ waitUntil: "networkidle2", timeout: 30000 }).catch(() => {});
    }
  } catch (err) {
    // Ignore errors during check
  }

  // Let it settle for a couple of seconds
  await sleep(3000);
}

function buildAccountConfig(accountIndex = 0, accountsFilePath, modulePrefix = "") {
  const accountsFile = accountsFilePath || path.resolve(__dirname, "..", "bet_module", "json", "bet_accounts.json");
  
  let prefix = modulePrefix;
  if (!prefix) {
    prefix = accountsFile.includes("eyes_accounts") ? "EYES" : "BET";
  }

  let accounts = [];
  try { accounts = JSON.parse(fs.readFileSync(accountsFile, "utf8")); } catch (err) {}
  
  const account = accounts[accountIndex] || { credentials: { email: process.env.WINBOX_EMAIL, password: process.env.WINBOX_PASSWORD } };
  
  const platform = account.platform || "winbox";
  const launchMethod = account.launchMethod || "connect";
  const baseProfileIndex = 9; // Adjust as needed
  const basePort = 9222;
  const profileIndex = account.profileIndex ?? baseProfileIndex + accountIndex;
  const port = account.debuggingPort ?? basePort + accountIndex;
  
  const rawProxy = account.proxy || {};
  const useProxy = account.useProxy !== undefined ? account.useProxy : !!rawProxy.server;

  return {
    accountIndex,
    modulePrefix: prefix,
    label: account.label || `Account ${accountIndex}`,
    platform,
    launchMethod,
    useProxy,
    proxy: useProxy ? rawProxy : {},
    enableDomCleanup: account.enableDomCleanup ?? false,
    sessionRestartMinutes: account.sessionRestartMinutes || 0,
    chrome: {
      executablePath: process.env.CHROME_EXECUTABLE_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      userDataDir: process.env.CHROME_USER_DATA_DIR 
        ? `${process.env.CHROME_USER_DATA_DIR}\\Profile ${profileIndex}` 
        : `C:\\Temp\\ChromeProfile_${profileIndex}`,
      remoteDebuggingPort: port,
      extraArgs: getBrowserArgs() || [],
    },
    credentials: account.credentials || {},
    urls: {
      login: "https://winbox88my9.com/login",
      pgLobby: ["hippo168.com", "cloudfront.net"] // Supports both direct URL and Winbox CloudFront redirect
    },
  };
}

const STATES = {
  IN_GAME: "IN_GAME",
  WINBOX_DASHBOARD: "WINBOX_DASHBOARD",
  WINBOX_LOGIN: "WINBOX_LOGIN",
  GAME_NOT_QUIT: "GAME_NOT_QUIT",
  UNINITIALIZED: "UNINITIALIZED",
};

async function evaluateState(browser, urls) {
  const pages = await browser.pages();
  const validPages = pages.filter(p => {
      const url = p.url() || "";
      return !url.startsWith("chrome://") && !url.startsWith("chrome-extension://") && !url.includes("devtools://");
  });
  
  let bestState = STATES.UNINITIALIZED;
  let targetPage = validPages.length > 0 ? validPages[0] : null;

  for (const p of validPages) {
    try {
      const url = p.url() || "";

      // Check for "Session timeout" overlay — blocks all interactions.
      // Dismissing and reloading clears the overlay and forces re-login.
      let sessionBox = null;
      let boxText = "";
      for (const frame of p.frames()) {
        sessionBox = await frame.$(".el-message-box").catch(() => null);
        if (sessionBox) {
          boxText = await frame
            .evaluate((el) => el.innerText, sessionBox)
            .catch(() => "");
          break;
        }
      }

      if (sessionBox) {
        const lowerText = boxText.toLowerCase();
        if (
          lowerText.includes("session timeout") ||
          lowerText.includes("access denied") ||
          lowerText.includes("another device") ||
          lowerText.includes("logged out") ||
          lowerText.includes("log in from elsewhere")
        ) {
          console.log(`[evaluateState] Session timeout overlay detected — dismissing and reloading...`);

          // Strategy 1: Click OK button via child selector
          let dismissed = false;
          const okBtn = await sessionBox
            .$(".el-message-box__btns button")
            .catch(() => null);
          if (okBtn) {
            await okBtn.click().catch(() => {});
            dismissed = true;
          }

          // Strategy 2: Try frame-level selector fallback
          if (!dismissed) {
            for (const frame of p.frames()) {
              try {
                const clicked = await frame.evaluate(() => {
                  const btn =
                    document.querySelector(".el-message-box__btns button") ||
                    document.querySelector(".el-message-box__btns .el-button--primary");
                  if (btn) { btn.click(); return true; }
                  const allBtns = document.querySelectorAll(".el-message-box button");
                  for (const b of allBtns) {
                    if (/OK|Confirm/i.test(b.textContent)) { b.click(); return true; }
                  }
                  return false;
                });
                if (clicked) { dismissed = true; break; }
              } catch (e) {}
            }
          }

          await sleep(1000);
          await p.reload({ waitUntil: "networkidle2", timeout: 30000 }).catch(() => {});
          await sleep(2000);
          continue; // Re-evaluate this page's state after reload
        }
      }

      // Check if we reached the Pretty Gaming lobby
      if (urls.pgLobby.some(domain => url.includes(domain))) {
        return { state: STATES.IN_GAME, page: p };
      }

      let isDashboard = false;
      let isLogin = false;
      let isGameNotQuit = false;

      for (const frame of p.frames()) {
        try {
          if (frame.isDetached && frame.isDetached()) continue;
          if (await withTimeout(frame.$(SELECTORS.myNav), 1500, null)) isDashboard = true;
          if (
            (await withTimeout(frame.$(SELECTORS.uid), 1500, null)) ||
            (await withTimeout(frame.$('input[type="password"]'), 1500, null)) ||
            (await withTimeout(frame.$$(SELECTORS.loginPopup), 1500, []).then((el) => el && el.length > 0).catch(() => false))
          ) isLogin = true;

          // Check for visible "Quit Game" element in dashboard/any frame
          const hasQuitText = await withTimeout(frame.evaluate(() => {
            const redName = document.querySelector('.name.red');
            if (redName && redName.textContent.trim() === 'Quit Game') {
              const rect = redName.getBoundingClientRect();
              if (rect.width > 0 && rect.height > 0) return true;
            }
            const elements = document.querySelectorAll('div, button, span, a');
            for (const el of elements) {
              if (el.textContent.trim() === 'Quit Game' && el.children.length === 0) {
                const rect = el.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) return true;
              }
            }
            return false;
          }), 2000, false);
          if (hasQuitText) isGameNotQuit = true;
        } catch (e) {}
      }

      const isWinboxLoginUrl = url.includes("winbox") || url.includes("winbox88my9.com") || url.includes(urls.login);
      if (isGameNotQuit) {
        if (bestState !== STATES.IN_GAME) {
          bestState = STATES.GAME_NOT_QUIT;
          targetPage = p;
        }
      } else if (isDashboard) {
        if (bestState === STATES.UNINITIALIZED || bestState === STATES.WINBOX_LOGIN || bestState === STATES.GAME_NOT_QUIT) {
          bestState = STATES.WINBOX_DASHBOARD;
          targetPage = p;
        }
      } else if (isLogin || isWinboxLoginUrl) {
        if (bestState === STATES.UNINITIALIZED) {
          bestState = STATES.WINBOX_LOGIN;
          targetPage = p;
        }
      }
    } catch (e) {}
  }
  return { state: bestState, page: targetPage };
}

async function launchAccount(acctConfig) {
  const { chrome, useProxy, proxy, credentials, urls, platform, launchMethod, modulePrefix } = acctConfig;
  const logger = { log: (msg) => console.log(`[${acctConfig.label}] ${msg}`), warn: (msg) => console.warn(`[${acctConfig.label}] ${msg}`), error: (msg) => console.error(`[${acctConfig.label}] ${msg}`) };

  const prefix = modulePrefix || "BET";
  let verifiedIp = "Direct / No Proxy";

  if (platform === "winbox" && (!credentials.email || !credentials.password)) {
      throw new Error("Missing Winbox credentials. Please set WINBOX_EMAIL and WINBOX_PASSWORD in .env");
  }

  // --- EMBEDDED TAILSCALE PROXY HANDLING ---
  let tscProxy = null;
  if (proxy && proxy.type === "tailscale") {
    logger.log("Initializing embedded Tailscale node...");
    try {
      const { TSCProxy } = require("@tailscale/tscproxy");
      const port = proxy.port || 1055;
      const hostname = proxy.hostname || `puppeteer-${acctConfig.label.replace(/\s+/g, '-').toLowerCase()}`;
      tscProxy = await TSCProxy.start({
        authKey: proxy.authKey,
        hostname,
        socks5Addr: `127.0.0.1:${port}`,
        args: proxy.exitNode ? [`--exit-node=${proxy.exitNode}`] : []
      });
      logger.log(`Tailscale proxy successfully started on socks5://127.0.0.1:${port}`);
      proxy.server = `socks5://127.0.0.1:${port}`;
    } catch (err) {
      logger.error(`Failed to start Tailscale proxy: ${err.message}`);
      throw err;
    }
  }

  // --- PROXY COMMAND-LINE ARGUMENT FORMATTING ---
  let formattedProxy = "";
  if (proxy && proxy.server) {
    let proxyUrl = proxy.server;
    let scheme = "";
    
    // Extract protocol scheme if present (e.g., http://, socks5://)
    const schemeMatch = proxyUrl.match(/^([a-zA-Z0-9+.-]+:\/\/)/);
    if (schemeMatch) {
      scheme = schemeMatch[1];
      proxyUrl = proxyUrl.substring(scheme.length);
    }
    
    // Handle wrapping of raw IPv6 hosts with port numbers in brackets
    if (proxyUrl.includes(":") && proxyUrl.split(":").length > 2 && !proxyUrl.startsWith("[")) {
      const lastColon = proxyUrl.lastIndexOf(":");
      const host = proxyUrl.substring(0, lastColon);
      const portPart = proxyUrl.substring(lastColon);
      if (/^:\d+$/.test(portPart)) {
        proxyUrl = `[${host}]${portPart}`;
      }
    }
    
    formattedProxy = scheme + proxyUrl;
  }

  let browser;
  let freshlySpawned = false;
  if (launchMethod === "puppeteer") {
      logger.log("Launching fresh browser via native Puppeteer...");
      const launchArgs = [
        `--window-size=${process.env[`${prefix}_WINDOW_SIZE`] || process.env.CHROME_WINDOW_SIZE || "900,1400"}`,
        `--window-position=${process.env[`${prefix}_WINDOW_POSITION`] || process.env.CHROME_WINDOW_POSITION || "100,50"}`,
        ...chrome.extraArgs
      ];
      if (formattedProxy) {
        launchArgs.push(`--proxy-server=${formattedProxy}`);
      }
      browser = await puppeteer.launch({
          headless: false,
          defaultViewport: null,
          ignoreHTTPSErrors: true,
          protocolTimeout: 30000,
          args: launchArgs,
      });
  } else {
      try {
        logger.log(`Checking if Chrome is already running on port ${chrome.remoteDebuggingPort}...`);
        browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${chrome.remoteDebuggingPort}`, defaultViewport: null });
        logger.log("Connected to existing Chrome instance.");
      } catch (e) {
        logger.log("Chrome not found on debugging port. Spawning new instance...");
        freshlySpawned = true;
        await killZombieChromeOnPort(chrome.remoteDebuggingPort, logger);
        await sleep(500);
        
        // Clean up stale lock file from previous force-killed sessions
        try {
          const lockFile = require("path").join(chrome.userDataDir, "lockfile");
          if (require("fs").existsSync(lockFile)) {
            require("fs").unlinkSync(lockFile);
            logger.log("Removed stale Chrome lock file.");
          }
        } catch (e) {}
        
        const chromeArgs = [
          `--remote-debugging-port=${chrome.remoteDebuggingPort}`,
          `--user-data-dir=${chrome.userDataDir}`,
          "--no-first-run", "--no-default-browser-check", "--mute-audio",
          `--window-size=${process.env[`${prefix}_WINDOW_SIZE`] || process.env.CHROME_WINDOW_SIZE || "900,1400"}`,
          `--window-position=${process.env[`${prefix}_WINDOW_POSITION`] || process.env.CHROME_WINDOW_POSITION || "100,50"}`,
          ...chrome.extraArgs,
        ];
        if (formattedProxy) {
          chromeArgs.push(`--proxy-server=${formattedProxy}`);
        }
        const chromeProcess = spawn(chrome.executablePath, chromeArgs, { detached: true, stdio: "ignore" });
        chromeProcess.unref();
        
        // Progressive backoff to wait for Chrome to start
        let connected = false;
        for (let attempt = 1; attempt <= 5; attempt++) {
            await sleep(2000 * attempt);
            try {
                browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${chrome.remoteDebuggingPort}`, defaultViewport: null });
                connected = true;
                break;
            } catch (err) {}
        }
        if (!connected) throw new Error("Failed to connect to newly spawned Chrome instance.");
      }
  }

  // --- TAILSCALE LIFECYCLE HOOK ---
  if (browser && tscProxy) {
    browser.tscProxy = tscProxy;
    browser.on('disconnected', async () => {
      logger.log("Browser disconnected, shutting down Tailscale proxy...");
      await tscProxy.close().catch(() => {});
    });
  }

  // --- GLOBAL EVENT-DRIVEN PROXY AUTHENTICATION ---
  if (browser && proxy && proxy.server && proxy.username && proxy.password) {
    logger.log("Setting up global proxy authentication listener...");
    
    // 1. Authenticate existing pages/tabs
    const pages = await browser.pages().catch(() => []);
    for (const p of pages) {
      await p.authenticate({ username: proxy.username, password: proxy.password })
        .catch((e) => logger.warn(`Proxy authentication failed on existing page: ${e.message}`));
    }

    // 2. Authenticate any newly created pages/tabs in the browser context dynamically
    browser.on('targetcreated', async (target) => {
      if (target.type() === 'page') {
        try {
          const p = await target.page();
          if (p) {
            await p.authenticate({ username: proxy.username, password: proxy.password })
              .catch((e) => logger.warn(`Proxy authentication failed on new page: ${e.message}`));
          }
        } catch (e) {
          // Ignore if target page is closed during initialization
        }
      }
    });
  }

  // --- VERIFY EXTERNAL PROXY IP ---
  if (useProxy) {
    verifiedIp = await verifyProxyIp({
      browser,
      proxy,
      label: acctConfig.label,
      logger,
      closeBrowserOnFailure: true
    });
  }

  if (platform === "hippo" || platform === "directurl" || platform === "direct_url") {
      logger.log(`Platform is ${platform}. Preparing Hippo page...`);
      let pages = await browser.pages();
      let page = pages.length > 0 ? pages[0] : await browser.newPage();
      
      const currentUrl = page.url() || "";
      const isAlreadyOnLobby = urls.pgLobby.some(domain => currentUrl.includes(domain)) && currentUrl.includes("multiplay");
      
      if (isAlreadyOnLobby) {
        logger.log("Browser is already on the Hippo multiplay page. Skipping navigation to avoid disrupting active session.");
      } else {
        logger.log("Navigating to Hippo multiplay lobby...");
        await page.goto("https://d3jai9eacl1740.cloudfront.net/lobby/multiplay", { timeout: TIMEOUTS.navigationWait }).catch(() => {});
      }
      
      await checkPGpage(page, logger);
      
      let finalChips = null;
      try {
        const filepath = require('path').resolve(__dirname, "..", "utils", "chips_balances.json");
        if (require('fs').existsSync(filepath)) {
          const balances = JSON.parse(require('fs').readFileSync(filepath, 'utf8'));
          if (balances[acctConfig.label]) {
            finalChips = balances[acctConfig.label];
          }
        }
      } catch (e) {}

      return { browser, page, ip: verifiedIp, chips: finalChips };
  }

  let chipsScraped = false;
  let hotroadAttempts = 0;
  let mainLoopRetries = 0;
  while (mainLoopRetries < 3) {
    mainLoopRetries++;
    let { state: currentState, page } = await evaluateState(browser, urls);
    
    if (!page) { 
        page = await browser.newPage(); 
        currentState = STATES.UNINITIALIZED; 
    }

    // If Chrome was freshly spawned (not reconnected), force full login flow.
    // This ensures chips are always scraped from the Hotroad dialog on the
    // Winbox dashboard, even if Chrome restored previous session tabs.
    if (freshlySpawned && currentState === STATES.IN_GAME) {
      logger.log("Chrome was freshly spawned but detected IN_GAME (session restored). Forcing full login flow...");
      // Close any restored game pages so we start clean
      const allPages = await browser.pages();
      for (const p of allPages) {
        const pUrl = p.url() || "";
        if (urls.pgLobby.some(domain => pUrl.includes(domain))) {
          await p.close().catch(() => {});
        }
      }
      page = (await browser.pages())[0] || await browser.newPage();
      currentState = STATES.UNINITIALIZED;
      freshlySpawned = false; // only force once
    }
    
    logger.log(`Initial state detected: ${currentState}`);
    
    try {
      let safetyCounter = 0;
      while (currentState !== STATES.IN_GAME && safetyCounter < 10) {
        safetyCounter++;
        logger.log(`Executing state: ${currentState}`);
        
        if (currentState === STATES.UNINITIALIZED) {
          logger.log("Navigating to login page...");
          // Initiate navigation in parallel
          page.goto(urls.login, { waitUntil: "domcontentloaded", timeout: TIMEOUTS.navigationWait }).catch((e) => {
            logger.warn(`Navigation goto notice: ${e.message}`);
          });

          // ── Poll evaluateState(browser, urls) concurrently to detect WINBOX_LOGIN / active state ──
          let detectedState = STATES.UNINITIALIZED;
          const pollStart = Date.now();
          let lastLogTime = 0;
          while (Date.now() - pollStart < 15000) {
            try {
              const check = await evaluateState(browser, urls);
              if (check.state !== STATES.UNINITIALIZED) {
                detectedState = check.state;
                currentState = check.state;
                if (check.page) page = check.page;
                logger.log(`[Navigation Poller] ✅ State transitioned: ${detectedState}`);
                break;
              }
            } catch (e) {}

            if (Date.now() - lastLogTime >= 2000) {
              lastLogTime = Date.now();
              logger.log(`[Navigation Poller] Polling for login state... (${Math.round((Date.now() - pollStart) / 1000)}s)`);
            }
            await sleep(400);
          }

          if (detectedState === STATES.UNINITIALIZED) {
            logger.warn("[3-Dot Loader] Still uninitialized after 15 seconds. Reloading page...");
            await page.reload({ waitUntil: "domcontentloaded", timeout: 30000 }).catch(() => {});
            await sleep(1500);

            const retryPollStart = Date.now();
            lastLogTime = 0;
            while (Date.now() - retryPollStart < 15000) {
              try {
                const check = await evaluateState(browser, urls);
                if (check.state !== STATES.UNINITIALIZED) {
                  detectedState = check.state;
                  currentState = check.state;
                  if (check.page) page = check.page;
                  logger.log(`[Navigation Poller] ✅ State transitioned after reload: ${detectedState}`);
                  break;
                }
              } catch (e) {}

              if (Date.now() - lastLogTime >= 2000) {
                lastLogTime = Date.now();
                logger.log(`[Navigation Poller] Polling after reload... (${Math.round((Date.now() - retryPollStart) / 1000)}s)`);
              }
              await sleep(400);
            }
          }

          if (detectedState === STATES.UNINITIALIZED) {
            logger.error("[3-Dot Loader] Still stuck on loading screen after reload. Restarting browser session...");
            if (browser && browser.isConnected()) {
              await browser.close().catch(() => {});
            }
            throw new Error("Winbox stuck on 3-dot loading screen even after reload. Browser session restarted.");
          }

          continue;

        } else if (currentState === STATES.WINBOX_LOGIN) {
          logger.log("Handling WINBOX_LOGIN...");

          let loginSuccess = false;
          for (let loginAttempt = 1; loginAttempt <= 3; loginAttempt++) {
            logger.log(`[WINBOX_LOGIN] Attempt ${loginAttempt}/3: Locating login form across frames...`);

            let loginFrame = null;
            let uidFound = false;

            // Step 1: Poll all frames/iframes for up to 15 seconds with active logging & timeouts
            const loginPollStart = Date.now();
            let lastSearchLog = 0;
            while (Date.now() - loginPollStart < 15000) {
              const elapsedSec = Math.round((Date.now() - loginPollStart) / 1000);
              if (Date.now() - lastSearchLog >= 2000) {
                lastSearchLog = Date.now();
                logger.log(`[WINBOX_LOGIN] Attempt ${loginAttempt}/3: Searching for login form across frames... (${elapsedSec}s)`);
              }

              for (const frame of page.frames()) {
                try {
                  if (frame.isDetached && frame.isDetached()) continue;
                  // Dismiss login popup button if present
                  const popupButtons = await withTimeout(frame.$$(SELECTORS.loginPopup), 2000, []);
                  if (popupButtons && popupButtons.length > 0) {
                    for (const btn of popupButtons) {
                      const text = await withTimeout(frame.evaluate((el) => el.textContent, btn), 1500, "");
                      if (/log\s*in|login|sign\s*in/i.test(text || "")) {
                        await withTimeout(btn.click(), 1500, null);
                        await sleep(500);
                        break;
                      }
                    }
                  }

                  // Check if UID input is present in this frame/iframe
                  const uidEl = await withTimeout(frame.$(SELECTORS.uid), 2000, null);
                  if (uidEl) {
                    loginFrame = frame;
                    uidFound = true;
                    break;
                  }
                } catch (e) {}
              }
              if (uidFound) break;
              await sleep(500);
            }

            // Step 2: If not found after 15 seconds, reload page and poll again
            if (!uidFound) {
              logger.warn(`[WINBOX_LOGIN] Attempt ${loginAttempt}/3: Login form not found across frames. Reloading page...`);
              await page.reload({ waitUntil: "domcontentloaded", timeout: 30000 }).catch(() => {});
              await sleep(2000);

              const retryPollStart = Date.now();
              lastSearchLog = 0;
              while (Date.now() - retryPollStart < 15000) {
                const elapsedSec = Math.round((Date.now() - retryPollStart) / 1000);
                if (Date.now() - lastSearchLog >= 2000) {
                  lastSearchLog = Date.now();
                  logger.log(`[WINBOX_LOGIN] Attempt ${loginAttempt}/3: Searching after reload... (${elapsedSec}s)`);
                }

                for (const frame of page.frames()) {
                  try {
                    if (frame.isDetached && frame.isDetached()) continue;
                    const popupButtons = await withTimeout(frame.$$(SELECTORS.loginPopup), 2000, []);
                    if (popupButtons && popupButtons.length > 0) {
                      for (const btn of popupButtons) {
                        const text = await withTimeout(frame.evaluate((el) => el.textContent, btn), 1500, "");
                        if (/log\s*in|login|sign\s*in/i.test(text || "")) {
                          await withTimeout(btn.click(), 1500, null);
                          await sleep(500);
                          break;
                        }
                      }
                    }

                    const uidEl = await withTimeout(frame.$(SELECTORS.uid), 2000, null);
                    if (uidEl) {
                      loginFrame = frame;
                      uidFound = true;
                      break;
                    }
                  } catch (e) {}
                }
                if (uidFound) break;
                await sleep(500);
              }
            }

            // Step 3: If STILL stuck on this attempt, retry navigation or fail
            if (!uidFound || !loginFrame) {
              logger.warn(`[WINBOX_LOGIN] Attempt ${loginAttempt}/3 failed to locate form.`);
              if (loginAttempt < 3) {
                logger.log(`[WINBOX_LOGIN] Re-navigating to login page for attempt ${loginAttempt + 1}...`);
                await page.goto(urls.login, { waitUntil: "domcontentloaded", timeout: 30000 }).catch(() => {});
                await sleep(2000);
                continue;
              } else {
                logger.error("[Winbox 3-Dot Loader] Still stuck on loading screen after all 3 attempts. Restarting browser session...");
                if (browser && browser.isConnected()) {
                  await browser.close().catch(() => {});
                }
                throw new Error("Winbox stuck on 3-dot loading screen across all attempts. Browser session restarted.");
              }
            }

            logger.log("[WINBOX_LOGIN] Login form located! Filling credentials...");
            await withTimeout(loginFrame.$eval(SELECTORS.uid, (el) => (el.value = "")), 2000, null);
            await withTimeout(loginFrame.click(SELECTORS.uid, { clickCount: 3 }), 2000, null);
            await page.keyboard.press("Backspace").catch(() => {});
            await withTimeout(loginFrame.type(SELECTORS.uid, credentials.email, { delay: 10 }), 5000, null);

            await withTimeout(loginFrame.$eval(SELECTORS.password, (el) => (el.value = "")), 2000, null);
            await withTimeout(loginFrame.click(SELECTORS.password, { clickCount: 3 }), 2000, null);
            await page.keyboard.press("Backspace").catch(() => {});
            await withTimeout(loginFrame.type(SELECTORS.password, credentials.password, { delay: 10 }), 5000, null);

            await sleep(500);

              // ── Multi-strategy login button click ──
              // Some SPAs ignore programmatic el.click(); we try multiple approaches.
              let buttonClicked = false;
              let loginBtnEl = null;
              const candidateSelectors = ["button", "input[type='submit']", "input[type='button']", "div[role='button']", "a", "span"];
              for (const candSel of candidateSelectors) {
                const elements = await withTimeout(loginFrame.$$(candSel), 2000, []);
                if (!elements || elements.length === 0) continue;
                for (const el of elements) {
                  const text = await withTimeout(loginFrame.evaluate((item) => item.textContent || item.value || "", el), 1000, "");
                  if (/log\s*in|login|sign\s*in/i.test((text || "").trim())) {
                    loginBtnEl = el;
                    buttonClicked = true;
                    break;
                  }
                }
                if (buttonClicked) break;
              }

              if (loginBtnEl) {
                const btnText = await withTimeout(loginFrame.evaluate((item) => (item.textContent || item.value || "").trim(), loginBtnEl), 1000, "Login");
                logger.log(`[WINBOX_LOGIN] Found login button ("${btnText}"). Clicking with multiple strategies...`);

                // Strategy 1: Puppeteer ElementHandle click
                logger.log("[WINBOX_LOGIN] Strategy 1: Puppeteer .click()...");
                await withTimeout(loginBtnEl.click(), 2000, null);
                await sleep(300);

                // Strategy 2: JavaScript DOM .click()
                logger.log("[WINBOX_LOGIN] Strategy 2: JS evaluate .click()...");
                await withTimeout(loginFrame.evaluate((el) => {
                  if (el && typeof el.click === "function") el.click();
                }, loginBtnEl), 2000, null);
                await sleep(300);

                // Strategy 3: Mouse click at element coordinates
                try {
                  const box = await withTimeout(loginBtnEl.boundingBox(), 1500, null);
                  if (box) {
                    logger.log(`[WINBOX_LOGIN] Strategy 3: Mouse click at (${Math.round(box.x + box.width / 2)}, ${Math.round(box.y + box.height / 2)})...`);
                    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
                    await sleep(300);
                  }
                } catch (e) {}

                await loginBtnEl.dispose().catch(() => {});
              } else {
                logger.log("[WINBOX_LOGIN] No matching login button found.");
              }

              // Strategy 4: Always press Enter as belt-and-suspenders
              logger.log("[WINBOX_LOGIN] Strategy 4: Pressing 'Enter' key...");
              await page.keyboard.press("Enter").catch(() => {});

              logger.log("Login submitted. Polling for state transition...");
              writeLoginTimestamp(acctConfig.label);

              // Poll frequently (every 500ms) with regular progress logging.
              // If still stuck after 5 seconds, re-click the button as a retry.
              const nextStatePollStart = Date.now();
              let lastPollLog = 0;
              let retriedClick = false;
              while (Date.now() - nextStatePollStart < 20000) {
                let nextCheck = { state: STATES.WINBOX_LOGIN };
                try {
                  nextCheck = await evaluateState(browser, urls);
                } catch (e) {}

                const elapsedSec = Math.round((Date.now() - nextStatePollStart) / 1000);
                if (Date.now() - lastPollLog >= 2000) {
                  lastPollLog = Date.now();
                  logger.log(`[WINBOX_LOGIN] Polling state (${elapsedSec}s)... Detected: ${nextCheck.state}`);
                }

                if (
                  nextCheck.state !== STATES.WINBOX_LOGIN &&
                  nextCheck.state !== STATES.UNINITIALIZED
                ) {
                  loginSuccess = true;
                  currentState = nextCheck.state;
                  if (nextCheck.page) page = nextCheck.page;
                  logger.log(`[WINBOX_LOGIN] ✅ State transitioned to: ${currentState}`);
                  break;
                }

                // After 5 seconds of no state change, retry clicking the login button
                if (!retriedClick && elapsedSec >= 5) {
                  retriedClick = true;
                  logger.log("[WINBOX_LOGIN] State still stuck after 5s. Re-clicking login button...");
                  try {
                    for (const frame of page.frames()) {
                      try {
                        if (frame.isDetached && frame.isDetached()) continue;
                        const retryBtns = await withTimeout(frame.$$("button"), 2000, []);
                        if (!retryBtns || retryBtns.length === 0) continue;
                        for (const btn of retryBtns) {
                          const text = await withTimeout(frame.evaluate((item) => (item.textContent || "").trim(), btn), 1000, "");
                          if (/log\s*in|login|sign\s*in/i.test(text || "")) {
                            logger.log(`[WINBOX_LOGIN] Re-click: Puppeteer .click() on "${text}"...`);
                            await withTimeout(btn.click(), 2000, null);
                            await sleep(200);
                            logger.log("[WINBOX_LOGIN] Re-click: JS .click()...");
                            await withTimeout(frame.evaluate((el) => el && el.click(), btn), 2000, null);
                            await sleep(200);
                            const box = await withTimeout(btn.boundingBox(), 1500, null);
                            if (box) {
                              logger.log(`[WINBOX_LOGIN] Re-click: Mouse click at (${Math.round(box.x + box.width / 2)}, ${Math.round(box.y + box.height / 2)})...`);
                              await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
                            }
                            await btn.dispose().catch(() => {});
                            break;
                          }
                        }
                      } catch (e) {}
                    }
                    await page.keyboard.press("Enter").catch(() => {});
                  } catch (e) {}
                }

                await sleep(500);
              }

            if (loginSuccess) {
              break;
            } else {
              if (loginAttempt < 3) {
                logger.warn(`[WINBOX_LOGIN] Login did not transition after submission (still in WINBOX_LOGIN). Re-navigating for attempt ${loginAttempt + 1}...`);
                await page.goto(urls.login, { waitUntil: "domcontentloaded", timeout: 30000 }).catch(() => {});
                await sleep(1500);
              } else {
                logger.warn(`[WINBOX_LOGIN] Login did not transition after all 3 attempts. Will fall through to state machine retry.`);
              }
            }
          }

          continue;
        } else if (currentState === STATES.GAME_NOT_QUIT) {
          logger.log("Handling GAME_NOT_QUIT...");
          let quitClicked = false;
          for (const frame of page.frames()) {
            try {
              quitClicked = await frame.evaluate(() => {
                const redName = document.querySelector('.name.red');
                if (redName && redName.textContent.trim() === 'Quit Game') {
                  const rect = redName.getBoundingClientRect();
                  if (rect.width > 0 && rect.height > 0) { redName.click(); return true; }
                }
                const elements = document.querySelectorAll('div, button, span, a');
                for (const el of elements) {
                  if (el.textContent.trim() === 'Quit Game' && el.children.length === 0) {
                    const rect = el.getBoundingClientRect();
                    if (rect.width > 0 && rect.height > 0) { el.click(); return true; }
                  }
                }
                return false;
              }).catch(() => false);

              if (quitClicked) {
                logger.log("Clicked 'Quit Game' element in frame. Waiting for exit confirmation dialog...");
                break;
              }
            } catch (e) {}
          }

          if (quitClicked) {
            await sleep(2000);
            let confirmClicked = false;
            for (const frame of page.frames()) {
              try {
                confirmClicked = await frame.evaluate(() => {
                  const box = document.querySelector(".el-message-box");
                  if (box) {
                    const text = box.innerText || "";
                    if (text.includes("Confirm exit") || text.includes("exit")) {
                      const okBtn = box.querySelector(".el-message-box__btns button.el-button--primary") ||
                                    box.querySelector(".el-message-box__btns button:last-child");
                      if (okBtn) { okBtn.click(); return true; }
                    }
                  }
                  return false;
                }).catch(() => false);
                if (confirmClicked) break;
              } catch (e) {}
            }
            if (confirmClicked) {
              logger.log("Clicked OK on the exit confirmation dialog.");
            } else {
              logger.warn("Exit confirmation dialog not found in any frame.");
            }
          }

          await sleep(4000);
          const nextResult = await evaluateState(browser, urls);
          currentState = nextResult.state;
          page = nextResult.page;
          continue;
        } else if (currentState === STATES.WINBOX_DASHBOARD) {
          logger.log("Handling WINBOX_DASHBOARD...");
          
          let dialogFrame = null;
          let isPGDialog = false;
          let isHRDialog = false;
          let hasQuit = false;
          let hasStart = false;
          let matchedButton = null;

          // Check if any Game Detail dialog is open
          for (const frame of page.frames()) {
            try {
              const buttons = await frame.$$("button");
              for (const button of buttons) {
                const text = await frame.evaluate((el) => el.textContent, button);
                if (text.trim().includes("Quit Game")) {
                  dialogFrame = frame;
                  hasQuit = true;
                  matchedButton = button;
                  break;
                } else if (text.trim().includes("Start Game")) {
                  dialogFrame = frame;
                  hasStart = true;
                  matchedButton = button;
                  break;
                }
              }
              if (dialogFrame) {
                // Determine if this is Pretty Gaming or Hotroad dialog.
                const gameIconSrc = await frame.evaluate(() => {
                  const img = document.querySelector('.game-icon img, .GameDetailTitleIcon img[src*="detail.png"]');
                  return img ? img.src : '';
                });
                if (gameIconSrc.includes('PRETY')) {
                  isPGDialog = true;
                } else {
                  isHRDialog = true;
                }
                break;
              }
            } catch (e) {}
          }

          if (dialogFrame) {
            if (isHRDialog) {
              logger.log("Hotroad dialog is open. Scraping chips balance...");
              // Scrape chips balance
              try {
                const scrapedChips = await dialogFrame.evaluate(() => {
                  const items = document.querySelectorAll('.wallet-balance-item');
                  for (const item of items) {
                    const labelEl = item.querySelector('.label');
                    if (labelEl && labelEl.textContent.includes('Chips')) {
                      const amountEl = item.querySelector('.amount');
                      if (amountEl) {
                        const innerDiv = amountEl.querySelector('div');
                        if (innerDiv) return innerDiv.textContent.trim();
                        return amountEl.textContent.trim();
                      }
                    }
                  }
                  return null;
                });
                if (scrapedChips) {
                  logger.log(`Parsed chips balance: ${scrapedChips}`);
                  
                  // Persist to json file
                  try {
                    const filepath = require('path').resolve(__dirname, "..", "utils", "chips_balances.json");
                    let balances = {};
                    if (require('fs').existsSync(filepath)) {
                      balances = JSON.parse(require('fs').readFileSync(filepath, 'utf8'));
                    }
                    balances[acctConfig.label] = scrapedChips;
                    require('fs').writeFileSync(filepath, JSON.stringify(balances, null, 2));
                  } catch (e) {
                    logger.error(`Error saving chips to JSON: ${e.message}`);
                  }
                }
              } catch (e) {
                logger.error(`Error scraping chips from Hotroad: ${e.message}`);
              }

              // Click the back button to close Hotroad dialog
              logger.log("Clicking back button to exit Hotroad dialog...");
              const clickedBack = await dialogFrame.evaluate(() => {
                const backBtn = document.querySelector('.back-icon, img[src*="wb-back-page"]');
                if (backBtn) {
                  backBtn.click();
                  return true;
                }
                return false;
              }).catch(() => false);

              if (clickedBack) {
                logger.log("Successfully clicked back button on Hotroad dialog.");
                chipsScraped = true;
                await sleep(3000);
              } else {
                logger.warn("Could not find back button on Hotroad dialog. Trying to go back directly...");
                const backBtn = await dialogFrame.$('.back-icon, img[src*="wb-back-page"]');
                if (backBtn) {
                  await backBtn.click();
                  chipsScraped = true;
                  await sleep(3000);
                } else {
                  logger.error("Failed to find back button. Reloading page...");
                  await page.reload();
                  await sleep(3000);
                }
              }
            } else if (isPGDialog) {
              if (!chipsScraped) {
                logger.log("PG dialog is open, but we have not scraped chips from Hotroad yet. Going back...");
                const clickedBack = await dialogFrame.evaluate(() => {
                  const backBtn = document.querySelector('.back-icon, img[src*="wb-back-page"]');
                  if (backBtn) { backBtn.click(); return true; }
                  return false;
                }).catch(() => false);
                if (!clickedBack) {
                  const backBtn = await dialogFrame.$('.back-icon, img[src*="wb-back-page"]');
                  if (backBtn) await backBtn.click();
                }
                await sleep(3000);
              } else {
                if (hasQuit) {
                  logger.log("Found 'Quit Game' button on PG dialog. Clicking to exit previous session...");
                  await matchedButton.click().catch(() => {});
                  await sleep(4000);
                } else if (hasStart) {
                  logger.log("Found 'Start Game' button on PG dialog. Clicking...");
                  const newTargetPromise = browser.waitForTarget((t) => t.opener() === page.target(), { timeout: TIMEOUTS.tabWait }).catch(() => null);
                  await matchedButton.click().catch(() => {});
                  
                  const newTarget = await newTargetPromise;
                  if (newTarget) {
                    page = await newTarget.page();
                    await sleep(2500);
                  }
                }
              }
            }
          } else {
            // No dialog is open.
            await sleep(1500);
            if (!chipsScraped) {
              if (hotroadAttempts >= 2) {
                logger.warn("Hotroad dialog failed to appear after multiple attempts. Defaulting to Pretty Gaming launch without scraping chips balance.");
                chipsScraped = true;
              } else {
                logger.log("No dialog open and chips not scraped. Attempting to click Hotroad icon to get balance...");
                let hotroadClicked = false;
                for (const frame of page.frames()) {
                  try {
                    const hrIcon = await frame.$('img[src*="ROAD/pc/cover"], img[src*="ROAD"]');
                    if (hrIcon) {
                      logger.log("Found Hotroad icon. Clicking...");
                      await hrIcon.click();
                      hotroadClicked = true;
                      break;
                    }
                  } catch (e) {}
                }
                if (hotroadClicked) {
                  logger.log("Waiting for Hotroad dialog to appear...");
                  hotroadAttempts++;
                  await sleep(3000);
                } else {
                  logger.warn("Could not find Hotroad icon. Defaulting to Pretty Gaming launch.");
                  chipsScraped = true; // Skip to prevent infinite loop
                }
              }
            } else {
              logger.log("Chips already scraped. Clicking Pretty Gaming icon...");
              let pgClicked = false;
              for (const frame of page.frames()) {
                try {
                  const pgIcon = await frame.$(SELECTORS.prettyGamingIcon);
                  if (pgIcon) {
                    logger.log("Found Pretty Gaming icon. Clicking...");
                    await pgIcon.click();
                    pgClicked = true;
                    break;
                  }
                } catch (e) {}
              }
              if (pgClicked) {
                logger.log("Waiting for PG dialog to appear...");
                await sleep(3000);
              } else {
                logger.warn("Could not find Pretty Gaming icon in dashboard.");
              }
            }
          }
        }
        
        await sleep(2000);
        let nextStateResult = await evaluateState(browser, urls);
        currentState = nextStateResult.state;
        if (nextStateResult.page && page !== nextStateResult.page) {
          page = nextStateResult.page;
        }
      }
      
      if (currentState === STATES.IN_GAME) {
        logger.log("SUCCESS: Reached Pretty Gaming lobby!");
        
        await checkPageErrors(page, logger);
        
        // Wait for the lobby to fully load and detect table data
        await checkPGpage(page, logger);
        
        const { startNetworkWatchdog } = require("./network_watchdog");
        startNetworkWatchdog(page, logger);
        
        let finalChips = null;
        try {
          const filepath = require('path').resolve(__dirname, "..", "utils", "chips_balances.json");
          if (require('fs').existsSync(filepath)) {
            const balances = JSON.parse(require('fs').readFileSync(filepath, 'utf8'));
            if (balances[acctConfig.label]) {
              finalChips = balances[acctConfig.label];
            }
          }
        } catch (e) {}

        return { browser, page, ip: verifiedIp, chips: finalChips };
      }
    } catch (err) {
      logger.error(`Error during launch/login attempt ${mainLoopRetries}: ${err.message}`);

      if (err.message.includes("3-dot loading screen")) {
        throw err;
      }

      if (page && !page.isClosed()) {
        logger.log("Closing the current page/tab to clean up...");
        await page.close().catch(() => {});
      }
      if (mainLoopRetries < 3) {
        logger.log("Retrying launch sequence with a new clean tab...");
        await sleep(3000);
      } else {
        throw err;
      }
    }
  }
  throw new Error("Failed to reach Pretty Gaming lobby after multiple attempts.");
}

module.exports = { launchAccount, buildAccountConfig, checkPageErrors };

if (require.main === module) {
  const accountIndex = parseInt(process.argv[2], 10) || 0;
  const acctConfig = buildAccountConfig(accountIndex);
  launchAccount(acctConfig).then(({ browser, page }) => {
    console.log("Successfully launched Pretty Gaming.");
  }).catch(e => {
    console.error(e);
    process.exit(1);
  });
}
