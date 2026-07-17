/**
 * unified_launcher.js - Per-account launch mode manager.
 * 
 * Reads bet_accounts.json for accounts with "run": true, then fetches
 * each account's mode ("bet" or "wash") from the Central Dashboard API.
 *
 * - "bet" accounts are spawned directly via PG's server.js
 * - "wash" accounts are synced to Hotroad's bet_accounts.json and spawned
 *   via Hotroad's launcher.js
 *
 * Polls the Central Dashboard every 10 seconds and hot-swaps individual accounts
 * when their mode changes.
 */

const { spawn, exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const util = require("util");
const execAsync = util.promisify(exec);
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const ACCOUNTS_FILE = path.resolve(__dirname, "json", "bet_accounts.json");
const BASE_PORT = parseInt(process.env.BET_PORT || "4001", 10);
const CENTRAL_URL = process.env.CENTRAL_URL || "http://127.0.0.1:3456";
const POLL_INTERVAL_MS = 10000; // 10 seconds
const KILL_TIMEOUT_MS = 3000;

// Hotroad config (from wash.js)
const defaultHotroadPath = path.resolve(__dirname, '..', 'hotroad-v4');
const hotroadPath = process.env.HOTROAD_PATH
  ? path.resolve(__dirname, '..', process.env.HOTROAD_PATH)
  : defaultHotroadPath;

// Track per-account state: { mode, child, port }
const accountState = new Map(); // key: originalIndex (number)
let lastKnownModes = {}; // cache to handle Central server downtime
let pollTimer = null;

// Helper to determine remote debugging port for an account
function getAccountPort(acct) {
  const basePort = 9222;
  return acct.debuggingPort ?? (basePort + acct.originalIndex);
}

// Helper to kill any Chrome instance running on a remote debugging port
async function killChromeOnPort(port) {
  const targetFlag = `--remote-debugging-port=${port}`;
  console.log(`[Unified] Force-killing any Chrome instances on debugging port ${port}...`);
  try {
    const psCommand = `Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'chrome.exe' -and $_.CommandLine -like '*${targetFlag}*' -and $_.CommandLine -notlike '*--type=*' } | Select-Object -ExpandProperty ProcessId`;
    const { stdout } = await execAsync(
      `powershell -NoProfile -NonInteractive -Command "${psCommand}"`,
      { encoding: "utf8", timeout: 10000 }
    );
    const pids = stdout.split(/\r?\n/).map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n) && n > 0);
    for (const pid of pids) {
      console.log(`[Unified] Killing Chrome PID ${pid}...`);
      await execAsync(`taskkill /PID ${pid} /F /T`, { timeout: 5000 }).catch(() => { });
    }
  } catch (e) {
    console.error(`[Unified] Error killing Chrome on port ${port}:`, e.message);
  }
}

// Helper to close all page tabs in Chrome to force fresh launch and relogin
async function closeAllTabs(port) {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/json/list`).catch(() => null);
    if (!res) return; // Chrome not running/responsive on this port

    const tabs = await res.json().catch(() => []);
    if (!Array.isArray(tabs)) return;

    for (const tab of tabs) {
      if (!tab.id) continue;
      // Close all 'page' type targets
      if (tab.type === "page") {
        console.log(`[Unified] 🧹 Closing tab on port ${port}: ${tab.title || tab.url}`);
        await fetch(`http://127.0.0.1:${port}/json/close/${tab.id}`).catch(() => { });
      }
    }
  } catch (err) {
    console.error(`[Unified] Error closing tabs on port ${port}:`, err.message);
  }
}

// ──────────────────────────────────────────────
// Read accounts from bet_accounts.json
// ──────────────────────────────────────────────
function readAccounts() {
  try {
    const accounts = JSON.parse(fs.readFileSync(ACCOUNTS_FILE, "utf-8"));
    return accounts
      .map((acct, index) => ({ ...acct, originalIndex: index }))
      .filter(acct => acct.run === true);
  } catch (err) {
    console.error(`[Unified] Failed to read ${ACCOUNTS_FILE}:`, err.message);
    return [];
  }
}

// ──────────────────────────────────────────────
// Fetch per-account modes from Central Dashboard via HTTP
// ──────────────────────────────────────────────
async function fetchModes() {
  try {
    const url = `${CENTRAL_URL}/api/launch-mode`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    lastKnownModes = data.accounts || {};
    return lastKnownModes;
  } catch (err) {
    console.warn(`[Unified] Warning: Failed to fetch launch modes from Central (${err.message}). Using last known modes.`);
    return lastKnownModes;
  }
}

