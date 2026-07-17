const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

/**
 * launchWash - Copies bet_accounts.json to Hotroad and spawns Hotroad's bet launcher.
 * Returns { child, hotroadPath } so the caller can manage the child process.
 */
function launchWash() {
  // 1. Determine Hotroad directory path
  // Load PG env variables so we can read HOTROAD_PATH if set.
  require('dotenv').config({ path: path.join(__dirname, "..", ".env") });

  const defaultHotroadPath = path.resolve(__dirname, '..', 'hotroad-v4');
  const hotroadPath = process.env.HOTROAD_PATH 
    ? path.resolve(__dirname, '..', process.env.HOTROAD_PATH) 
    : defaultHotroadPath;

  console.log(`[Wash] Hotroad project directory: ${hotroadPath}`);

  // 2. Validate hotroad directory exists
  if (!fs.existsSync(hotroadPath)) {
    console.error(`[Wash] Error: Hotroad directory not found at ${hotroadPath}`);
    console.error(`[Wash] Please ensure Hotroad is located at that path or configure HOTROAD_PATH in your .env file.`);
    return null;
  }

  // 3. Define paths for bet_accounts.json
  const sourceFile = path.resolve(__dirname, '..', 'bet_module', 'json', 'bet_accounts.json');
  const targetDir = path.resolve(hotroadPath, 'bet_module', 'json');
  const targetFile = path.resolve(targetDir, 'bet_accounts.json');

  // 4. Validate source file exists
  if (!fs.existsSync(sourceFile)) {
    console.error(`[Wash] Error: Source file not found at ${sourceFile}`);
    return null;
  }

  // Ensure target directory exists
  if (!fs.existsSync(targetDir)) {
    try {
      fs.mkdirSync(targetDir, { recursive: true });
    } catch (err) {
      console.error(`[Wash] Error creating target directory ${targetDir}:`, err.message);
      return null;
    }
  }

  // 5. Copy the file
  console.log(`[Wash] Copying ${sourceFile} to ${targetFile}...`);
  try {
    fs.copyFileSync(sourceFile, targetFile);
    console.log(`[Wash] bet_accounts.json copied successfully.`);
  } catch (err) {
    console.error(`[Wash] Error copying bet_accounts.json:`, err.message);
    return null;
  }

  // 6. Helper to extract keys from .env file to avoid environment pollution in child process
  function getEnvKeys(envPath) {
    if (!fs.existsSync(envPath)) return [];
    const content = fs.readFileSync(envPath, 'utf-8');
    const keys = [];
    const lines = content.split(/\r?\n/);
    for (let line of lines) {
      line = line.trim();
      if (!line || line.startsWith('#')) continue;
      const match = line.match(/^([^=]+)=/);
      if (match) {
        keys.push(match[1].trim());
      }
    }
    return keys;
  }

  // 7. Strip out pretty-gaming specific env variables so Hotroad's dotenv can load its own settings
  const pgEnvPath = path.join(__dirname, '..', '.env');
  const pgEnvKeys = getEnvKeys(pgEnvPath);
  const childEnv = { ...process.env };

  for (const key of pgEnvKeys) {
    if (key !== 'HOTROAD_PATH') {
      delete childEnv[key];
    }
  }

  // 8. Spawn hotroad launcher
  console.log(`[Wash] Spawning Hotroad bet launcher...`);
  const hotroadLauncher = path.resolve(hotroadPath, 'bet_module', 'launcher.js');

  if (!fs.existsSync(hotroadLauncher)) {
    console.error(`[Wash] Error: Hotroad launcher not found at ${hotroadLauncher}`);
    return null;
  }

  const child = spawn('node', [hotroadLauncher], {
    cwd: hotroadPath,
    stdio: 'inherit',
    env: childEnv
  });

  return { child, hotroadPath };
}

module.exports = { launchWash };

// Standalone execution
if (require.main === module) {
  const result = launchWash();
  if (!result) {
    process.exit(1);
  }

  const { child } = result;

  child.on('exit', (code) => {
    console.log(`[Wash] Hotroad launcher process exited with code ${code}`);
    process.exit(code || 0);
  });

  // Handle termination signals to cleanup the child process properly
  function cleanup() {
    console.log('\n[Wash] Terminating Hotroad launcher...');
    child.kill('SIGTERM');
  }
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
}
