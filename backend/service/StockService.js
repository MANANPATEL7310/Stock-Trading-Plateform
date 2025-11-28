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
  marketTrend = marketTrend * 0.98; 
  
  // Add random noise (New Sentiment)
  // Reduced chance of "News Event" to 1% (was 5%)
  if (Math.random() < 0.01) {
    marketTrend += getNormallyDistributedRandom(0, 1.5); 
  } else {
    marketTrend += getNormallyDistributedRandom(0, 0.2);
  }

  // Clamp trend to reasonable limits (-3 to +3)
  if (marketTrend > 3) marketTrend = 3;
  if (marketTrend < -3) marketTrend = -3;
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
      }
    }
  } catch (error) {
    console.error(`Error executing limit orders for ${symbol}:`, error);
  }
};

const simulateMarketMovement = async () => {
  try {
    // Market Hours Check (IST: 09:15 - 15:30)
    // Get current time in IST
    const now = new Date();
    const istDateString = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const istDate = new Date(istDateString);

    const hour = istDate.getHours();
    const minute = istDate.getMinutes();
    const day = istDate.getDay(); // 0 = Sunday, 6 = Saturday

    // Market Closed on Weekends
    if (day === 0 || day === 6) {
      // console.log("[StockService] Market Closed (Weekend)");
      return;
    }

    // Market Open: 07:00 - 23:00 IST (User Requested)
    const currentTimeInMinutes = hour * 60 + minute;
    const marketOpenTime = 7 * 60; // 07:00
    const marketCloseTime = 23 * 60; // 23:00

    if (currentTimeInMinutes < marketOpenTime || currentTimeInMinutes > marketCloseTime) {
      // console.log("[StockService] Market Closed (Hours: 07:00 - 23:00 IST)");
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
        // Check for New Day Reset logic
        // If it's exactly 7:00 AM (or close to it), we should ensure previous_close is set to yesterday's close (current price)
        
        const lastUpdateDate = new Date(stock.updatedAt);
        // Convert last update to IST to compare days
        const lastUpdateISTString = lastUpdateDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
        const lastUpdateIST = new Date(lastUpdateISTString);

        const isNewDay = lastUpdateIST.getDate() !== istDate.getDate() || lastUpdateIST.getMonth() !== istDate.getMonth();
        
        if (isNewDay || !stock.previous_close) {
          previousClose = stock.price;
          // console.log(`[StockService] New Day/Reset for ${symbol}. Resetting Previous Close to ${previousClose}`);
        } else {
          previousClose = stock.previous_close;
        }

        // Calculate Price Change
        // Volatility Logic:
        // 1. Base Volatility: 0.2% (Normal market movement)
        // 2. "Accident" Event: 0.5% chance of 3.0% swing (Unpredictable event)
        
        const isEvent = Math.random() < 0.005; // 0.5% chance (Rare)
        let volatility;
        let isNormal = true;

        if (isEvent) {
          volatility = 3.0; // 3.0% Standard Deviation (Big Swing/Accident)
          isNormal = false;
        } else {
          volatility = 0.2; // 0.2% Standard Deviation (Normal)
        }

        // Bias: marketTrend * 0.02
        const changePercent = getNormallyDistributedRandom(marketTrend * 0.02, volatility);
        
        let changeAmount = (stock.price * changePercent) / 100;

        // Cap normal changes to max 500 rupees
        // Cap normal changes to max 500 rupees
        if (isNormal) {
          // If the calculated change is too high (e.g. for expensive stocks), 
          // we don't just clamp it to 500 (which would make it look static).
          // Instead, we ensure it's a random value within the [-500, 500] range.
          
          if (changeAmount > 500) {
             // If calculated is > 500, pick a random value between 0 and 500
             // weighted towards the higher end to keep the "trend" but stay within limits.
             changeAmount = Math.random() * 500; 
          }
          if (changeAmount < -500) {
             changeAmount = -1 * (Math.random() * 500);
          }
        }

        newPrice = stock.price + changeAmount;
      } else {
        // First run
        newPrice = basePrice;
        previousClose = basePrice;
      }

      // CIRCUIT BREAKER LOGIC
      // Price cannot move more than +/- 20% from Previous Close
      const upperCircuit = previousClose * 1.20;
      const lowerCircuit = previousClose * 0.80;

      if (newPrice > upperCircuit) newPrice = upperCircuit;
      if (newPrice < lowerCircuit) newPrice = lowerCircuit;

      // Ensure price doesn't drop too low (absolute floor)
      if (newPrice < basePrice * 0.1) newPrice = basePrice * 0.1;

      // Calculate display metrics based on PREVIOUS CLOSE (Daily)
      const change = newPrice - previousClose; 
      const percentChange = ((change / previousClose) * 100).toFixed(2);
      const isDown = change < 0;

      // Calculate Tick Metrics (Instantaneous)
      const tickChange = newPrice - (stock ? stock.price : basePrice);
      const tickPercentChange = ((tickChange / (stock ? stock.price : basePrice)) * 100);

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
            tick_percent_change: tickPercentChange, 
            previous_close: previousClose, 
            isDown: isDown,
            updatedAt: new Date(), // This stores in UTC, which is fine as long as we convert to IST when reading
          },
        },
        { upsert: true, new: true }
      );

      // CHECK TRIGGERS AFTER UPDATE
      await checkAndExecuteTriggers(symbol, newPrice);

      // CHECK LIMIT ORDERS
      await checkAndExecuteLimitOrders(symbol, newPrice);
    }
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
