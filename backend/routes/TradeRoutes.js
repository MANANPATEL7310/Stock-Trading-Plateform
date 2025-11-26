import { Router } from "express";
import {
  getFunds,
  withdrawFunds,
  placeOrder,
  getOrders,
  getHoldings,
  getPositions,
  setTriggers,
  squareOff,
} from "../controllers/TradeController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const router = Router();

// Protect all trade routes
router.use(verifyToken);

router.get("/funds", getFunds);
router.post("/funds/withdraw", withdrawFunds);
router.post("/order/buy", placeOrder);
router.post("/order/sell", placeOrder);
router.get("/orders", getOrders);
router.get("/holdings", getHoldings);
router.get("/positions", getPositions);
router.post("/setTriggers", setTriggers);
router.post("/squareOff", squareOff);

export default router;
