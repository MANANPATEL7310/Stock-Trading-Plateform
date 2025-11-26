import User from "../model/UserModel.js";
import Order from "../model/OrdersModel.js";
import Holding from "../model/HoldingsModel.js";
import Stock from "../schemas/StockSchema.js";

// Get User Funds
export const getFunds = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ funds: user.funds });
  } catch (error) {
    console.error("Error fetching funds:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Withdraw Funds
export const withdrawFunds = async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Validation: Check trade history
    if (!user.tradeHistory.hasBought || !user.tradeHistory.hasSold) {
      return res.status(403).json({
        message: "You must perform at least one Buy and one Sell order to withdraw funds.",
      });
    }

    // Validation: Check balance
    if (user.funds < amount) {
      return res.status(400).json({ message: "Insufficient funds." });
    }

    user.funds -= amount;
    await user.save();

    res.json({ message: "Withdrawal successful", funds: user.funds });
  } catch (error) {
    console.error("Error withdrawing funds:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Place Order (Buy/Sell)

export const placeOrder = async (req, res) => {
  try {
    const { symbol, qty, price, mode, type = "MARKET" } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    const orderValue = qty * price;

    if (mode === "BUY") {
      // Check Funds
      if (user.funds < orderValue) {
        return res.status(400).json({ message: "Insufficient funds" });
      }
      
      // Deduct funds immediately (Block margin)
      user.funds -= orderValue;
      user.tradeHistory.hasBought = true;
      await user.save();

      if (type === "MARKET") {
        // Execute immediately
        let holding = await Holding.findOne({ user: userId, symbol });
        if (holding) {
          const newQty = holding.qty + qty;
          const newAvg = ((holding.avg * holding.qty) + (price * qty)) / newQty;
          holding.qty = newQty;
          holding.avg = newAvg;
          await holding.save();
        } else {
          await Holding.create({
            user: userId,
            symbol,
            name: symbol,
            qty,
            avg: price,
            product: "CNC",
          });
        }
      } 
      // If LIMIT, we don't update Holdings yet. We just created the PENDING order below.

    } else if (mode === "SELL") {
      // Check Holdings
      const holding = await Holding.findOne({ user: userId, symbol });
      if (!holding || holding.qty < qty) {
        return res.status(400).json({ message: "Insufficient holdings" });
      }

      // Deduct holdings immediately (Block shares)
      holding.qty -= qty;
      if (holding.qty === 0 && type === "MARKET") {
        await Holding.deleteOne({ _id: holding._id });
      } else {
        await holding.save();
      }

      if (type === "MARKET") {
        // Add funds immediately
        user.funds += orderValue;
        user.tradeHistory.hasSold = true;
        await user.save();
      }
      // If LIMIT, we don't add funds yet.
    }

    // Create Order
    const newOrder = await Order.create({
      user: userId,
      symbol,
      name: symbol,
      qty,
      price,
      mode,
      type,
      status: type === "MARKET" ? "EXECUTED" : "PENDING",
    });

    res.status(201).json({ 
      message: `${type} Order Placed Successfully`, 
      funds: user.funds,
      order: newOrder 
    });

  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Orders
export const getOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // 1. Fetch Regular Orders
    const orders = await Order.find({ user: userId }).lean();

    // 2. Fetch Active GTTs (Holdings with triggers)
    const gttHoldings = await Holding.find({
      user: userId,
      $or: [{ target: { $ne: null } }, { stopLoss: { $ne: null } }],
    }).lean();

    // 3. Convert GTTs to Order-like objects
    const gttOrders = gttHoldings.map(h => ({
      _id: h._id, // Use holding ID as temporary Order ID
      user: h.user,
      symbol: h.symbol,
      name: h.name,
      qty: h.qty,
      price: h.target || h.stopLoss, // Show Target (preferred) or StopLoss
      mode: "SELL",
      type: "GTT", // Special type for UI
      status: "PENDING",
      createdAt: h.updatedAt, // Use last update time
      isGTT: true, // Flag for UI
      target: h.target,
      stopLoss: h.stopLoss
    }));

    // 4. Merge and Sort
    const allOrders = [...orders, ...gttOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(allOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Holdings
export const getHoldings = async (req, res) => {
  try {
    const holdings = await Holding.find({ user: req.user._id });
    res.json(holdings);
  } catch (error) {
    console.error("Error fetching holdings:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Positions (Today's Activity)
export const getPositions = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch orders created today
    const orders = await Order.find({
      user: req.user._id,
      createdAt: { $gte: today },
    });

    // Aggregate orders by symbol
    const positions = {};

    orders.forEach((order) => {
      if (!positions[order.symbol]) {
        positions[order.symbol] = {
          product: "CNC", // Defaulting to CNC for now as we don't have product selection yet
          name: order.name,
          symbol: order.symbol,
          qty: 0,
          avg: 0,
          price: order.price, // Use last order price as LTP proxy if needed, but frontend has live data
          buyQty: 0,
          buyValue: 0,
          sellQty: 0,
          sellValue: 0,
        };
      }

      if (order.mode === "BUY") {
        positions[order.symbol].qty += order.qty;
        positions[order.symbol].buyQty += order.qty;
        positions[order.symbol].buyValue += order.qty * order.price;
      } else {
        positions[order.symbol].qty -= order.qty;
        positions[order.symbol].sellQty += order.qty;
        positions[order.symbol].sellValue += order.qty * order.price;
      }
    });

    // Calculate Average Price for Buy positions (standard convention)
    const positionList = Object.values(positions).map((pos) => {
      if (pos.buyQty > 0) {
        pos.avg = pos.buyValue / pos.buyQty;
      }
      return pos;
    }).filter(pos => pos.qty !== 0); // Filter out closed positions

    res.json(positionList);
  } catch (error) {
    console.error("Error fetching positions:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Set Triggers (Target / StopLoss)
export const setTriggers = async (req, res) => {
  try {
    const { holdingId, target, stopLoss } = req.body;
    const userId = req.user._id;

    const holding = await Holding.findOneAndUpdate(
      { _id: holdingId, user: userId },
      { $set: { target, stopLoss } },
      { new: true }
    );

    if (!holding) {
      return res.status(404).json({ message: "Holding not found" });
    }

    res.json({ message: "Triggers set successfully", holding });
  } catch (error) {
    console.error("Error setting triggers:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Square Off Position (Exit immediately)
export const squareOff = async (req, res) => {
  try {
    const { symbol } = req.body;
    const userId = req.user._id;

    // 1. Calculate Net Position
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const orders = await Order.find({ user: userId, symbol, createdAt: { $gte: today } });

    let netQty = 0;
    orders.forEach(order => {
      if (order.mode === "BUY") netQty += order.qty;
      else netQty -= order.qty;
    });

    if (netQty === 0) {
      return res.status(400).json({ message: "Position is already closed." });
    }

    // 2. Determine Order Mode
    const mode = netQty > 0 ? "SELL" : "BUY";
    const qty = Math.abs(netQty);

    // 3. Get Current Price
    const stock = await Stock.findOne({ symbol });
    const currentPrice = stock ? stock.price : 0; // Should ideally fetch live price if stock not found

    if (currentPrice === 0) {
      return res.status(400).json({ message: "Could not fetch current price." });
    }

    // 4. Place Order (Reuse placeOrder logic or duplicate for simplicity)
    // We'll duplicate minimal logic here to avoid circular dependency or complex refactoring
    const user = await User.findById(userId);
    const orderValue = currentPrice * qty;

    if (mode === "BUY") {
       if (user.funds < orderValue) return res.status(400).json({ message: "Insufficient funds" });
       user.funds -= orderValue;
       user.tradeHistory.hasBought = true;
    } else {
       user.funds += orderValue;
       user.tradeHistory.hasSold = true;
    }
    await user.save();

    await Order.create({
      user: userId,
      symbol,
      name: stock ? stock.name : symbol,
      qty,
      price: currentPrice,
      mode,
    });

    // Update Holdings (if applicable)
    // Note: Intraday positions might not affect "Holdings" in the same way if we separate them strictly.
    // But in our current simplified model, everything goes through Holdings.
    // So we must update Holdings to reflect the exit.
    
    const holding = await Holding.findOne({ user: userId, symbol });
    if (mode === "SELL") {
      if (holding) {
        holding.qty -= qty;
        if (holding.qty <= 0) await Holding.deleteOne({ _id: holding._id });
        else await holding.save();
      }
    } else {
      // Buying to cover short (not fully supported but logic is here)
      if (holding) {
         // ... averaging logic ...
         // For simplicity, let's assume we are just closing a Long position for now.
      }
    }

    res.json({ message: `Square off successful. ${mode} ${qty} ${symbol} @ ${currentPrice}` });

  } catch (error) {
    console.error("Error squaring off:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
