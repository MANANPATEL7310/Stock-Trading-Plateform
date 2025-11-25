import {Schema} from 'mongoose';

const HoldingSchema=new Schema({
    name:String,
    qty: Number,
    avg: Number,
    price:Number,
    net: String,
    day: String,
    isLoss:Boolean,
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
});

export default HoldingSchema;