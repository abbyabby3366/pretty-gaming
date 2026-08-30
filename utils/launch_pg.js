/**
 * launch_pg.js — Launch Chrome and navigate to Pretty Gaming Baccarat via Winbox.
 * 
 * Powered by Winbox Automation Full Lifecycle (Referenced from launch_bg.js):
 * 1. Fast & Smart Login: If already authenticated, skips login; otherwise injects credentials with prototype setter & submits.
 * 2. OTP Verification Detection: Detects 'Account Verification' (.EmailVerificationRoot / .el-dialog), logs channel, and waits up to 10 mins.
 * 3. Games Dashboard Navigation: Ensures on https://h5.wbwin04.com/#/Home/Games via sidebar / hash.
 * 4. Fast & Safe Quit Game Handler: Snappy 250ms reactive polling for exit completion with proxy-safe settlement.
 * 5. Safe Category Switching: Switches to 'Live' tab with latency buffer for VPN/proxy asset loading.
 * 6. Locates Hotroad (ROAD cover), opens detail, scrapes Chips balance, and safely returns to Games list.
 * 7. Switches to 'Live' category, locates Pretty Gaming (PRETY cover), handles modal ('Quit Game' vs 'Start Game').
 * 8. Launches game tab, captures window, verifies redirect, and executes Pretty Gaming in-game handlers.
 */

require("dotenv").config({
  path: require("path").resolve(__dirname, "..", ".env"),
});
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const { spawn, exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec);
const { getBrowserArgs } = require("./browserArgs");
const { verifyProxyIp } = require("./proxy_verifier");
const { startNetworkWatchdog } = require("./network_watchdog");
const { checkPGpage } = require("./check_page_pg");

// ── Login timestamp persistence ──────────────────────────────
const LOGIN_TIMESTAMPS_FILE = path.resolve(__dirname, "login_timestamps.json");

function readLoginTimestamps() {
  try { return JSON.parse(fs.readFileSync(LOGIN_TIMESTAMPS_FILE, "utf8")); } catch (e) { return {}; }
}

function writeLoginTimestamp(label) {
  const timestamps = readLoginTimestamps();
  timestamps[label] = Date.now();
  try { fs.writeFileSync(LOGIN_TIMESTAMPS_FILE, JSON.stringify(timestamps, null, 2)); } catch (e) { }
  return timestamps[label];
}

function getLoginTimestamp(label) {
  return readLoginTimestamps()[label] || null;
}

function clearLoginTimestamp(label) {
  const timestamps = readLoginTimestamps();
  if (timestamps[label]) {
    delete timestamps[label];
    try {
      fs.writeFileSync(LOGIN_TIMESTAMPS_FILE, JSON.stringify(timestamps, null, 2));
    } catch (e) { }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Clean up background Chrome processes on remote debugging port
 */
async function killZombieChromeOnPort(port, logger = console) {
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
      } catch (e) { }
    }
  } catch (e) { }
}

const SELECTORS = {
  uid: 'input[type="text"], input[name="username"], input[placeholder*="Mobile"], input[placeholder*="ID"], input[placeholder*="UID" i]',
  password: 'input[type="password"]',
  loginPopup: ".winbox-login-popup-btn, button.winbox-login-popup-btn, .winbox-login-popup button",
  myNav: "#My-Nav, .home-header, .tabbar, .bck_color",
  prettyGamingIcon: 'img[src*="PRETY/pc/cover.png"], img[src*="gamelist/PRETY"], img[src*="PRETY"]',
  roadImg: 'img[src*="ROAD/pc/cover.png"], img[src*="gamelist/ROAD"], img[src*="ROAD"]',
  tabLive: 'img[src*="tablive"], img[src*="tablive_Active"]',
};

const TIMEOUTS = {
  initialWait: 1000,
  settleWait: 800,
  dashboardWait: 3000,
  navigationWait: 45000,
  selectorWait: 20000,
  tabWait: 35000,
  loginSla: 30000,
};

const URLS = {
  login: process.env.WINBOX_LOGIN_URL || "https://h5.wbwin04.com/#/Login",
  games: "https://h5.wbwin04.com/#/Home/Games",
  pgLobby: ["hippo168.com", "cloudfront.net"],
};

const STATES = {
  IN_GAME: "IN_GAME",
  IN_LOBBY: "IN_LOBBY",
  WINBOX_DASHBOARD: "WINBOX_DASHBOARD",
  WINBOX_LOGIN: "WINBOX_LOGIN",
  GAME_NOT_QUIT: "GAME_NOT_QUIT",
  UNINITIALIZED: "UNINITIALIZED",
};

/**
 * Build Account Configuration from JSON and .env
 */
