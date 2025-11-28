import dotenv from 'dotenv';
if(process.env.NODE_ENV!=="production"){
  dotenv.config({path:'./.env'});
}

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/AuthRoutes.js";
import stockRoutes from "./routes/StockRoutes.js";
import tradeRoutes from "./routes/TradeRoutes.js";
import {startStockScheduler} from "./service/StockService.js";
import passport from "./config/passportConfig.js";

import { verifyToken } from './middlewares/AuthMiddleware.js';

const app=express();
app.set("trust proxy", 1); // Trust Render's load balancer
const PORT=process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

async function main(){
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => console.log(err));

const allowedOrigins = [
  process.env.DASHBOARD_URL,
  process.env.FRONTEND_URL,
  process.env.DASHBOARD_URL?.replace(/\/$/, ""),
  process.env.FRONTEND_URL?.replace(/\/$/, "")
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/", stockRoutes); // Exposes /allStocks
app.use("/api", tradeRoutes); // Exposes /api/funds, /api/order/buy, etc.

// Start Stock Scheduler
startStockScheduler();

app.listen(PORT,()=>{
  console.log("Server started!");
})


export default app;
