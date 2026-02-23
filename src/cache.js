const API_URL = "https://api.warframestat.us/pc/";
const REFRESH_INTERVAL_MS = 60 * 1000;

let cachedData = null;
let lastUpdated = null;

async function fetchWorldState() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`API responded with ${res.status}`);
    cachedData = await res.json();
    lastUpdated = new Date();
    console.log(`[cache] Updated at ${lastUpdated.toISOString()}`);
  } catch (err) {
    console.error("[cache] Fetch failed:", err.message);
  }
}

function startPolling() {
  // Fetch immediately on startup, then every 60s
  fetchWorldState();
  setInterval(fetchWorldState, REFRESH_INTERVAL_MS);
}

function getData() {
  return cachedData;
}

function getLastUpdated() {
  return lastUpdated;
}

function getAvailableKeys() {
  return cachedData ? Object.keys(cachedData) : [];
}

module.exports = { startPolling, getData, getLastUpdated, getAvailableKeys };
