/**
 * launch_pg.js - Launch Chrome, login to Winbox, and navigate to Pretty Gaming.
 * Patterned after launch_bet.js from hotroad_learn.
 */

require("dotenv").config({ path: require("path").resolve(__dirname, "..", ".env") });
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");
const { getBrowserArgs } = require("./browserArgs");

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
  uid: 'input[placeholder="Enter UID / Email"]',
  password: 'input[placeholder="Enter password"]',
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

function buildAccountConfig(accountIndex = 0, accountsFilePath) {
  const accountsFile = accountsFilePath || path.resolve(__dirname, "..", "bet_module", "json", "bet_accounts.json");
  let accounts = [];
  try { accounts = JSON.parse(fs.readFileSync(accountsFile, "utf8")); } catch (err) {}
  
  const account = accounts[accountIndex] || { credentials: { email: process.env.WINBOX_EMAIL, password: process.env.WINBOX_PASSWORD } };
  
  const platform = account.platform || "winbox";
  const launchMethod = account.launchMethod || "connect";
  const baseProfileIndex = 9; // Adjust as needed
  const basePort = 9222;
  const profileIndex = account.profileIndex ?? baseProfileIndex + accountIndex;
  const port = account.debuggingPort ?? basePort + accountIndex;

  return {
    accountIndex,
    label: account.label || `Account ${accountIndex}`,
    platform,
    launchMethod,
    enableDomCleanup: account.enableDomCleanup ?? false,
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
      login: "https://login.winboxmalay.com/",
      pgLobby: ["hippo168.com", "cloudfront.net"] // Supports both direct URL and Winbox CloudFront redirect
    },
  };
}

const STATES = {
  IN_GAME: "IN_GAME",
  WINBOX_DASHBOARD: "WINBOX_DASHBOARD",
  WINBOX_LOGIN: "WINBOX_LOGIN",
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

      // Check if we reached the pretty gaming lobby
      if (urls.pgLobby.some(domain => url.includes(domain))) {
        return { state: STATES.IN_GAME, page: p };
      }

      let isDashboard = false;
      let isLogin = false;

      for (const frame of p.frames()) {
        try {
          if (await frame.$(SELECTORS.myNav).catch(() => null)) isDashboard = true;
          if (await frame.$(SELECTORS.uid).catch(() => null) ||
              await frame.$$(SELECTORS.loginPopup).then(el => el.length > 0).catch(() => false)) isLogin = true;
        } catch (e) {}
      }

      if (isDashboard) {
        if (bestState === STATES.UNINITIALIZED || bestState === STATES.WINBOX_LOGIN) {
          bestState = STATES.WINBOX_DASHBOARD;
          targetPage = p;
        }
      } else if (isLogin || url.includes(urls.login)) {
        if (bestState === STATES.UNINITIALIZED) {
          bestState = STATES.WINBOX_LOGIN;
          targetPage = p;
        }
      }
    } catch (e) {}
  }
  return { state: bestState, page: targetPage };
}

async function handlePGWelcomeAndMultiplay(page, logger) {
  // 1. Wait for and click Confirm/Continue
  try {
    await page.waitForFunction(() => {
      const btns = Array.from(document.querySelectorAll(".clickActive"));
      const confirmBtn = btns.find((el) => el.innerText && (el.innerText.includes("Confirm") || el.innerText.includes("Continue")));
      if (confirmBtn) { confirmBtn.click(); return true; }
      return false;
    }, { timeout: 8000 });
    logger.log("Clicked 'Confirm/Continue' on Welcome modal.");
  } catch (err) {}
  
  // 2. Wait for and click Multiplay
  try {
    await sleep(1000); // Give it a moment after Confirm
    await page.waitForFunction(() => {
      // Find by class and text, or by image src
      const btns = Array.from(document.querySelectorAll(".btn-lobby, .clickActive"));
      const multiBtn = btns.find(el => el.innerText && el.innerText.includes("Multiplay")) 
                    || document.querySelector('img[src*="game_multi.svg"]')?.closest('.clickActive');
      
      if (multiBtn) { multiBtn.click(); return true; }
      return false;
    }, { timeout: 10000 });
    logger.log("Clicked 'Multiplay' button.");
  } catch (err) {
    logger.warn("Could not find 'Multiplay' button within timeout.");
  }
}