function buildAccountConfig(accountIndex = 0, accountsFilePath, modulePrefix = "") {
  const accountsFile = accountsFilePath || path.resolve(__dirname, "..", "bet_module", "json", "bet_accounts.json");
  let accounts = [];
  try { accounts = JSON.parse(fs.readFileSync(accountsFile, "utf8")); }
  catch (err) { accounts = []; }

  const account = accounts[accountIndex] || { credentials: { email: process.env.WINBOX_EMAIL, password: process.env.WINBOX_PASSWORD } };

  let prefix = modulePrefix;
  if (!prefix) {
    prefix = accountsFile.includes("eyes_accounts") ? "EYES" : "BET";
  }

  const platform = account.platform || "winbox";
  const launchMethod = account.launchMethod || "connect";
  const baseProfileIndex = 9;
  const basePort = 9222;
  const profileIndex = account.profileIndex ?? baseProfileIndex + accountIndex;
  const port = account.debuggingPort ?? basePort + accountIndex;

  const rawProxy = account.proxy || {};
  const useProxy = account.useProxy !== undefined ? account.useProxy : !!rawProxy.server;

  // Clean raw paths from .env
  let rawUserDataDir = (process.env.CHROME_USER_DATA_DIR || "").replace(/^["']|["']$/g, "").trim();
  let rawExecutablePath = (process.env.CHROME_EXECUTABLE_PATH || "").replace(/^["']|["']$/g, "").trim();

  let resolvedUserDataDir;
  if (rawUserDataDir) {
    if (/Profile\s*\d+|Default/i.test(path.basename(rawUserDataDir))) {
      resolvedUserDataDir = rawUserDataDir;
    } else {
      resolvedUserDataDir = path.join(rawUserDataDir, `Profile ${profileIndex}`);
    }
  } else {
    resolvedUserDataDir = `C:\\Temp\\ChromeProfile_${profileIndex}`;
  }

  return {
    launchMethod,
    useProxy,
    accountIndex,
    modulePrefix: prefix,
    label: account.label || `Account ${accountIndex}`,
    platform,
    sessionRestartMinutes: account.sessionRestartMinutes || 0,
    evRange: account.evRange || null,
    enableDomCleanup: account.enableDomCleanup ?? false,
    chrome: {
      executablePath: rawExecutablePath || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      userDataDir: resolvedUserDataDir,
      remoteDebuggingPort: port,
      windowSize: process.env[`${prefix}_WINDOW_SIZE`] || process.env.CHROME_WINDOW_SIZE || "900,1400",
      windowPosition: process.env[`${prefix}_WINDOW_POSITION`] || process.env.CHROME_WINDOW_POSITION || "100,50",
      extraArgs: getBrowserArgs() || [],
    },
    proxy: useProxy ? rawProxy : {},
    credentials: {
      email: (account.credentials && (account.credentials.email || account.credentials.uid || account.credentials.username)) || process.env.WINBOX_EMAIL || process.env.WINBOX_UID,
      password: (account.credentials && account.credentials.password) || process.env.WINBOX_PASSWORD,
      ...(account.credentials || {}),
    },
    urls: URLS,
    selectors: SELECTORS,
    timeouts: TIMEOUTS,
    sourceFile: accountsFile,
  };
}

// ─────────────────────────────────────────────────────────────
// 🔐 WINBOX AUTOMATION CORE (Fully referred from launch_bg.js)
// ─────────────────────────────────────────────────────────────

/**
 * Detects and dismisses "Urgent notice" / "Got it" / Warm Tips / promotional popups
 */
async function dismissUrgentNotice(page, logger = console) {
  if (!page || page.isClosed()) return false;
  let dismissed = false;

  for (const frame of page.frames()) {
    try {
      if (frame.isDetached && frame.isDetached()) continue;

      dismissed = await frame.evaluate(() => {
        function triggerClick(el) {
          const btn = el.closest("button") || el.closest("a") || el.closest("[role='button']") || el;
          try {
            btn.scrollIntoView({ behavior: "instant", block: "center" });
            btn.click();
            btn.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }));
            btn.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true }));
            btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
            return true;
          } catch (e) { return false; }
        }

        // 1. "Got it" / "Gotit" buttons
        const candidates = Array.from(document.querySelectorAll("button, a, div[role='button'], div, span, p"));
        for (const el of candidates) {
          const txt = (el.textContent || "").trim().toLowerCase();
          if (txt === "got it" || txt === "gotit" || txt === "got  it" || txt === "confirm" || txt === "i know") {
            if (el.offsetWidth > 0 && el.offsetHeight > 0) {
              if (triggerClick(el)) return true;
            }
          }
        }

        // 2. Dialog close buttons (.el-dialog__headerbtn, .el-dialog__close, .van-popup__close-icon, .close-btn)
        const closeBtns = Array.from(document.querySelectorAll(".el-dialog__headerbtn, .el-dialog__close, .van-popup__close-icon, .close-btn, .dialog-close, button.close"));
        for (const c of closeBtns) {
          if (c.offsetWidth > 0 && c.offsetHeight > 0) {
            if (triggerClick(c)) return true;
          }
        }

        return false;
      }).catch(() => false);

      if (dismissed) {
        logger.log("[Notice] Dismissed popup / notice overlay.");
        await sleep(400);
        return true;
      }
    } catch (e) {}
  }
  return dismissed;
}

/**
 * Check and dismiss error overlays on page (e.g. session timeout, maintenance)
 */
async function checkPageErrors(page, logger = console) {
  try {
    await dismissUrgentNotice(page, logger);
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
    }).catch(() => ({ found: false }));

    if (errorState && errorState.found) {
      logger.warn(`Found page error modal: "${errorState.text}" (Clicked confirm: ${errorState.clicked})`);
    }
  } catch (e) {}
}

