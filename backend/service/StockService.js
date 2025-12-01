import Stock from "../schemas/StockSchema.js";
import Holding from "../model/HoldingsModel.js";
import Order from "../model/OrdersModel.js";
import User from "../model/UserModel.js";
import { initialPrices, symbolsList } from "../data/stocks.js";
import { sectorMap } from "../data/sectorMap.js";
import { newsState } from "./newsService.js";

// Market Sentiment State
// Range: -3.0 (Crash) to +3.0 (Boom). 0 is Neutral.
let marketTrend = 0;

// Normal Distribution Helper
const normal = (mean, std) => {
  const u = 1 - Math.random();
  const v = Math.random();
  return (
    mean + std * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
  );
};

// Sector base volatility
function getSectorVol(sector) {
  switch (sector) {
    case "IT":
      return 0.1;
    case "FMCG":
      return 0.04;
    case "PHARMA":
      return 0.06;
    case "BANKING":
      return 0.07;
    case "ENERGY":
      return 0.05;
    case "AUTO":
      return 0.08;
    case "METAL":
      return 0.12;
    case "CEMENT":
      return 0.06;
    default:
      return 0.06;
  }
}

function decay(x) {
  return x * 0.97;
}

// MARKET TREND (sentiment)
setInterval(() => {
  marketTrend *= 0.98;
  marketTrend += normal(0, 0.15);
  marketTrend = Math.max(-3, Math.min(3, marketTrend));
}, 60000);

// Helper: Box-Muller Transform for Normal Distribution
const getNormallyDistributedRandom = (mean, stdDev) => {
  const u = 1 - Math.random(); // Converting [0,1) to (0,1]
  const v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  // z is standard normal (mean 0, stdDev 1)
  return z * stdDev + mean;
};

const checkAndExecuteTriggers = async (symbol, currentPrice) => {
  try {
    // Find holdings for this symbol that have triggers set
    const holdings = await Holding.find({
      symbol: symbol,
      $or: [{ target: { $ne: null } }, { stopLoss: { $ne: null } }],
    });

    for (const holding of holdings) {
      let triggered = false;
      let triggerType = "";

      // Check Target
      if (holding.target && currentPrice >= holding.target) {
        triggered = true;
        triggerType = "TARGET";
      }
      // Check StopLoss
      else if (holding.stopLoss && currentPrice <= holding.stopLoss) {
        triggered = true;
        triggerType = "STOPLOSS";
      }

      if (triggered) {
        // Execute SELL Order
        const user = await User.findById(holding.user);
        if (user) {
          const orderValue = currentPrice * holding.qty;

          // 1. Update User Funds
          user.funds += orderValue;
          user.tradeHistory.hasSold = true;
          await user.save();

          // 2. Create Order Record
          await Order.create({
            user: user._id,
            symbol: symbol,
            name: holding.name,
            qty: holding.qty,
            price: currentPrice,
            mode: "SELL",
          });

          // 3. Remove Holding (Close Position)
          await Holding.deleteOne({ _id: holding._id });
        }
      }
    }
  } catch (error) {
    console.error("[AutoTrade] Error checking triggers:", error);
  }
};

// Check and Execute Limit Orders
const checkAndExecuteLimitOrders = async (symbol, currentPrice) => {
  try {
    const pendingOrders = await Order.find({
      symbol,
      status: "PENDING",
      type: "LIMIT",
    });

    for (const order of pendingOrders) {
      let executed = false;

      if (order.mode === "BUY" && currentPrice <= order.price) {
        // Buy Limit Hit
        executed = true;

        // Update Holdings
        let holding = await Holding.findOne({ user: order.user, symbol });
        if (holding) {
          const newQty = holding.qty + order.qty;
          const newAvg =
            (holding.avg * holding.qty + order.price * order.qty) / newQty;
          holding.qty = newQty;
          holding.avg = newAvg;
          await holding.save();
        } else {
          await Holding.create({
            user: order.user,
            symbol,
            name: order.name,
            qty: order.qty,
            avg: order.price,
            product: "CNC",
          });
        }

        // Funds were already deducted when placing the order
      } else if (order.mode === "SELL" && currentPrice >= order.price) {
        // Sell Limit Hit
        executed = true;

        // Holdings were already deducted when placing the order

        // Add Funds
        const user = await User.findById(order.user);
        const orderValue = order.qty * order.price;
        user.funds += orderValue;
        user.tradeHistory.hasSold = true;
        await user.save();
      }

      if (executed) {
        order.status = "EXECUTED";
        order.price = currentPrice; // Record execution price
        await order.save();
      }
    }
  } catch (error) {
    console.error(`Error executing limit orders for ${symbol}:`, error);
  }
};