function getAccountMode(modes, index) {
  const mode = modes[String(index)];
  if (mode === "bet" || mode === "wash") return mode;
  return "bet"; // default
}

// ──────────────────────────────────────────────
// Kill a single child process
// ──────────────────────────────────────────────
function killChild(child) {
  return new Promise((resolve) => {
    if (!child || child.exitCode !== null) return resolve();

    const forceTimer = setTimeout(() => {
      try { child.kill("SIGKILL"); } catch (e) { /* dead */ }
      resolve();
    }, KILL_TIMEOUT_MS);

    child.once("exit", () => {
      clearTimeout(forceTimer);
      resolve();
    });

    try { child.kill("SIGTERM"); } catch (e) { resolve(); }
  });
}

// ──────────────────────────────────────────────
// Spawn a PG bet module for an account
// ──────────────────────────────────────────────
function spawnBetAccount(acct, port) {
  const label = acct.label || `Account ${acct.originalIndex}`;
  console.log(`\x1b[36m[Unified] ▶ Spawning ${label} on PG (port ${port})\x1b[0m`);

  const childEnv = {
    ...process.env,
    BET_PORT: String(port),
    ACCOUNT_INDEX: String(acct.originalIndex),
  };

  const child = spawn("node", [path.join(__dirname, "server.js")], {
    env: childEnv,
    stdio: ["ignore", "pipe", "pipe"],
  });

  const prefix = `[${label}]`;

  child.stdout.on("data", (data) => {
    const lines = data.toString().split("\n").filter(l => l.length > 0);
    for (const line of lines) {
      process.stdout.write(`${prefix} ${line}\n`);
    }
  });

  child.stderr.on("data", (data) => {
    const lines = data.toString().split("\n").filter(l => l.length > 0);
    for (const line of lines) {
      process.stderr.write(`${prefix} ${line}\n`);
    }
  });

  child.on("exit", (code) => {
    const state = accountState.get(acct.originalIndex);
    // Only log if not being intentionally killed for a mode switch
    if (state && state.child === child) {
      console.error(`${prefix} Process exited with code ${code}`);
    }
  });

  return child;
}

// ──────────────────────────────────────────────
// Build a stripped env for Hotroad (same as wash.js)
// ──────────────────────────────────────────────
function buildHotroadEnv() {
  function getEnvKeys(envPath) {
    if (!fs.existsSync(envPath)) return [];
    const content = fs.readFileSync(envPath, 'utf-8');
    const keys = [];
    const lines = content.split(/\r?\n/);
    for (let line of lines) {
      line = line.trim();
      if (!line || line.startsWith('#')) continue;
      const match = line.match(/^([^=]+)=/);
      if (match) keys.push(match[1].trim());
    }
    return keys;
  }

  const pgEnvPath = path.join(__dirname, '..', '.env');
  const pgEnvKeys = getEnvKeys(pgEnvPath);
  const childEnv = { ...process.env };
  for (const key of pgEnvKeys) {
    if (key !== 'HOTROAD_PATH') delete childEnv[key];
  }
  return childEnv;
}

function readHotroadEnvFile() {
  const hrEnvPath = path.resolve(hotroadPath, '.env');
  if (!fs.existsSync(hrEnvPath)) return {};
  try {
    const content = fs.readFileSync(hrEnvPath, 'utf-8');
    const env = {};
    const lines = content.split(/\r?\n/);
    for (let line of lines) {
      line = line.trim();
      if (!line || line.startsWith('#')) continue;
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        env[match[1].trim()] = match[2].trim();
      }
    }
    return env;
  } catch (err) {
    console.error(`[Unified] Failed to read Hotroad .env file:`, err.message);
    return {};
  }
}


// ──────────────────────────────────────────────
// Sync wash accounts to Hotroad and spawn Hotroad launcher
// ──────────────────────────────────────────────
let hotroadChild = null;
let currentWashIndices = []; // track which accounts are on wash

