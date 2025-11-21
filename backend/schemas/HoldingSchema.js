import {Schema} from 'mongoose';

const HoldingSchema=new Schema({
    name:String,
    qty: Number,
    avg: Number,
    price:Number,
    net: String,
    day: String,
    isLoss:Boolean
});

export default HoldingSchema;



// ! if we use the "require" and "module.exports" syntax instead of import and export then it will give error while using ES6 features.


// !  for use of the "import" and "export" syntax. we need only add the "type": "module" in package.json file.