/**
 * Wait for any loading spinner to disappear and page to settle (proxy-resilient)
 */
async function waitForPageToSettle(page, waitExtraMs = 1000) {
  await dismissUrgentNotice(page);
  for (let i = 0; i < 25; i++) {
    let isBusy = false;
    for (const frame of page.frames()) {
      try {
        if (frame.isDetached && frame.isDetached()) continue;
        isBusy = await frame.evaluate(() => {
          const loader = document.querySelector('div[role="status"][aria-busy="true"]') ||
                         document.querySelector('.loading-overlay, .el-loading-mask, .van-loading');
          if (!loader) return false;
          const style = window.getComputedStyle(loader);
          return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
        }).catch(() => false);
        if (isBusy) break;
      } catch (e) {}
    }
    if (!isBusy) break;
    await sleep(300);
  }
  await sleep(waitExtraMs);
}

/**
 * Check for OTP Verification Modal and handle if present
 */
async function handleOtpVerification(page, maxWaitSec = 600, logger = console) {
  for (const frame of page.frames()) {
    try {
      if (frame.isDetached && frame.isDetached()) continue;

      const otpInfo = await frame.evaluate(() => {
        const dialog = document.querySelector(".EmailVerificationRoot, .el-dialog");
        if (!dialog) return null;

        const text = dialog.innerText || "";
        const isOtp = text.includes("Account Verification") ||
                      text.includes("Verify by OTP") ||
                      text.includes("Request OTP") ||
                      !!document.querySelector('input[placeholder*="Please enter OTP"]');

        if (!isOtp) return null;

        const activeTab = document.querySelector(".el-tabs__item.is-active");
        const channel = activeTab ? activeTab.innerText.trim() : "Unknown";
        const hasOtpInput = !!document.querySelector('input[placeholder*="Please enter OTP"]');
        const hasRequestBtn = !!document.querySelector("button.sendBtn");

        return {
          detected: true,
          channel,
          hasOtpInput,
          hasRequestBtn
        };
      }).catch(() => null);

      if (otpInfo && otpInfo.detected) {
        logger.log(`\n=======================================================`);
        logger.log(`🔐 [OTP Detected] Winbox Account Verification is required!`);
        logger.log(`   Verification Channel: ${otpInfo.channel}`);
        logger.log(`   Waiting for OTP verification completion (up to 10 mins)...`);
        logger.log(`=======================================================\n`);

        const startWait = Date.now();
        let lastLogSec = 0;
        while (Date.now() - startWait < maxWaitSec * 1000) {
          await sleep(1500);

          const elapsedSec = Math.round((Date.now() - startWait) / 1000);
          if (elapsedSec - lastLogSec >= 30) {
            lastLogSec = elapsedSec;
            const remainingMin = Math.ceil((maxWaitSec - elapsedSec) / 60);
            logger.log(`[OTP] ⏳ Waiting for OTP in Chrome... (${elapsedSec}s elapsed, ~${remainingMin} min remaining)`);
          }

          // Check if OTP dialog has closed and redirected to dashboard/games
          const isResolved = await page.evaluate(() => {
            const hasDialog = !!document.querySelector(".EmailVerificationRoot");
            const hasOtpInput = !!document.querySelector('input[placeholder*="Please enter OTP"]');
            const hasCovers = !!document.querySelector('img[src*="cover"], img[src*="ROAD"], img[src*="PRETY"]');
            const url = window.location.href || "";
            return (!hasDialog && !hasOtpInput) || hasCovers || url.includes("Home");
          }).catch(() => false);

          if (isResolved) {
            logger.log(`\n[OTP] ✅ OTP Verification completed! Resuming automated flow...`);
            await waitForPageToSettle(page, 2000);
            return true;
          }
        }

        logger.warn(`[OTP] ⚠️ OTP verification wait timed out after ${maxWaitSec} seconds.`);
        return false;
      }
    } catch (e) {}
  }
  return false;
}

/**
 * Smart Login: Checks if already logged in, injects credentials, and detects OTP if prompted
 */
