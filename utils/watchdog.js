/**
 * watchdog.js — Generic class to manage process/connection readiness and liveness timeouts.
 */

class Watchdog {
  /**
   * @param {Object} params
   * @param {string} params.name - Label used in console logs and alerts
   * @param {number} params.readinessTimeoutMs - Milliseconds to wait for the first feed. 0 to disable.
   * @param {number} params.livenessTimeoutMs - Milliseconds of inactivity allowed before triggering a failure. 0 to disable.
   * @param {number} params.checkIntervalMs - Frequency to evaluate liveness conditions.
   * @param {Function} params.onFailure - Callback invoked on timeout, passing an Error object
   */
  constructor({ name, readinessTimeoutMs = 15000, livenessTimeoutMs = 15000, checkIntervalMs = 5000, onFailure }) {
    this.name = name || "Generic Watchdog";
    this.readinessTimeoutMs = readinessTimeoutMs;
    this.livenessTimeoutMs = livenessTimeoutMs;
    this.checkIntervalMs = checkIntervalMs;
    this.onFailure = onFailure || (() => {});

    this.hasPrimed = false;
    this.lastActivityTime = 0;
    this.readinessTimer = null;
    this.livenessTimer = null;
  }

  /**
   * Starts monitoring readiness and liveness. Stops any active timers first.
   */
  start() {
    this.stop();
    this.hasPrimed = false;
    this.lastActivityTime = 0;

    // 1. Readiness Timeout Check (runs once unless fed/primed)
    if (this.readinessTimeoutMs > 0) {
      this.readinessTimer = setTimeout(() => {
        if (!this.hasPrimed) {
          const msg = `failed readiness check: No game state/balance received after ${this.readinessTimeoutMs / 1000}s — connection failed to fully initialize.`;
          this.onFailure(new Error(msg));
        }
      }, this.readinessTimeoutMs);
    }

    // 2. Periodic Liveness Checker
    if (this.livenessTimeoutMs > 0) {
      this.livenessTimer = setInterval(() => {
        if (this.hasPrimed && this.lastActivityTime > 0) {
          const gap = Date.now() - this.lastActivityTime;
          if (gap >= this.livenessTimeoutMs) {
            const msg = `failed liveness check: No game state/balance updates received for ${Math.round(gap / 1000)}s — connection stale.`;
            this.onFailure(new Error(msg));
          }
        }
      }, this.checkIntervalMs);
    }
  }

  /**
   * Refreshes the activity timestamp, signaling that the page is alive.
   * Resolves readiness checks if called for the first time.
   */
  feed() {
    this.lastActivityTime = Date.now();
    if (!this.hasPrimed) {
      this.hasPrimed = true;
      if (this.readinessTimer) {
        clearTimeout(this.readinessTimer);
        this.readinessTimer = null;
      }
    }
  }

  /**
   * Cleans up all intervals/timeouts.
   */
  stop() {
    if (this.readinessTimer) {
      clearTimeout(this.readinessTimer);
      this.readinessTimer = null;
    }
    if (this.livenessTimer) {
      clearInterval(this.livenessTimer);
      this.livenessTimer = null;
    }
    this.hasPrimed = false;
    this.lastActivityTime = 0;
  }
}

module.exports = Watchdog;
