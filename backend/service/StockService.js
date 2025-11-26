import Stock from "../schemas/StockSchema.js";
import Holding from "../model/HoldingsModel.js";
import Order from "../model/OrdersModel.js";
import User from "../model/UserModel.js";
import { initialPrices, symbolsList } from "../data/stocks.js";

// Market Sentiment State
// Range: -3.0 (Crash) to +3.0 (Boom). 0 is Neutral.
let marketTrend = 0; 

// Helper: Box-Muller Transform for Normal Distribution
const getNormallyDistributedRandom = (mean, stdDev) => {
  const u = 1 - Math.random(); // Converting [0,1) to (0,1]
  const v = Math.random();
  const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  // z is standard normal (mean 0, stdDev 1)
  return z * stdDev + mean;
};

// Update Market Trend periodically (Simulate News Cycles)
setInterval(() => {
  // Decay existing trend (Mean Reversion)
  // This pulls the trend back towards 0 over time, preventing permanent crashes/booms
  marketTrend = marketTrend * 0.98; 
  
  // Add random noise (New Sentiment)
  // 5% chance of a "News Event" (larger shift)
  if (Math.random() < 0.05) {
    marketTrend += getNormallyDistributedRandom(0, 1.5); 
    // console.log(`[Market Sentiment] NEWS EVENT! Trend adjusted to ${marketTrend.toFixed(2)}`);
  } else {
    marketTrend += getNormallyDistributedRandom(0, 0.2);
  }

  // Clamp trend to reasonable limits (-3 to +3)
  if (marketTrend > 3) marketTrend = 3;
  if (marketTrend < -3) marketTrend = -3;

  // console.log(`[Market Sentiment] Current Trend: ${marketTrend.toFixed(2)}`);
}, 60000); // Update trend every minute

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

          console.log(`[AutoTrade] Executed ${triggerType} Sell for ${symbol} @ ${currentPrice} (User: ${user.username})`);
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
      type: "LIMIT" 
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
          const newAvg = ((holding.avg * holding.qty) + (order.price * order.qty)) / newQty;
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
        // console.log(`[StockService] Limit Order Executed for ${symbol} @ ${currentPrice}`);
      }
    }
  } catch (error) {
    console.error(`Error executing limit orders for ${symbol}:`, error);
  }
};

const simulateMarketMovement = async () => {
  try {
    // Market Hours Check (7 AM to 11 PM) & Weekends (Sat/Sun)
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday

    if (day === 0 || day === 6 || hour < 7 || hour >= 23) {
      // console.log("[StockService] Market Closed (Hours: 07:00 - 23:00, Mon-Fri)");
      return;
    }

    // 1. Fetch all existing stocks from DB
    const stocks = await Stock.find({});
    
    // 2. Create a map of existing stocks for quick lookup
    const stockMap = new Map(stocks.map(s => [s.symbol, s]));

    // 3. Iterate through ALL symbols in our list
    for (const symbol of symbolsList) {
      let stock = stockMap.get(symbol);
      let newPrice;
      let basePrice = initialPrices[symbol];
      let previousClose = basePrice;

      if (stock) {
        // Check for New Day Reset OR Missing Previous Close
        const lastUpdateDate = new Date(stock.updatedAt);
        const isNewDay = lastUpdateDate.getDate() !== now.getDate() || lastUpdateDate.getMonth() !== now.getMonth();
        
        // If it's a new day, OR previous_close is missing/zero, reset it.
        if (isNewDay || !stock.previous_close) {
          previousClose = stock.price;
          // console.log(`[StockService] New Day/Reset for ${symbol}. Resetting Previous Close to ${previousClose}`);
        } else {
          previousClose = stock.previous_close;
        }

        // Calculate Price Change
        // Volatility Logic:
        // 1. Base Volatility: 0.5% (Small, realistic ticks)
        // 2. High Volatility Jump: 20% chance of 5-10% swing (Big moves, ~100-300 rupees)
        
        const isHighVolatility = Math.random() < 0.2; // 20% chance of a "Jump"
        let volatility;

        if (isHighVolatility) {
          volatility = 8.0; // 8% Standard Deviation (Big Swing)
          // console.log(`[StockService] High Volatility Jump for ${symbol}!`);
        } else {
          volatility = 0.5; // 0.5% Standard Deviation (Normal Tick)
        }

        // Bias: marketTrend * 0.05 (stronger bias to drive the jumps)
        const changePercent = getNormallyDistributedRandom(marketTrend * 0.05, volatility);
        
        const changeAmount = (stock.price * changePercent) / 100;
        newPrice = stock.price + changeAmount;
      } else {
        // First run
        newPrice = basePrice;
        previousClose = basePrice;
      }

      // Ensure price doesn't drop too low (e.g., below 10% of base)
      if (newPrice < basePrice * 0.1) newPrice = basePrice * 0.1;

      // Calculate display metrics based on PREVIOUS CLOSE (Daily)
      const change = newPrice - previousClose; 
      const percentChange = ((change / previousClose) * 100).toFixed(2);
      const isDown = change < 0;

      // Calculate Tick Metrics (Instantaneous)
      // This is the change from the LAST 10s update, not the daily open
      const tickChange = newPrice - stock.price;
      const tickPercentChange = ((tickChange / stock.price) * 100);

      // Update DB
      await Stock.findOneAndUpdate(
        { symbol: symbol },
        {
          $set: {
            symbol: symbol,
            name: symbol, 
            price: parseFloat(newPrice.toFixed(2)),
            percent_change: percentChange,
            change: parseFloat(change.toFixed(2)),
            tick_percent_change: tickPercentChange, // Save tick change for sorting
            previous_close: previousClose, // Store for next iteration
            isDown: isDown,
            updatedAt: new Date(),
          },
        },
        { upsert: true, new: true }
      );

      // CHECK TRIGGERS AFTER UPDATE
      await checkAndExecuteTriggers(symbol, newPrice);

      // CHECK LIMIT ORDERS
      await checkAndExecuteLimitOrders(symbol, newPrice);
    }
    // console.log("[StockService] Market simulated successfully.");
  } catch (error) {
    console.error("[StockService] Error simulating market:", error);
  }
};

export const startStockScheduler = () => {
  console.log("[StockService] Simulation Scheduler started. Interval: 10 seconds.");
  
  // Run immediately
  simulateMarketMovement();

  // Run every 10 seconds for a "Live" feel
  setInterval(simulateMarketMovement, 10000);
};
