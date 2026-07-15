/**
 * Server-side Backtest Simulation Engine
 * Processes bets via MongoDB cursor streaming for 1M+ scale.
 * Exact port of the client-side executeBacktest() math.
 */

const MAX_CHART_POINTS = 2000;
const ROWS_PER_PAGE = 100;

/**
 * Build a MongoDB date-range query from the given range/preset params.
 * Mirrors the logic from the original /api/bets-hypothesis-data endpoint.
 */
function buildDateQuery(params) {
  const { range, from, to } = params;
  let startStr = null;
  let endStr = null;

  if (range === "custom") {
    if (from) startStr = new Date(from).toISOString();
    if (to) endStr = new Date(to).toISOString();
  } else if (range !== "all_time") {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kuala_Lumpur",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });
    const parts = formatter.formatToParts(now);
    const partMap = Object.fromEntries(parts.map((p) => [p.type, p.value]));
    const myYear = parseInt(partMap.year);
    const myMonth = parseInt(partMap.month) - 1;
    const myDay = parseInt(partMap.day);

    const today12pmUTC = new Date(
      Date.UTC(myYear, myMonth, myDay, 4, 0, 0, 0)
    );
    let currentPeriodStart = today12pmUTC;
    if (now < today12pmUTC) {
      currentPeriodStart = new Date(
        today12pmUTC.getTime() - 24 * 60 * 60 * 1000
      );
    }

    let startDate = null;
    let endDate = null;

    if (range === "today") {
      startDate = new Date(currentPeriodStart);
      endDate = new Date(currentPeriodStart.getTime() + 24 * 60 * 60 * 1000);
    } else if (range === "yesterday") {
      startDate = new Date(
        currentPeriodStart.getTime() - 24 * 60 * 60 * 1000
      );
      endDate = new Date(currentPeriodStart);
    } else if (range === "last_7_days") {
      startDate = new Date(
        currentPeriodStart.getTime() - 6 * 24 * 60 * 60 * 1000
      );
      endDate = new Date(currentPeriodStart.getTime() + 24 * 60 * 60 * 1000);
    }

    if (startDate && endDate) {
      startStr = startDate.toISOString();
      endStr = endDate.toISOString();
    }
  }

  const matchQ = {};
  if (startStr || endStr) {
    matchQ.time = {};
    if (startStr) matchQ.time.$gte = startStr;
    if (endStr) matchQ.time.$lt = endStr;
  }
  return matchQ;
}

/**
 * Run the full backtest simulation server-side.
 *
 * @param {Collection} dbCollection - MongoDB collection handle
 * @param {Object} params - All simulation parameters from the client
 * @returns {Object} Structured result with kpis, chartData, rows, counts
 */