async function smartLogin(page, credentials, urls, labelPrefix, logger = console) {
  const loginUrl = (urls && urls.login) || URLS.login;
  logger.log(`[Step 1] Checking authentication state (${loginUrl})...`);
  await page.goto(loginUrl, { waitUntil: "networkidle2", timeout: 45000 }).catch((e) => {
    logger.warn(`[Step 1] Navigation warning: ${e.message}`);
  });
  await sleep(1000);

  // Check if already logged in (redirected to dashboard/games)
  const isAlreadyLoggedIn = await page.evaluate(() => {
    const hasPasswordInput = !!document.querySelector('input[type="password"]');
    const hasGamesOrNav = !!document.querySelector('img[src*="cover"], img[src*="tablive"], .sidebar-item, li');
    return !hasPasswordInput && hasGamesOrNav;
  }).catch(() => false);

  if (isAlreadyLoggedIn) {
    logger.log("[Step 1] ✅ Already logged in to Winbox.");
    writeLoginTimestamp(labelPrefix);
    return;
  }

  logger.log("[Step 1] Injecting credentials...");
  await page.waitForSelector('input[type="password"]', { timeout: 20000 });

  const uidVal = credentials.email || credentials.uid || credentials.username || "";
  const pwdVal = credentials.password || "";

  await page.evaluate((uVal, pVal) => {
    function setFieldValue(predicate, val) {
      const inputs = Array.from(document.querySelectorAll("input"));
      const el = inputs.find(predicate);
      if (!el) return false;
      el.focus();
      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
      if (nativeSetter) nativeSetter.call(el, val);
      else el.value = val;
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
      el.dispatchEvent(new Event("blur", { bubbles: true }));
      return el.value === val;
    }
    setFieldValue((i) => /UID|Email|username/i.test(i.placeholder || i.name || "") || i.type === "text", uVal);
    setFieldValue((i) => i.type === "password" || /password/i.test(i.placeholder || ""), pVal);
  }, uidVal, pwdVal);

  await sleep(400);
  logger.log("[Step 1] Submitting login form...");
  await page.evaluate(() => {
    const submitBtn = Array.from(document.querySelectorAll("button, div[role='button'], div, span")).find((el) => {
      const txt = (el.textContent || "").trim().toLowerCase();
      return txt === "log in" && !el.className.includes("Telegram") && el.offsetWidth > 0 && el.offsetHeight > 0;
    });
    if (submitBtn) submitBtn.click();
  });
  await page.keyboard.press("Enter").catch(() => {});
  logger.log("[Step 1] ✅ Form submitted.");
  writeLoginTimestamp(labelPrefix);
  await waitForPageToSettle(page, 2000);

  // Check for OTP verification modal
  await handleOtpVerification(page, 600, logger);
}

/**
 * Navigate / Verify we are on the main Games page (https://h5.wbwin04.com/#/Home/Games)
 */
async function ensureOnGamesPage(page, timeoutMs = 20000, logger = console) {
  const startTime = Date.now();

  while (Date.now() - startTime < timeoutMs) {
    for (const frame of page.frames()) {
      try {
        if (frame.isDetached && frame.isDetached()) continue;

        const isGamesPage = await frame.evaluate(() => {
          const hasCovers = !!document.querySelector('img[src*="cover"], img[src*="ROAD"], img[src*="PRETY"]');
          const hasCategoryTabs = !!document.querySelector('img[src*="taball"], img[src*="tablive"], img[src*="tabslots"]');
          return hasCovers || hasCategoryTabs;
        }).catch(() => false);

        if (isGamesPage) {
          return true;
        }

        // Click sidebar Games item or switch hash
        await frame.evaluate(() => {
          const lis = Array.from(document.querySelectorAll('li, .sidebar-item, .nav-item'));
          const gamesLi = lis.find(li => (li.innerText || "").trim() === "Games" || (li.innerText || "").includes("Games"));
          if (gamesLi) {
            gamesLi.click();
          } else {
            window.location.hash = "#/Home/Games";
          }
        }).catch(() => {});

      } catch (e) {}
    }
    await sleep(500);
  }
  return false;
}

/**
 * Switch to the 'Live' category tab on the dashboard and verify it becomes active
 */
async function switchToLiveCategory(page, logger = console) {
  logger.log("[Category] Switching to 'Live' casino category tab...");
  let switched = false;

  for (let attempt = 1; attempt <= 12; attempt++) {
    for (const frame of page.frames()) {
      try {
        if (frame.isDetached && frame.isDetached()) continue;

        switched = await frame.evaluate(() => {
          function triggerClick(el) {
            el.scrollIntoView({ behavior: "instant", block: "center" });
            el.click();
            try {
              el.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, cancelable: true }));
              el.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, cancelable: true }));
              el.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
            } catch (e) {}
          }

          const liveImg = document.querySelector('img[src*="tablive"], img[src*="tablive_Active"]');
          if (liveImg) {
            const item = liveImg.closest('.item, div') || liveImg;
            triggerClick(item);
            triggerClick(liveImg);
            return true;
          }

          const items = Array.from(document.querySelectorAll('.item, div[class*="tab"]'));
          const liveItem = items.find((el) => {
            const txt = (el.innerText || el.textContent || "").trim();
            return txt === "Live" && el.offsetWidth > 0 && el.offsetHeight > 0;
          });
          if (liveItem) {
            triggerClick(liveItem);
            return true;
          }

          return false;
        }).catch(() => false);

        if (switched) {
          await sleep(800); // Safe buffer for VPN/proxy asset rendering
          logger.log("[Category] ✅ Switched to 'Live' casino category tab.");
          break;
        }
      } catch (e) {}
    }
    if (switched) break;
    await sleep(400);
  }
  return switched;
}

/**
 * Fast & Safe Quit Game Handler
 */