async function launchAccount(acctConfig) {
  const { chrome, credentials, urls, platform, launchMethod } = acctConfig;
  const logger = { log: (msg) => console.log(`[${acctConfig.label}] ${msg}`), warn: (msg) => console.warn(`[${acctConfig.label}] ${msg}`), error: (msg) => console.error(`[${acctConfig.label}] ${msg}`) };

  if (platform === "winbox" && (!credentials.email || !credentials.password)) {
      throw new Error("Missing Winbox credentials. Please set WINBOX_EMAIL and WINBOX_PASSWORD in .env");
  }

  let browser;
  if (launchMethod === "puppeteer") {
      logger.log("Launching fresh browser via native Puppeteer...");
      browser = await puppeteer.launch({
          headless: false,
          defaultViewport: null,
          protocolTimeout: 30000,
          args: chrome.extraArgs,
      });
  } else {
      try {
        logger.log(`Checking if Chrome is already running on port ${chrome.remoteDebuggingPort}...`);
        browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${chrome.remoteDebuggingPort}`, defaultViewport: null });
        logger.log("Connected to existing Chrome instance.");
      } catch (e) {
    logger.log("Chrome not found on debugging port. Spawning new instance...");
    const chromeArgs = [
      `--remote-debugging-port=${chrome.remoteDebuggingPort}`,
      `--user-data-dir=${chrome.userDataDir}`,
      "--no-first-run", "--no-default-browser-check", "--mute-audio",
      ...chrome.extraArgs,
    ];
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

  if (platform === "hippo" || platform === "directurl" || platform === "direct_url") {
      logger.log(`Platform is ${platform}. Using simple navigation to Hippo...`);
      let pages = await browser.pages();
      let page = pages.length > 0 ? pages[0] : await browser.newPage();
      
      await page.goto("https://hippo168.com/lobby/multiplay", { waitUntil: "networkidle2", timeout: TIMEOUTS.navigationWait }).catch(() => {});
      
      await handlePGWelcomeAndMultiplay(page, logger);
      
      return { browser, page };
  }

  let mainLoopRetries = 0;
  while (mainLoopRetries < 3) {
    mainLoopRetries++;
    let { state: currentState, page } = await evaluateState(browser, urls);
    
    if (!page) { 
        page = await browser.newPage(); 
        currentState = STATES.UNINITIALIZED; 
    }
    
    logger.log(`Initial state detected: ${currentState}`);
    
    let safetyCounter = 0;
    while (currentState !== STATES.IN_GAME && safetyCounter < 10) {
      safetyCounter++;
      logger.log(`Executing state: ${currentState}`);
      
      if (currentState === STATES.UNINITIALIZED) {
        logger.log("Navigating to winboxmalay...");
        await page.goto(urls.login, { waitUntil: "networkidle2", timeout: TIMEOUTS.navigationWait }).catch(() => {});
        await sleep(1500);
      } else if (currentState === STATES.WINBOX_LOGIN) {
        logger.log("Handling WINBOX_LOGIN...");
        for (const frame of page.frames()) {
          try {
            const popupBtns = await frame.$$(SELECTORS.loginPopup);
            for (const btn of popupBtns) {
              if ((await frame.evaluate(el => el.textContent, btn)).includes("Log In")) {
                await btn.click(); await sleep(500); break;
              }
            }
          } catch(e) {}
        }
        
        let loginFrame = page;
        for (const frame of page.frames()) if (await frame.$(SELECTORS.uid).catch(()=>null)) { loginFrame = frame; break; }
        
        await loginFrame.$eval(SELECTORS.uid, el => el.value = "").catch(() => {});
        await loginFrame.type(SELECTORS.uid, credentials.email, { delay: 10 });
        await loginFrame.$eval(SELECTORS.password, el => el.value = "").catch(() => {});
        await loginFrame.type(SELECTORS.password, credentials.password, { delay: 10 });
        await sleep(500);
        
        const buttons = await loginFrame.$$("button");
        for (const button of buttons) {
          if ((await loginFrame.evaluate(el => el.textContent, button)).includes("Log In")) {
            await button.click(); break;
          }
        }
        logger.log("Login submitted. Waiting for dashboard...");
        writeLoginTimestamp(acctConfig.label);
        await sleep(TIMEOUTS.dashboardWait);
      } else if (currentState === STATES.WINBOX_DASHBOARD) {
        logger.log("Handling WINBOX_DASHBOARD...");
        
        let dialogHandled = false;
        for (const frame of page.frames()) {
          try {
            const buttons = await frame.$$("button");
            let action = null;
            let matchedButton = null;

            for (const button of buttons) {
              const text = await frame.evaluate((el) => el.textContent, button);
              if (text.trim().includes("Quit Game")) {
                matchedButton = button;
                action = "quit";
                break;
              } else if (text.trim().includes("Start Game")) {
                matchedButton = button;
                action = "start";
                break;
              }
            }

            if (action === "quit") {
              logger.log("Found 'Quit Game' button. Clicking to exit previous session...");
              await matchedButton.click().catch(() => {});
              await sleep(4000);
              dialogHandled = true;
            } else if (action === "start") {
              logger.log("Found 'Start Game' button. Clicking...");
              const newTargetPromise = browser.waitForTarget((t) => t.opener() === page.target(), { timeout: TIMEOUTS.tabWait }).catch(() => null);
              await matchedButton.click().catch(() => {});
              
              const newTarget = await newTargetPromise;
              if (newTarget) {
                page = await newTarget.page();
                await sleep(2500);
              }
              dialogHandled = true;
            }
          } catch (e) {}
          if (dialogHandled) break;
        }

        if (!dialogHandled) {
          let gameClicked = false;
          
          // Wait for dashboard to settle
          await sleep(1500);
          
          // Find and click the Pretty Gaming icon
          for (const frame of page.frames()) {
            try {
              const pgIcon = await frame.$(SELECTORS.prettyGamingIcon);
              if (pgIcon) {
                logger.log("Found Pretty Gaming icon. Clicking...");
                await pgIcon.click();
                gameClicked = true;
                break;
              }
            } catch(e) {}
            if (gameClicked) break;
          }
          
          if (gameClicked) {
             logger.log("Waiting for game dialog to appear...");
             await sleep(3000); 
          } else {
             logger.warn("Could not find Pretty Gaming icon in dashboard.");
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
      
      await handlePGWelcomeAndMultiplay(page, logger);
      
      return { browser, page };
    }
  }
  throw new Error("Failed to reach Pretty Gaming lobby after multiple attempts.");
}

module.exports = { launchAccount, buildAccountConfig };

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
