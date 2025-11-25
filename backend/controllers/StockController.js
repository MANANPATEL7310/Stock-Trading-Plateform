import Stock from "../schemas/StockSchema.js";

export const getStocks = async (req, res) => {
  try {
    // console.log("[StockController] Received request for /allStocks");
    const stocks = await Stock.find({}).sort({ updatedAt: -1 });
    // console.log(`[StockController] Found ${stocks.length} stocks`);
    res.json(stocks);
  } catch (error) {
    // console.error("[StockController] Error fetching stocks:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
