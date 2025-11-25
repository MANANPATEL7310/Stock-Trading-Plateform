import { Schema, model } from "mongoose";

const StockSchema = new Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String, // e.g., "Apple Inc" or "AAPL"
  },
  price: {
    type: Number,
    required: true,
  },
  open: { type: Number },
  high: { type: Number },
  low: { type: Number },
  previous_close: { type: Number },
  volume: { type: Number },
  percent_change: {
    type: String, // e.g., "-0.16097"
  },
  change: {
    type: Number, // e.g., -0.23999
  },
  isDown: {
    type: Boolean,
    default: false,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Stock = model("Stock", StockSchema);

export default Stock;