async function handleBannerQuitGame(page, logger = console) {
  logger.log("[Step 2] Checking for active game session ('Quit Game' banner)...");
  await sleep(800);

  for (const frame of page.frames()) {
    try {
      if (frame.isDetached && frame.isDetached()) continue;

      const quitClicked = await frame.evaluate(() => {
        const redQuit = document.querySelector('.name.red, .Gaming .name.red, .Gaming .red');
        if (redQuit && (redQuit.textContent || "").includes("Quit Game")) {
          const rect = redQuit.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            redQuit.click();
            return true;
          }
        }
        return false;
      }).catch(() => false);

      if (quitClicked) {
        logger.log("[Step 2] ⚠️ Active game session detected. Clicked '<div class=\"name red\">Quit Game</div>'...");
        await sleep(800);

        // Confirm exit dialog
        await frame.evaluate(() => {
          const box = document.querySelector(".el-message-box, .swal2-container, .dialog-container");
          if (box) {
            const okBtn = box.querySelector(".el-message-box__btns button.el-button--primary") ||
                          box.querySelector(".el-message-box__btns button:last-child") ||
                          Array.from(box.querySelectorAll("button")).find(b => /ok|confirm|yes/i.test(b.textContent || ""));
            if (okBtn) okBtn.click();
          }
        }).catch(() => {});

        logger.log("[Step 2] Confirmed exit on dialog. Waiting for session release...");

        // Polling until .name.red and exit modal are gone
        for (let wait = 0; wait < 40; wait++) {
          await sleep(250);
          const stillExiting = await frame.evaluate(() => {
            const hasRedQuit = !!document.querySelector('.name.red, .Gaming .name.red, .Gaming .red');
            const hasModal = !!document.querySelector('.el-message-box, .swal2-container');
            const hasSpinner = !!document.querySelector('div[role="status"][aria-busy="true"], .loading-overlay, .el-loading-mask');
            return hasRedQuit || hasModal || hasSpinner;
          }).catch(() => false);

          if (!stillExiting) {
            logger.log("[Step 2] ✅ Previous session cleared successfully!");
            break;
          }
        }

        await sleep(800); // Settle buffer
        await ensureOnGamesPage(page, 20000, logger);
        return true;
      }
    } catch (e) {}
  }
  logger.log("[Step 2] No active session banner detected.");
  return false;
}

/**
 * Step 3 & 4: Open Hotroad (ROAD), scrape Chips balance, and return safely to Games page
 */
async function scrapeHotroadChipsAndReturn(page, acctConfig, logger = console) {
  logger.log("[Step 3] Locating and clicking Hotroad (ROAD) cover icon...");
  let detailOpened = false;

  for (let attempt = 1; attempt <= 15; attempt++) {
    for (const frame of page.frames()) {
      try {
        if (frame.isDetached && frame.isDetached()) continue;

        const clicked = await frame.evaluate(() => {
          function triggerClick(el) {
            el.scrollIntoView({ behavior: "instant", block: "center" });
            el.click();
            try {
              el.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, cancelable: true }));
              el.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, cancelable: true }));
              el.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
            } catch (e) {}
          }

          const hrImg = document.querySelector('img[src*="ROAD/pc/cover.png"], img[src*="gamelist/ROAD"], img[src*="ROAD"]');
          if (hrImg) {
            const parent = hrImg.closest(".item, .gameItem, .coverbox, div") || hrImg;
            triggerClick(parent);
            triggerClick(hrImg);
            return true;
          }
          return false;
        }).catch(() => false);

        if (clicked) {
          logger.log(`[Step 3] Clicked Hotroad icon (Attempt ${attempt}). Waiting for detail page...`);
          await sleep(1500);

          const isDetail = await frame.evaluate(() => {
            const hasDetailText = (document.body.innerText || "").includes("HOTROAD") || (document.body.innerText || "").includes("Chips");
            const hasDetailIcon = !!document.querySelector('.GameDetailTitleIcon, img[src*="ROAD/pc/detail.png"], .banner-slide');
            return hasDetailText || hasDetailIcon;
          }).catch(() => false);

          if (isDetail) {
            logger.log("[Step 3] ✅ Hotroad detail page loaded!");
            detailOpened = true;
            break;
          }
        }
      } catch (e) {}
    }
    if (detailOpened) break;
    await sleep(500);
  }

  if (!detailOpened) {
    logger.warn("[Step 3] ⚠️ Hotroad detail page did not load. Proceeding to Pretty Gaming...");
    return null;
  }

  // Scrape Chips balance
  let scrapedChips = null;
  for (let wait = 0; wait < 25; wait++) {
    await sleep(300);
    for (const frame of page.frames()) {
      try {
        if (frame.isDetached && frame.isDetached()) continue;
        scrapedChips = await frame.evaluate(() => {
          const items = document.querySelectorAll(".wallet-balance-item");
          for (const item of items) {
            const labelEl = item.querySelector(".label");
            if (labelEl && (labelEl.textContent || "").includes("Chips")) {
              const amountEl = item.querySelector(".amount");
              if (amountEl) {
                const innerDiv = amountEl.querySelector("div");
                return innerDiv ? innerDiv.textContent.trim() : amountEl.textContent.trim();
              }
            }
          }

          const bodyText = document.body.innerText || "";
          const match = bodyText.match(/Chips[^\d]*([\d,]+\.?\d*)/i);
          if (match && match[1]) return match[1];

          return null;
        }).catch(() => null);

        if (scrapedChips) break;
      } catch (e) {}
    }
    if (scrapedChips) break;
  }

  if (scrapedChips) {
    logger.log(`[Step 3] 💰 Hotroad Chips Balance Scraped: ${scrapedChips}`);
    try {
      const filepath = path.resolve(__dirname, "..", "utils", "chips_balances.json");
      let balances = {};
      if (fs.existsSync(filepath)) {
        balances = JSON.parse(fs.readFileSync(filepath, "utf8"));
      }
      balances[acctConfig.label] = scrapedChips;
      fs.writeFileSync(filepath, JSON.stringify(balances, null, 2));
    } catch (e) {
      logger.error(`Error saving chips to JSON: ${e.message}`);
    }
  }

  await sleep(800);

  // Step 4: Safely return to Games page by clicking left sidebar Games item
  logger.log("[Step 4] Returning to Games page via Left Sidebar 'Games' item...");
  await page.evaluate(() => {
    const lis = Array.from(document.querySelectorAll('li, .sidebar-item, .nav-item'));
    const gamesLi = lis.find(li => (li.innerText || "").trim() === "Games" || (li.innerText || "").includes("Games"));
    if (gamesLi) {
      gamesLi.click();
    } else {
      window.location.hash = "#/Home/Games";
    }
  });

  await waitForPageToSettle(page, 800);
  await ensureOnGamesPage(page, 20000, logger);
  logger.log("[Step 4] ✅ Confirmed back on Games Dashboard.");

  return scrapedChips;
}

