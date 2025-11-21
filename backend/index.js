import dotenv from 'dotenv';
if(process.env.Node_ENV!="production"){
  dotenv.config({path:'./.env'});
}

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import Holding from './model/HoldingsModel.js';
import Position from './model/PositionsModel.js';

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


 app.use(cors());
 app.use(bodyParser.json());

  app.get('/allHoldings',async(req,res)=>{
    try{
      let holdings=await Holding.find({});
      res.json(holdings);
    }
    catch(err){
      res.json({message:"Server Error"});
    }
  })

  app.get('/allPositions',async (req,res)=>{
    try{
      let positions=await Position.find({});
      res.json(positions);
    }
    catch(err){
      res.json({message:"Server Error"});
    }
  })  

  







app.listen(PORT,()=>{
  console.log("Server started!");
})