export const simulateMarketMovement = async () => {
  try {
    const now = new Date();
    const ist = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );

    const hour = ist.getHours();
    const minute = ist.getMinutes();
    const day = ist.getDay();

    // No weekends
    if (day === 0 || day === 6) return;

    const totalMin = hour * 60 + minute;

    const open = 7 * 60; // 07:00
    const close = 23 * 60; // 11 PM

    const preMarket = totalMin >= 360 && totalMin < 420;

    if (!preMarket && (totalMin < open || totalMin > close)) return;

    const stocks = await Stock.find({});
    const stockMap = new Map(stocks.map((s) => [s.symbol, s]));

    // LOOP ALL SYMBOLS
    for (const symbol of symbolsList) {
      const sector = sectorMap[symbol] || "GENERAL";
      let dbStock = stockMap.get(symbol);

      // FIRST INSERT
      if (!dbStock) {
        await Stock.create({
          symbol,
          name: symbol,
          price: initialPrices[symbol],
          previous_close: initialPrices[symbol],
          percent_change: "0.00",
          change: 0,
          tick_percent_change: 0,
          isDown: false,
          volume: 100000,
          didResetToday: false,
        });
        continue;
      }

      const previousClose = dbStock.previous_close;
      let price = dbStock.price;

      // DAILY RESET
      if (hour === 7 && minute < 2 && !dbStock.didResetToday) {
        dbStock.previous_close = price;
        dbStock.didResetToday = true;
        await dbStock.save();
      }

      if (hour !== 7 || minute > 2) {
        if (dbStock.didResetToday) {
          dbStock.didResetToday = false;
          await dbStock.save();
        }
      }

      // PRE-MARKET SMALL MOVES
      if (preMarket) {
        price += (price * (Math.random() * 0.02 - 0.01)) / 100;
      } else {
        let vol = getSectorVol(sector);

// MARKET NEWS
if (newsState.macroNewsImpact !== 0) {
  vol += newsState.macroNewsImpact;
}

// SECTOR NEWS
if (newsState.sectorNewsImpact[sector]) {
  vol += newsState.sectorNewsImpact[sector];
}

// STOCK NEWS
if (newsState.stockNewsImpact[symbol]) {
  vol += newsState.stockNewsImpact[symbol];
}

        // SENTIMENT
        vol += marketTrend * 0.015;

        // RANDOM NOISE
        vol += normal(0, 0.03);

        price += price * (vol / 100);

        // DECAY IMPACTS
if (newsState.macroNewsImpact !== 0)
  newsState.macroNewsImpact = decay(newsState.macroNewsImpact);

if (newsState.sectorNewsImpact[sector])
  newsState.sectorNewsImpact[sector] = decay(newsState.sectorNewsImpact[sector]);

if (newsState.stockNewsImpact[symbol])
  newsState.stockNewsImpact[symbol] = decay(newsState.stockNewsImpact[symbol]);

      }

      // CIRCUIT BREAKER (±5%)
      const upper = previousClose * 1.05;
      const lower = previousClose * 0.95;
      price = Math.min(upper, Math.max(lower, price));

      price = parseFloat(price.toFixed(2));

      const change = price - previousClose;
      const percentChange = ((change / previousClose) * 100).toFixed(2);
      const tickChange = price - dbStock.price;
      const tickPercent = (tickChange / dbStock.price) * 100;

      // VOLUME SIMULATION
      const volume = Math.abs(
        Math.floor(Math.random() * 50000 + Math.abs(tickChange * 2000))
      );

      // DB UPDATE
      await Stock.updateOne(
        { symbol },
        {
          $set: {
            price,
            change,
            percent_change: percentChange,
            isDown: change < 0,
            previous_close: previousClose,
            tick_percent_change: tickPercent,
            volume,
            updatedAt: new Date(),
          },
        }
      );

      // TRIGGERS
      await checkAndExecuteTriggers(symbol, price);
      await checkAndExecuteLimitOrders(symbol, price);
    }
  } catch (error) {
    console.error("[SIMULATION ERROR]", error);
  }
};

export const startStockScheduler = () => {
  console.log(
    "[StockService] Simulation Scheduler started. Interval: 10 seconds."
  );

  // Run immediately
  simulateMarketMovement();

  // Run every 10 seconds for a "Live" feel
  setInterval(simulateMarketMovement, 10000);
};
