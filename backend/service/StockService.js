import axios from "axios";
import Stock from "../schemas/StockSchema.js";
import dotenv from "dotenv";

dotenv.config();

const TWELVE_DATA_API_KEY = process.env.TWELVE_DATA_API_KEY;
const BASE_URL = "https://api.twelvedata.com/quote";

// 24 Symbols from data.js
const symbolsList = [
  "INFY", "ONGC", "TCS", "KPITTECH", "QUICKHEAL", "WIPRO", "M&M", "RELIANCE",
  "HUL", "ICICIBANK", "HDFC", "SBIN", "AXISBANK", "TATAMOTORS", "BAJAJFINSV", "ADANIENT",
  "ITC", "LT", "ULTRACEMCO", "ASIANPAINT", "DIVISLAB", "SUNPHARMA", "DRREDDY", "JSWSTEEL"
];

// Split into groups of 8
const symbolGroups = [];
const chunkSize = 8;
for (let i = 0; i < symbolsList.length; i += chunkSize) {
  symbolGroups.push(symbolsList.slice(i, i + chunkSize));
}

// ... (imports)

// ... (symbolsList and symbolGroups definitions)

// Remove global currentGroupIndex
// let currentGroupIndex = 0;

const getNextGroupIndex = async () => {
  try {
    // Find the stock that hasn't been updated for the longest time
    const oldestStock = await Stock.findOne().sort({ updatedAt: 1 });

    if (!oldestStock) {
      // If DB is empty, start with group 0
      return 0;
    }

    // Find which group this stock belongs to
    const symbolIndex = symbolsList.indexOf(oldestStock.symbol);
    if (symbolIndex === -1) return 0; // Should not happen if DB is consistent

    const groupIndex = Math.floor(symbolIndex / chunkSize);
    return groupIndex;
  } catch (error) {
    // console.error("[StockService] Error determining next group:", error);
    return 0; // Default to 0 on error
  }
};

const fetchAndUpdateGroup = async (groupIndex) => {
  // ... (existing fetch logic remains the same)
  const symbols = symbolGroups[groupIndex];
  // Append :NSE to ensure we get Indian market data (INR)
  const requestSymbols = symbols.map(s => `${s}:NSE`);
  const symbolString = requestSymbols.join(",");
  
  // console.log(`[StockService] Fetching group ${groupIndex + 1}: ${symbolString}`);

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        symbol: symbolString,
        apikey: TWELVE_DATA_API_KEY,
      },
    });

    const data = response.data;
    
    for (const sym of symbols) {
      // The API response key will match the requested symbol (e.g., "TCS:NSE")
      // But we fallback to "sym" just in case
      const quote = data[`${sym}:NSE`] || data[sym];
      
      if (quote && quote.symbol) {
        // ... (mapping logic)
        const price = parseFloat(quote.close);
        const change = parseFloat(quote.change);
        const percentChange = parseFloat(quote.percent_change).toFixed(2);
        const isDown = change < 0;

        await Stock.findOneAndUpdate(
          { symbol: sym }, // Match by our clean symbol (e.g., "TCS")
          {
            $set: {
              symbol: sym, // Ensure symbol is stored as "TCS", not "TCS:NSE"
              name: quote.name || sym,
              price: price,
              open: parseFloat(quote.open),
              high: parseFloat(quote.high),
              low: parseFloat(quote.low),
              previous_close: parseFloat(quote.previous_close),
              volume: parseInt(quote.volume),
              percent_change: percentChange,
              change: change,
              isDown: isDown,
              updatedAt: new Date(), // Important: Update this timestamp!
            },
          },
          { upsert: true, new: true }
        );
      } else {
        // console.warn(`[StockService] No data found for ${sym} in response.`);
      }
    }
    // console.log(`[StockService] Group ${groupIndex + 1} updated successfully.`);

  } catch (error) {
    // console.error("[StockService] Error fetching data:", error.message);
  }
};

export const startStockScheduler = () => {
  // console.log("[StockService] Scheduler started. Interval: 11 minutes.");
  
  runSchedulerTick();

  setInterval(runSchedulerTick, 6 * 60 * 1000);
};

const runSchedulerTick = async () => {
  const now = new Date();
  const hour = now.getHours();

  // Active hours: 07:00 to 17:00
  if (hour < 7 || hour >= 17) {
    // console.log("[StockService] Skipping fetch due to quiet hours (17:00 - 07:00).");
    return;
  }

  // Dynamically determine the next group based on "staleness"
  const nextGroupIndex = await getNextGroupIndex();
  await fetchAndUpdateGroup(nextGroupIndex);
  
  // No need to manually rotate currentGroupIndex anymore
};
