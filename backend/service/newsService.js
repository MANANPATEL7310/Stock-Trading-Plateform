// backend/service/newsService.js
import { sectorMap } from "../data/sectorMap.js";
import { symbolsList } from "../data/stocks.js";

// Shared state used by StockService
export const newsState = {
  macroNewsImpact: 0,    // single number
  sectorNewsImpact: {},  // { [sector]: impact }
  stockNewsImpact: {},   // { [symbol]: impact }
};

let newsFeed = [];

const sectors = [...new Set(Object.values(sectorMap))];

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const marketEvents = [
  "RBI Policy Update",
  "US Fed Rate Decision",
  "Budget Announcement",
  "Crude Oil Surge",
  "Global Market Crash",
  "Strong GDP Data",
  "FIIs Buying Heavily",
  "Rupee Strengthens",
];

const posWords = ["surges", "soars", "jumps", "gains", "beats expectations"];
const negWords = ["falls", "drops", "declines", "misses expectations"];

const sectorPos = [
  "Sector rallies on strong demand",
  "Sector sees institutional buying",
  "Sector boosted by positive data",
];

const sectorNeg = [
  "Sector weakens on global cues",
  "Sector faces selling pressure",
  "Sector slips after negative outlook",
];

export const createNewsItem = () => {
  const r = Math.random();

  // MARKET NEWS (10%)
  if (r < 0.10) {
    const item = {
      type: "market",
      headline: random(marketEvents),
      time: new Date(),
    };

    // Impact between ~0.3 and ~2.1 (positive or negative)
    newsState.macroNewsImpact =
      (Math.random() < 0.5 ? -1 : 1) * (0.3 + Math.random() * 1.8);

    return item;
  }

  // SECTOR NEWS (next 30%)
  if (r < 0.40) {
    const sector = random(sectors);
    const positive = Math.random() < 0.5;

    const item = {
      type: "sector",
      sector,
      headline: positive ? random(sectorPos) : random(sectorNeg),
      time: new Date(),
    };

    const direction = positive ? 1 : -1;
    // Impact between ~0.2 and ~1.2
    newsState.sectorNewsImpact[sector] =
      direction * (0.2 + Math.random() * 1.0);

    return item;
  }

  // STOCK NEWS (remaining 60%)
  const stock = random(symbolsList);
  const positive = Math.random() < 0.55;

  const item = {
    type: "stock",
    symbol: stock,
    headline: positive
      ? `${stock} ${random(posWords)}`
      : `${stock} ${random(negWords)}`,
    time: new Date(),
  };

  const direction = positive ? 1 : -1;
  // Impact between ~0.3 and ~1.8
  newsState.stockNewsImpact[stock] =
    direction * (0.3 + Math.random() * 1.5);

  return item;
};

// AUTO GENERATION LOOP
export const startNewsGenerator = () => {
  console.log("[NewsService] Auto news generator ON (every 25 sec)");
  setInterval(() => {
    const item = createNewsItem();
    newsFeed.unshift(item);
    if (newsFeed.length > 100) newsFeed.pop();
  }, 25000);
};

export const getNewsFeed = () => newsFeed;