/**
 * Step 5 & 6: Switch to Live category, click Pretty Gaming (PRETY), and launch game tab
 */
async function launchPrettyGaming(browser, page, logger = console) {
  // Ensure we are in the 'Live' category
  await switchToLiveCategory(page, logger);

  logger.log("[Step 5] Locating and clicking Pretty Gaming (PRETY) icon in Live category...");
  let pgOpened = false;

  for (let attempt = 1; attempt <= 20; attempt++) {
    for (const frame of page.frames()) {
      try {
        if (frame.isDetached && frame.isDetached()) continue;

        const clicked = await frame.evaluate(() => {
          function triggerClick(el) {
            el.scrollIntoView({ behavior: "instant", block: "center" });
            el.click();
            try {
              el.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, cancelable: true }));
              el.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, cancelable: true }));
              el.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
            } catch (e) {}
          }

          const pgImg = document.querySelector('img[src*="PRETY/pc/cover.png"], img[src*="gamelist/PRETY"], img[src*="PRETY"]');
          if (pgImg) {
            const parent = pgImg.closest(".item, .gameItem, .coverbox, div") || pgImg;
            triggerClick(parent);
            triggerClick(pgImg);
            return true;
          }
          return false;
        }).catch(() => false);

        if (clicked) {
          logger.log(`[Step 5] Clicked Pretty Gaming (Attempt ${attempt}). Checking for modal...`);
          await sleep(1200);

          const hasModal = await frame.evaluate(() => {
            const btns = Array.from(document.querySelectorAll("button"));
            return btns.some((b) => (b.textContent || "").includes("Start Game") || (b.textContent || "").includes("Quit Game") || (b.textContent || "").includes("Play Game") || (b.textContent || "").includes("Launch Game"));
          }).catch(() => false);

          if (hasModal) {
            logger.log("[Step 5] ✅ Pretty Gaming modal opened!");
            pgOpened = true;
            break;
          }
        }
      } catch (e) {}
    }
    if (pgOpened) break;
    await sleep(500);
  }

  if (!pgOpened) {
    throw new Error("Pretty Gaming cover icon / modal could not be opened.");
  }

  // Step 6: Handle Pretty Gaming modal ('Quit Game' vs 'Start Game')
  logger.log("[Step 6] Checking Pretty Gaming modal buttons...");
  let gamePage = null;

  for (let loop = 1; loop <= 3; loop++) {
    for (const frame of page.frames()) {
      try {
        if (frame.isDetached && frame.isDetached()) continue;
        const buttons = await frame.$$("button");
        for (const button of buttons) {
          const text = (await frame.evaluate((el) => el.textContent, button) || "").trim();

          if (text.includes("Quit Game")) {
            logger.log("[Step 6] Modal has 'Quit Game'. Clicking to clear previous room session...");
            await button.click().catch(() => {});
            await waitForPageToSettle(page, 2000);
            await ensureOnGamesPage(page, 20000, logger);
            await switchToLiveCategory(page, logger);

            // Re-click Pretty Gaming icon
            const pgIcon = await frame.$('img[src*="PRETY/pc/cover.png"], img[src*="gamelist/PRETY"], img[src*="PRETY"]');
            if (pgIcon) await pgIcon.click();
            await sleep(1200);
            break;
          } else if (text.includes("Start Game") || text.includes("Play Game") || text.includes("Launch Game")) {
            logger.log("[Step 6] Found 'Start Game' button. Launching game tab...");
            const newTargetPromise = browser.waitForTarget((t) => (
              t.opener() === page.target() ||
              t.url().includes("hippo168") ||
              t.url().includes("cloudfront.net") ||
              t.url().includes("pretty") ||
              t.url().includes("lobby")
            ), { timeout: 35000 }).catch(() => null);
            await button.click().catch(() => {});

            const newTarget = await newTargetPromise;
            if (newTarget) {
              gamePage = await newTarget.page();
              logger.log("[Step 6] ✅ Captured new game tab!");
            }
            break;
          }
        }
      } catch (e) {}
    }
    if (gamePage) break;
    await sleep(800);
  }

  return gamePage;
}

