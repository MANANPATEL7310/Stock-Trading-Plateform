import {Schema} from 'mongoose';

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  mode: {
    type: String,
    enum: ["BUY", "SELL"],
    required: true,
  },
  type: {
    type: String,
    enum: ["MARKET", "LIMIT"],
    default: "MARKET",
  },
  status: {
    type: String,
    enum: ["PENDING", "EXECUTED", "CANCELLED", "REJECTED"],
    default: "EXECUTED",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default OrderSchema;