function syncAndSpawnHotroad(washAccounts, allAccounts, portMap) {
  if (!fs.existsSync(hotroadPath)) {
    console.error(`[Unified] Error: Hotroad directory not found at ${hotroadPath}`);
    return null;
  }

  const hotroadLauncher = path.resolve(hotroadPath, 'bet_module', 'launcher.js');
  if (!fs.existsSync(hotroadLauncher)) {
    console.error(`[Unified] Error: Hotroad launcher not found at ${hotroadLauncher}`);
    return null;
  }

  // Build a bet_accounts.json for Hotroad with only the wash accounts
  // Each wash account gets run: true, others get run: false
  const hotroadAccounts = allAccounts.map((acct, idx) => {
    const isWash = washAccounts.some(w => w.originalIndex === idx);
    return { ...acct, run: isWash };
  });

  const targetDir = path.resolve(hotroadPath, 'bet_module', 'json');
  const targetFile = path.resolve(targetDir, 'bet_accounts.json');

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log(`[Unified] Writing ${washAccounts.length} wash account(s) to Hotroad bet_accounts.json`);
  fs.writeFileSync(targetFile, JSON.stringify(hotroadAccounts, null, 2));

  // Spawn Hotroad launcher
  console.log(`\x1b[33m[Unified] ▶ Spawning Hotroad launcher for wash accounts\x1b[0m`);
  const childEnv = buildHotroadEnv();

  // Read Hotroad's .env file as a fallback
  const hrEnv = readHotroadEnvFile();

  // Override port & base URL so this doesn't conflict with standalone Hotroad.
  // Configure via PG's .env: WASH_BET_PORT, WASH_BET_BASE_URL
  const washPort = process.env.WASH_BET_PORT || hrEnv.BET_PORT || "5001";
  childEnv.BET_PORT = washPort;
  childEnv.BET_MODULE_BASE_URL = process.env.WASH_BET_BASE_URL || hrEnv.BET_MODULE_BASE_URL || `http://127.0.0.1:${washPort}`;

  const child = spawn('node', [hotroadLauncher], {
    cwd: hotroadPath,
    stdio: 'inherit',
    env: childEnv
  });

  child.on('exit', (code) => {
    if (hotroadChild === child) {
      console.log(`[Unified] Hotroad launcher exited with code ${code}`);
      hotroadChild = null;
    }
  });

  return child;
}

