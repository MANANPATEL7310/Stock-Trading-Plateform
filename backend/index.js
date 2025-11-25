import dotenv from 'dotenv';
if(process.env.Node_ENV!=="production"){
  dotenv.config({path:'./.env'});
}

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/AuthRoutes.js";
import stockRoutes from "./routes/StockRoutes.js";
import {startStockScheduler} from "./service/StockService.js";
import passport from "./config/passportConfig.js";

import Holding from './model/HoldingsModel.js';
import Position from './model/PositionsModel.js';
import { userVerification, verifyToken } from './middlewares/AuthMiddleware.js';

const app=express();
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
  "http://localhost:5174",
  "http://localhost:5173",
];


app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
}));


 app.use(bodyParser.json());
 app.use(cookieParser());
 app.use(passport.initialize());

 app.use("/auth", authRoutes);
 app.use("/", stockRoutes); // Exposes /allStocks

 // Start Stock Scheduler
 startStockScheduler();

  app.get('/allHoldings', verifyToken, async(req,res)=>{
      try{
        let holdings=await Holding.find({});
        res.json(holdings);
      }
      catch(err){
        res.json({message:"Server Error"});
      }
  })

  app.get('/allPositions', verifyToken, async (req,res)=>{
    try{
      let positions=await Position.find({ });
      res.json(positions);
    }
    catch(err){
      res.json({message:"Server Error"});
    }
  })  

app.listen(PORT,()=>{
  console.log("Server started!");
})