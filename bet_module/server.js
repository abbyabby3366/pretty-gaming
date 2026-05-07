const http = require("http");
const crypto = require("crypto");

const PORT = parseInt(process.env.PORT || "4001", 10);
const CENTRAL_URL = process.env.CENTRAL_URL || "http://127.0.0.1:3456";
const MODULE_ID = "bet-module-" + PORT;
const BASE_URL = `http://127.0.0.1:${PORT}`;

const betQueue = [];

function parseJSONBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
  });
}

function sendHeartbeat() {
  const payload = {
    moduleId: MODULE_ID,
    baseUrl: BASE_URL,
    label: `Bet Module Node ${PORT}`,
    accounts: [{ label: `Account_${PORT}`, isAcceptingBets: true }]
  };

  fetch(`${CENTRAL_URL}/api/bet-module/heartbeat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).catch(() => {
    // silently fail if central is offline
  });
}

async function processBets() {
  while (true) {
    if (betQueue.length > 0) {
      const bet = betQueue.shift();
      console.log(`\n[Bet Module ${PORT}] 📥 Received Bet: ${bet.id} for ${bet.tableName} (${bet.target})`);
      
      // Simulate bet execution time
      await new Promise(r => setTimeout(r, 1500));
      
      const success = Math.random() > 0.15; // 85% success rate
      const status = success ? "SUCCESS" : "FAILED";
      
      console.log(`[Bet Module ${PORT}] ${success ? '✅' : '❌'} Result: ${status}`);

      // Report result to central server
      fetch(`${CENTRAL_URL}/api/telemetry/bet-result`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          betId: bet.id,
          status: status,
          tableNumber: bet.tableName,
          betType: bet.target
        })
      }).catch(err => {
        console.error(`[Bet Module ${PORT}] Failed to report result to central:`, err.message);
      });
    } else {
      await new Promise(r => setTimeout(r, 500));
    }
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/neuronbaccarat/bet") {
    try {
      const payload = await parseJSONBody(req);
      betQueue.push(payload);
      
      res.writeHead(202, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, status: "queued", betId: payload.id }));
    } catch (e) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: false, error: e.message }));
    }
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`[Bet Module] 🟢 Online on ${BASE_URL} | Targeting Central: ${CENTRAL_URL}`);
  setInterval(sendHeartbeat, 10000);
  sendHeartbeat(); // initial heartbeat
  processBets(); // start processing loop
});
