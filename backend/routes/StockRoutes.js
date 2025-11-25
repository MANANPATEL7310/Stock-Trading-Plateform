import { Router } from "express";
import { getStocks } from "../controllers/StockController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const router = Router();

// We can choose to protect this route or keep it public. 
// Since the dashboard is protected, it's safer to protect this too.
// router.get("/allStocks", verifyToken, getStocks);
router.get("/allStocks", getStocks);

export default router;