// ─────────────────────────────────────────────────────────────
// 🚀 MAIN ACCOUNT LAUNCHER
// ─────────────────────────────────────────────────────────────

async function launchAccount(acctConfig) {
  const logger = {
    log: (msg) => console.log(`[${acctConfig.label}] ${msg}`),
    warn: (msg) => console.warn(`[${acctConfig.label}] ⚠️ ${msg}`),
    error: (msg) => console.error(`[${acctConfig.label}] ❌ ${msg}`),
  };

  const { chrome, proxy, useProxy, urls, credentials, platform, launchMethod, modulePrefix } = acctConfig;
  const cdpUrl = `http://127.0.0.1:${chrome.remoteDebuggingPort}`;

  let tscProxy = null;
  let formattedProxy = null;

  if (useProxy && proxy && proxy.server) {
    let proxyUrl = proxy.server;
    let scheme = "http://";
    if (proxyUrl.includes("://")) {
      const parts = proxyUrl.split("://");
      scheme = parts[0] + "://";
      proxyUrl = parts[1];
    }

    if (proxyUrl.toLowerCase().includes("ts.net")) {
      try {
        const { createTailscaleProxy } = require("./tailscale_proxy");
        const localPort = 10000 + acctConfig.accountIndex;
        tscProxy = await createTailscaleProxy(proxyUrl, localPort);
        proxyUrl = `127.0.0.1:${localPort}`;
        scheme = "http://";
      } catch (e) {
        logger.warn(`Tailscale proxy creation notice: ${e.message}`);
      }
    }

    formattedProxy = scheme + proxyUrl;
  }

  let browser = null;
  try {
    logger.log(`Checking if Chrome is already running on port ${chrome.remoteDebuggingPort}...`);
    browser = await puppeteer.connect({ browserURL: cdpUrl, defaultViewport: null });
    logger.log("Connected to existing Chrome instance.");
  } catch (e) {
    logger.log("Chrome not found on debugging port. Spawning new instance...");
    await killZombieChromeOnPort(chrome.remoteDebuggingPort, logger);
    await sleep(500);

    if (!fs.existsSync(chrome.userDataDir)) {
      fs.mkdirSync(chrome.userDataDir, { recursive: true });
    }

    try {
      const lockFile = path.join(chrome.userDataDir, "lockfile");
      if (fs.existsSync(lockFile)) {
        fs.unlinkSync(lockFile);
        logger.log("Removed stale Chrome lock file.");
      }
    } catch (e) {}

    const chromeArgs = [
      `--remote-debugging-port=${chrome.remoteDebuggingPort}`,
      `--user-data-dir=${chrome.userDataDir}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--mute-audio",
      `--window-size=${chrome.windowSize || "900,1400"}`,
      `--window-position=${chrome.windowPosition || "100,50"}`,
      ...chrome.extraArgs,
    ];
    if (formattedProxy) {
      chromeArgs.push(`--proxy-server=${formattedProxy}`);
    }

    const chromeProcess = spawn(chrome.executablePath, chromeArgs, { detached: true, stdio: "ignore" });
    chromeProcess.unref();

    for (let attempt = 1; attempt <= 15; attempt++) {
      await sleep(700);
      try {
        browser = await puppeteer.connect({ browserURL: cdpUrl, defaultViewport: null });
        logger.log("✅ Connected to visible Chrome successfully.");
        break;
      } catch (err) {}
    }

    if (!browser) {
      throw new Error(`Failed to connect to Chrome on port ${chrome.remoteDebuggingPort}`);
    }
  }

  if (browser && tscProxy) {
    browser.tscProxy = tscProxy;
    browser.on("disconnected", async () => {
      logger.log("Browser disconnected, shutting down Tailscale proxy...");
      await tscProxy.close().catch(() => {});
    });
  }

  if (browser && proxy && proxy.server && proxy.username && proxy.password) {
    logger.log("Setting up global proxy authentication listener...");
    const pages = await browser.pages().catch(() => []);
    for (const p of pages) {
      await p.authenticate({ username: proxy.username, password: proxy.password })
        .catch((e) => logger.warn(`Proxy auth failed on page: ${e.message}`));
    }
    browser.on("targetcreated", async (target) => {
      if (target.type() === "page") {
        try {
          const p = await target.page();
          if (p) await p.authenticate({ username: proxy.username, password: proxy.password });
        } catch (e) {}
      }
    });
  }

  let verifiedIp = "";
  if (useProxy) {
    verifiedIp = await verifyProxyIp({
      browser,
      proxy,
      label: acctConfig.label,
      logger,
      closeBrowserOnFailure: true,
    });
  }

  // ─────────────────────────────────────────────────────────────
  // 🎮 PRETTY GAMING DIRECT / HIPPO PLATFORM HANDLER
  // ─────────────────────────────────────────────────────────────
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
      const filepath = path.resolve(__dirname, "..", "utils", "chips_balances.json");
      if (fs.existsSync(filepath)) {
        const balances = JSON.parse(fs.readFileSync(filepath, "utf8"));
        if (balances[acctConfig.label]) {
          finalChips = balances[acctConfig.label];
        }
      }
    } catch (e) {}

    return {
      browser,
      page,
      ip: verifiedIp,
      lastLoginTime: getLoginTimestamp(acctConfig.label),
      chips: finalChips
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 🔐 WINBOX AUTOMATED LIFECYCLE (Pretty Gaming Target)
  // ─────────────────────────────────────────────────────────────
  for (let attempt = 1; attempt <= 3; attempt++) {
    let mainPage = null;
    let gamePage = null;
    try {
      const pages = await browser.pages();
      mainPage = pages.length > 0 ? pages[0] : await browser.newPage();

      // 1. Smart Login + OTP Detection
      await smartLogin(mainPage, credentials, urls, acctConfig.label, logger);

      // Ensure we are on Games page
      await ensureOnGamesPage(mainPage, 20000, logger);

      // 2. Clear Active Game Session if present
      await handleBannerQuitGame(mainPage, logger);

      // Switch to Live category
      await switchToLiveCategory(mainPage, logger);

      // 3 & 4. Scrape Hotroad Chips and Return to Games Dashboard
      const scrapedChips = await scrapeHotroadChipsAndReturn(mainPage, acctConfig, logger);

      // 5 & 6. Launch Pretty Gaming from Live category
      gamePage = await launchPrettyGaming(browser, mainPage, logger);

      if (!gamePage) {
        // Look for existing game tab if target capture was already open
        const allPages = await browser.pages();
        for (const p of allPages) {
          const pUrl = p.url() || "";
          if (urls.pgLobby.some((domain) => pUrl.includes(domain))) {
            gamePage = p;
            break;
          }
        }
      }

      if (!gamePage) {
        throw new Error("Failed to open or capture Pretty Gaming game tab.");
      }

      logger.log("Waiting dynamically for game tab to redirect to Pretty Gaming URL...");
      const startRedirect = Date.now();
      let redirected = false;
      while (Date.now() - startRedirect < 30000) {
        const currentUrl = (gamePage.url() || "").toLowerCase();
        const isBridgePage = currentUrl.includes("jumptoapp") || currentUrl.includes("wbwin04.com");
        if (!isBridgePage && (urls.pgLobby.some((domain) => currentUrl.includes(domain.toLowerCase())) || currentUrl.includes("hippo168") || currentUrl.includes("cloudfront.net"))) {
          redirected = true;
          break;
        }
        await sleep(1000);
      }
      if (redirected) {
        logger.log(`Redirect detected successfully: ${gamePage.url()}`);
      } else {
        logger.warn("Redirect timed out, proceeding anyway.");
      }

      logger.log("SUCCESS: Reached Pretty Gaming lobby!");
      await checkPageErrors(gamePage, logger);

      // ─────────────────────────────────────────────────────────
      // 🎮 PRETTY GAMING IN-GAME ENGINE (Preserved 100% untouched)
      // ─────────────────────────────────────────────────────────
      await checkPGpage(gamePage, logger);

      startNetworkWatchdog(gamePage, logger);

      let finalChips = scrapedChips;
      if (!finalChips) {
        try {
          const filepath = path.resolve(__dirname, "..", "utils", "chips_balances.json");
          if (fs.existsSync(filepath)) {
            const balances = JSON.parse(fs.readFileSync(filepath, "utf8"));
            if (balances[acctConfig.label]) {
              finalChips = balances[acctConfig.label];
            }
          }
        } catch (e) {}
      }

      return {
        browser,
        page: gamePage,
        ip: verifiedIp,
        lastLoginTime: getLoginTimestamp(acctConfig.label),
        chips: finalChips,
      };

    } catch (err) {
      logger.error(`Error during launch/login attempt ${attempt}: ${err.message}`);
      if (attempt < 3) {
        logger.log("Retrying launch sequence in 3s...");
        await sleep(3000);
      } else {
        throw err;
      }
    }
  }

  throw new Error(`Failed to launch and reach Pretty Gaming after 3 attempts.`);
}

async function closeAllBrowsers() {
  console.log("closeAllBrowsers called.");
}

module.exports = {
  launchAccount,
  closeAllBrowsers,
  buildAccountConfig,
  getLoginTimestamp,
  writeLoginTimestamp,
  clearLoginTimestamp,
  checkPageErrors,
  smartLogin,
  handleOtpVerification,
  dismissUrgentNotice,
  waitForPageToSettle,
  STATES,
  URLS,
  SELECTORS,
  TIMEOUTS,
};

if (require.main === module) {
  const acctIndex = parseInt(process.env.ACCOUNT_INDEX || "0", 10);
  const acctConfig = buildAccountConfig(acctIndex);
  launchAccount(acctConfig)
    .then((res) => {
      console.log("\n=======================================================");
      console.log("🎉 Standalone Pretty Gaming Launch Successful!");
      console.log(`   IP: ${res.ip}`);
      console.log(`   Chips: ${res.chips || "N/A"}`);
      console.log("=======================================================\n");
    })
    .catch((err) => {
      console.error("❌ Standalone Launch Failed:", err.message);
    });
}