async function runBacktest(dbCollection, params) {
  // === Extract params with defaults matching the client-side ===
  const initBankroll = parseFloat(params.bankroll) || 1000;
  const method = params.method || "kelly";
  const flatRatio = parseFloat(params.flatRatio) || 0.01;
  const kellyFraction = parseFloat(params.kellyFraction) || 1.0;
  const minBet = parseFloat(params.minBet) || 0;
  const maxBet = parseFloat(params.maxBet) || 500;
  const rounding = parseFloat(params.rounding) || 10;
  const rebateRate = parseFloat(params.rebateRate) || 0.012;

  // Consolidated EV Range with legacy fallbacks
  let minEv = 0.0014;
  if (params.minEv !== undefined && params.minEv !== '') {
    minEv = parseFloat(params.minEv);
  } else if (params.playerMinEv !== undefined && params.playerMinEv !== '') {
    minEv = parseFloat(params.playerMinEv);
  }

  let maxEv = null;
  if (params.maxEv !== undefined && params.maxEv !== null && params.maxEv !== "") {
    maxEv = parseFloat(params.maxEv);
  } else if (params.playerMaxEv !== undefined && params.playerMaxEv !== null && params.playerMaxEv !== "") {
    maxEv = parseFloat(params.playerMaxEv);
  }

  const compToggle = params.compounding !== false;

  // Filter settings - supports new betTypes array or legacy betTypeFilter string
  let betTypes = params.betTypes;
  if (!betTypes) {
    const legacyFilter = params.betTypeFilter || "ALL";
    if (legacyFilter === "ALL") {
      betTypes = ["PlayerBet", "BankerBet", "TieBet"];
    } else {
      betTypes = [legacyFilter];
    }
  }

  const roundMin = params.roundMin ? parseFloat(params.roundMin) : null;
  const roundMax = params.roundMax ? parseFloat(params.roundMax) : null;
  const statusFilter = params.statusFilter || "ALL";
  const includeNonSuccess = params.includeNonSuccess !== false;
  const includeWaiting = params.includeWaiting === true;

  // Pagination
  const page = parseInt(params.page) || 1;


  // === Build MongoDB query ===
  const matchQ = buildDateQuery(params);

  // === Simulation state ===
  let bankroll = initBankroll;
  let simBetsCount = 0;
  let totalRounds = 0;
  let betsPlaced = 0;
  let eligibleRounds = 0;
  let wins = 0;
  let losses = 0;
  let pushes = 0;
  let totalTurnover = 0;
  let effTurnover = 0;
  let simExpLoss = 0;
  let simExpNet = 0;
  let totalRebate = 0;
  let originalPnl = 0;
  let cumExpectedNet = 0;
  let maxPeak = initBankroll;
  let minTrough = initBankroll;
  let maxDrawdown = 0;
  let maxUpswing = 0;

  // Chart data collectors (full resolution — downsampled after)
  const allChartPoints = [{ x: 0, y: initBankroll }];
  const allExpectedPoints = [{ x: 0, y: initBankroll }];
  const allChartPointsSimulated = [{ x: 0, y: initBankroll }];
  const allExpectedPointsSimulated = [{ x: 0, y: initBankroll }];


  // Row collectors (all rows for the current page calculation)
  const allRows = []; // simulated rows
  const skippedRows = []; // skipped rows

  // === Load bets from MongoDB ===
  const bets = await dbCollection
    .find(matchQ)
    .project({
      id: 1,
      time: 1,
      tableName: 1,
      round: 1,
      target: 1,
      ev: 1,
      outcome: 1,
      recommendedBetAmount: 1,
      actualBetAmount: 1,
      roundOutcome: 1,
      profit: 1,
      "reasonState.mathematics.evSnapshot": 1,
      "reasonState.metrics.deckRemaining": 1,
    })
    .sort({ time: 1 })
    .toArray();

  for (let idx = 0; idx < bets.length; idx++) {
    const b = bets[idx];

    // Track original profit
    if (b.profit != null) {
      originalPnl += b.profit;
    }    // Include waiting filter check
    if (!includeWaiting && b.roundOutcome === "WAITING") {
      continue;
    }

    // === Hypothesis Filters (Immediate check before calculations/counts) ===
    // 1. Round Number Range filter
    const rNum = parseInt(b.round);
    if (
      (roundMin !== null && !isNaN(rNum) && rNum < roundMin) ||
      (roundMax !== null && !isNaN(rNum) && rNum > roundMax)
    ) {
      continue;
    }

    // 2. Original Bet Status filter
    if (statusFilter !== "ALL") {
      let isStatusMatch = false;
      if (statusFilter === "NON_SUCCESS") {
        isStatusMatch =
          b.outcome === "SUCCESS" || b.outcome === "WRONG_AMOUNT";
      } else {
        isStatusMatch = b.outcome !== statusFilter;
      }
      if (isStatusMatch) {
        continue;
      }
    }

    totalRounds++;
    let skippedReason = "-";
    let isFiltered = false;

    // Get EV snapshot probabilities
    const evSnapshot =
      (b.reasonState &&
        b.reasonState.mathematics &&
        b.reasonState.mathematics.evSnapshot) ||
      {};
    const pp =
      evSnapshot.PlayerBet && evSnapshot.PlayerBet.prob != null
        ? evSnapshot.PlayerBet.prob
        : null;
    const pb =
      evSnapshot.BankerBet && evSnapshot.BankerBet.prob != null
        ? evSnapshot.BankerBet.prob
        : null;
    const pt =
      evSnapshot.TieBet && evSnapshot.TieBet.prob != null
        ? evSnapshot.TieBet.prob
        : null;

    let simTarget = "None";
    let bestEv = -999;
    let simProb = 0;

    if (pp === null || pb === null) {
      isFiltered = true;
      skippedReason = "Missing EV snapshot / unsimulatable";
    } else {
      // 1. Calculate Base EV
      const nonTie = pp + pb;
      if (nonTie === 0) {
        isFiltered = true;
        skippedReason = "Tie probability is 100%";
      } else {
        const evPlayerBase = (pp - pb) / nonTie;
        const evBankerBase = (pb * 0.95 - pp) / (pb * 0.95 + pp);
        const evTieBase = pt !== null ? pt * 8.0 - (1.0 - pt) : -999;

        // 2. Adjust for hypothetical rebateRate
        const evPlayerAdj = evPlayerBase + rebateRate;
        const evBankerAdj = evBankerBase + rebateRate;
        const evTieAdj = evTieBase + rebateRate;

        // 3. Evaluate eligibility independently
        const eligiblePlayer = evPlayerAdj > minEv && (maxEv === null || evPlayerAdj <= maxEv);
        const eligibleBanker = evBankerAdj > minEv && (maxEv === null || evBankerAdj <= maxEv);
        const eligibleTie = evTieAdj > minEv && (maxEv === null || evTieAdj <= maxEv);

        let maxEvVal = -999;
        if (eligiblePlayer && evPlayerAdj > maxEvVal) {
          simTarget = "PlayerBet";
          maxEvVal = evPlayerAdj;
          bestEv = evPlayerAdj;
          simProb = pp;
        }
        if (eligibleBanker && evBankerAdj > maxEvVal) {
          simTarget = "BankerBet";
          maxEvVal = evBankerAdj;
          bestEv = evBankerAdj;
          simProb = pb;
        }
        if (eligibleTie && evTieAdj > maxEvVal) {
          simTarget = "TieBet";
          maxEvVal = evTieAdj;
          bestEv = evTieAdj;
          simProb = pt;
        }

        // Evaluate EV thresholds
        if (simTarget === "None") {
          isFiltered = true;
          const evs = [
            { name: "P", val: evPlayerAdj },
            { name: "B", val: evBankerAdj },
            { name: "T", val: evTieAdj }
          ];
          evs.sort((a, b) => b.val - a.val);
          const highestEv = evs[0];
          skippedReason = `Low EV: ${highestEv.name} ${(highestEv.val * 100).toFixed(3)}%`;
        }
      }
    }

    // Evaluate other filters if EV threshold succeeded
    if (!isFiltered) {
      // Bet Type filter
      if (!betTypes.includes(simTarget)) {
        isFiltered = true;
        skippedReason = `Filtered Bet Type (${simTarget === "PlayerBet" ? "Player" : simTarget === "BankerBet" ? "Banker" : "Tie"})`;
      }
    }


    let simAmount = 0;
    let payout = 1.0;
    let simProfit = 0;
    let simRebateAmt = 0;

    if (!isFiltered) {
      eligibleRounds++;

      if (simTarget === "BankerBet") payout = 0.95;
      else if (simTarget === "PlayerBet") payout = 1.0;
      else if (simTarget === "TieBet") payout = 8.0;

      // Bet sizing math
      const activeBankroll = compToggle ? bankroll : initBankroll;

      if (method === "flat") {
        simAmount = activeBankroll * flatRatio;
      } else {
        // Kelly Formula
        const rawKelly = bestEv / payout;
        simAmount = activeBankroll * kellyFraction * rawKelly;
      }

      // Rounding
      if (rounding > 0) {
        simAmount = Math.round(simAmount / rounding) * rounding;
      }

      // Caps
      if (simAmount > maxBet) simAmount = maxBet;

      // Min Bet rounding up
      if (simAmount > 0 && simAmount < minBet) {
        simAmount = minBet;
      }

      // Capping at current bankroll to avoid going below 0
      if (simAmount > bankroll) {
        simAmount = bankroll;
      }

      if (simAmount > 0) {
        betsPlaced++;

        // Calculate payout
        const winner = b.roundOutcome; // P, B, or T
        const targetSide =
          simTarget === "BankerBet"
            ? "B"
            : simTarget === "PlayerBet"
              ? "P"
              : "T";

        if (winner === "T" && targetSide !== "T") {
          // Tie push - refund bet
          simProfit = 0;
          pushes++;
        } else if (winner === "WAITING") {
          // Waiting outcome - unresolved, no profit/loss
          simProfit = 0;
        } else if (winner === targetSide) {
          // Win
          simProfit = simAmount * payout;
          wins++;
        } else {
          // Loss
          simProfit = -simAmount;
          losses++;
        }

        // Turnover and Rebate
        totalTurnover += simAmount;
        const isTiePush = (winner === "T" && targetSide !== "T");
        if (!isTiePush && winner !== "WAITING") {
          const isBankerWin = (winner === "B" && targetSide === "B");
          const actualEffTurnover = isBankerWin ? simAmount * 0.95 : simAmount;
          simRebateAmt = actualEffTurnover * rebateRate;
          effTurnover += actualEffTurnover;

          const baseEv = bestEv - rebateRate;
          simExpLoss += baseEv * actualEffTurnover;
          simExpNet += bestEv * actualEffTurnover;
          cumExpectedNet += bestEv * actualEffTurnover;
        }

        bankroll += simProfit + simRebateAmt;
        totalRebate += simRebateAmt;
      } else {
        skippedReason =
          bankroll <= 0
            ? "Bankroll is $0"
            : "Bet size below min limit / rounded to $0";
      }
    }

    maxPeak = Math.max(maxPeak, bankroll);
    maxDrawdown = Math.max(maxDrawdown, maxPeak - bankroll);
    minTrough = Math.min(minTrough, bankroll);
    maxUpswing = Math.max(maxUpswing, bankroll - minTrough);

    // Store chart data points
    allChartPoints.push({ x: idx + 1, y: bankroll });
    allExpectedPoints.push({ x: idx + 1, y: initBankroll + cumExpectedNet });

    // Build row data object (JSON, not HTML)
    const row = {
      time: b.time,
      tableName: b.tableName,
      round: b.round,
      simTarget,
      skippedReason,
      bestEv: simTarget !== "None" ? bestEv : null,
      simProb: simTarget !== "None" ? simProb : null,
      simAmount,
      roundOutcome: b.roundOutcome,
      simProfit,
      bankroll,
      isSimulated: !isFiltered && simAmount > 0,
    };

    if (row.isSimulated) {
      allRows.push(row);
      simBetsCount++;
      allChartPointsSimulated.push({ x: simBetsCount, y: bankroll });
      allExpectedPointsSimulated.push({ x: simBetsCount, y: initBankroll + cumExpectedNet });
    } else {
      skippedRows.push(row);
    }
  }

  // === Compute KPIs ===
  const simPnl = bankroll - initBankroll;
  const simRoi = (simPnl / initBankroll) * 100;
  const winRate = betsPlaced > 0 ? (wins / (wins + losses)) * 100 : 0;
  const placeRate = totalRounds > 0 ? (betsPlaced / totalRounds) * 100 : 0;
  const avgBet = betsPlaced > 0 ? totalTurnover / betsPlaced : 0;
  const evPerc = effTurnover > 0 ? (simExpNet / effTurnover) * 100 : 0;
  const explPerc = effTurnover > 0 ? (simExpLoss / effTurnover) * 100 : 0;

  // === Downsample chart data ===
  const chartActual = downsample(allChartPoints, MAX_CHART_POINTS);
  const chartExpected = downsample(allExpectedPoints, MAX_CHART_POINTS);
  const chartActualSimulated = downsample(allChartPointsSimulated, MAX_CHART_POINTS);
  const chartExpectedSimulated = downsample(allExpectedPointsSimulated, MAX_CHART_POINTS);

  // === Paginate rows ===
  // Determine which row set to return based on logView
  const logView = params.logView || "ALL";
  let targetRows;
  if (logView === "SIMULATED") {
    targetRows = allRows;
  } else if (logView === "UNSIMULATED") {
    targetRows = skippedRows;
  } else {
    // ALL — merge and sort by time
    targetRows = [...allRows, ...skippedRows].sort(
      (a, b) => new Date(a.time) - new Date(b.time)
    );
  }

  const totalPages = Math.max(1, Math.ceil(targetRows.length / ROWS_PER_PAGE));
  const clampedPage = Math.min(Math.max(1, page), totalPages);
  const startIdx = (clampedPage - 1) * ROWS_PER_PAGE;
  const pageRows = targetRows.slice(startIdx, startIdx + ROWS_PER_PAGE);

  return {
    kpis: {
      simPnl,
      simRoi,
      bankroll,
      initBankroll,
      originalPnl,
      betsPlaced,
      eligibleRounds,
      totalRounds,
      wins,
      losses,
      pushes,
      winRate,
      placeRate,
      avgBet,
      totalTurnover,
      effTurnover,
      totalRebate,
      simExpNet,
      simExpLoss,
      evPerc,
      explPerc,
      maxDrawdown,
      maxUpswing,
    },
    chartData: {
      actual: chartActual,
      expected: chartExpected,
      actualSimulated: chartActualSimulated,
      expectedSimulated: chartExpectedSimulated,
    },
    rows: pageRows,
    totalRows: targetRows.length,
    page: clampedPage,
    totalPages,
    counts: {
      loaded: totalRounds,
      simulated: allRows.length,
      skipped: skippedRows.length,
    },
  };
}

/**
 * Downsample an array of {x, y} points to at most maxPoints
 * using nth-point sampling. Always keeps first and last points.
 */
function downsample(data, maxPoints) {
  if (data.length <= maxPoints) return data;

  const result = [data[0]];
  const step = (data.length - 1) / (maxPoints - 1);
  for (let i = 1; i < maxPoints - 1; i++) {
    const idx = Math.round(i * step);
    result.push(data[idx]);
  }
  result.push(data[data.length - 1]);
  return result;
}

module.exports = { runBacktest };
