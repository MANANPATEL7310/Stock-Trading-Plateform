import dotenv from 'dotenv';
if(process.env.Node_ENV!="production"){
  dotenv.config({path:'./.env'});
}

import express from 'express';
import mongoose from 'mongoose';



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



  








app.listen(PORT,()=>{
  console.log("Server started!");
})