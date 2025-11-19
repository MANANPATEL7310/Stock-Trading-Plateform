if(process.env.Node_ENV!="production"){
  require('dotenv').config({path:'./.env'});
}


const express=require('express');
const app=express();
const PORT=process.env.PORT || 5000;
const mongoose = require("mongoose");


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