// ──────────────────────────────────────────────
// Main orchestration: launch/relaunch accounts
// ──────────────────────────────────────────────
async function reconcile() {
  const allAccountsRaw = JSON.parse(fs.readFileSync(ACCOUNTS_FILE, "utf-8"));
  const runnableAccounts = readAccounts();
  const modes = await fetchModes();

  if (runnableAccounts.length === 0) {
    console.error("[Unified] No accounts with \"run\": true found in bet_accounts.json");
    return;
  }

  const betAccounts = [];
  const washAccounts = [];
  const newWashIndices = [];

  // Assign ports: each runnable account gets a sequential port
  for (let i = 0; i < runnableAccounts.length; i++) {
    const acct = runnableAccounts[i];
    const port = BASE_PORT + i;
    const mode = getAccountMode(modes, acct.originalIndex);

    if (mode === "wash") {
      washAccounts.push(acct);
      newWashIndices.push(acct.originalIndex);
    } else {
      betAccounts.push({ acct, port });
    }
  }

  // Handle PG bet accounts
  for (const { acct, port } of betAccounts) {
    const existing = accountState.get(acct.originalIndex);
    if (existing && existing.mode === "bet" && existing.child && existing.child.exitCode === null) {
      // Already running in correct mode, skip
      continue;
    }

    // Kill existing if mode changed (wash → bet)
    if (existing && existing.child) {
      const label = acct.label || `Account ${acct.originalIndex}`;
      console.log(`\x1b[35m[Unified] ⚡ ${label}: wash → bet\x1b[0m`);
      await killChild(existing.child);

      // Send a "goodbye" heartbeat to HR Central so the module disappears immediately
      const hrEnv = readHotroadEnvFile();
      const hrCentralUrl = hrEnv.CENTRAL_URL;
      if (hrCentralUrl) {
        // The Hotroad bet module registers on HR Central with moduleId = account label
        const goodbyePayload = {
          moduleId: label,
          baseUrl: `http://127.0.0.1:0`,
          label: label,
          accountIndex: acct.originalIndex,
          accounts: [{ label: label, isAcceptingBets: false, balance: null }],
          isShuttingDown: true
        };
        fetch(`${hrCentralUrl}/api/bet-module/heartbeat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(goodbyePayload)
        }).catch(() => { });
        console.log(`[Unified] Sent goodbye heartbeat to HR Central (${hrCentralUrl}) for ${label}`);
      }

      // Force kill the Chrome browser for this port
      const chromePort = getAccountPort(acct);
      await killChromeOnPort(chromePort);
      await new Promise(r => setTimeout(r, 1000));
    }

    // Close all tabs in Chrome to force fresh launch and relogin
    const chromePort = getAccountPort(acct);
    await closeAllTabs(chromePort);

    const child = spawnBetAccount(acct, port);
    accountState.set(acct.originalIndex, { mode: "bet", child, port });
  }

  // Handle wash accounts — check if the wash set changed
  const washChanged = JSON.stringify(newWashIndices.sort()) !== JSON.stringify(currentWashIndices.sort());

  if (washChanged) {
    // Kill existing Hotroad launcher if running
    if (hotroadChild) {
      console.log(`[Unified] Restarting Hotroad launcher (wash accounts changed)...`);
      await killChild(hotroadChild);
      hotroadChild = null;
    }

    // Kill any PG children that are switching to wash
    for (const acct of washAccounts) {
      const existing = accountState.get(acct.originalIndex);
      if (existing && existing.mode === "bet" && existing.child) {
        const label = acct.label || `Account ${acct.originalIndex}`;
        console.log(`\x1b[35m[Unified] ⚡ ${label}: bet → wash\x1b[0m`);
        await killChild(existing.child);

        // Force kill the Chrome browser for this port
        const chromePort = getAccountPort(acct);
        await killChromeOnPort(chromePort);
        await new Promise(r => setTimeout(r, 1000));
      }
      accountState.set(acct.originalIndex, { mode: "wash", child: null, port: null });
    }

    if (washAccounts.length > 0) {
      // Close all tabs in Chrome to force fresh launch and relogin for all wash accounts
      for (const acct of washAccounts) {
        const chromePort = getAccountPort(acct);
        await closeAllTabs(chromePort);
      }
      hotroadChild = syncAndSpawnHotroad(washAccounts, allAccountsRaw, null);
    }

    currentWashIndices = [...newWashIndices];
  }

  // Clean up state for accounts that are no longer runnable
  for (const [idx, state] of accountState) {
    if (!runnableAccounts.some(a => a.originalIndex === idx)) {
      if (state.child) await killChild(state.child);
      accountState.delete(idx);
    }
  }

  // Send heartbeats on behalf of wash-mode accounts so they stay
  // visible on the Central Dashboard instead of going stale.
  for (const acct of washAccounts) {
    const label = acct.label || `Account ${acct.originalIndex}`;
    const payload = {
      moduleId: `wash-${label.replace(/\s+/g, "")}-${acct.originalIndex}`,
      baseUrl: `http://127.0.0.1:0`, // placeholder — not routable
      label: label,
      accountIndex: acct.originalIndex,
      isWashMode: true,
      accounts: [{ label: label, isAcceptingBets: false, balance: null, isWashMode: true }]
    };
    fetch(`${CENTRAL_URL}/api/bet-module/heartbeat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).catch(() => { }); // fire-and-forget
  }
}

// ──────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────
(async function main() {
  const runnableAccounts = readAccounts();

  if (runnableAccounts.length === 0) {
    console.error("[Unified] No accounts with \"run\": true found in bet_accounts.json");
    process.exit(1);
  }

  // Reset all launch modes back to PG (bet) on startup
  try {
    await fetch(`${CENTRAL_URL}/api/launch-mode/reset`, {
      method: "POST",
      signal: AbortSignal.timeout(3000)
    }).catch(() => { });
  } catch (e) { /* ignore */ }

  const modes = await fetchModes();

  console.log(`\x1b[36m[Unified] Starting unified launcher — ${runnableAccounts.length} account(s)\x1b[0m`);
  console.log(`[Unified] Polling Central Dashboard (${CENTRAL_URL}) every ${POLL_INTERVAL_MS / 1000}s for mode changes.`);

  runnableAccounts.forEach(acct => {
    const mode = getAccountMode(modes, acct.originalIndex);
    console.log(`  • ${acct.label || `Account ${acct.originalIndex}`} → ${mode === "wash" ? "Hotroad" : "PG"}`);
  });
  console.log("");

  // Initial launch
  await reconcile().catch(err => console.error("[Unified] Initial reconcile error:", err));

  // Poll for changes
  pollTimer = setInterval(() => {
    reconcile().catch(err => console.error("[Unified] Reconcile error:", err));
  }, POLL_INTERVAL_MS);
})();

// ──────────────────────────────────────────────
// Graceful shutdown
// ──────────────────────────────────────────────
async function cleanup() {
  console.log("\n[Unified] Shutting down all processes...");
  clearInterval(pollTimer);

  const killPromises = [];
  for (const [, state] of accountState) {
    if (state.child) killPromises.push(killChild(state.child));
  }
  if (hotroadChild) killPromises.push(killChild(hotroadChild));

  await Promise.all(killPromises);
  process.exit(0);
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
