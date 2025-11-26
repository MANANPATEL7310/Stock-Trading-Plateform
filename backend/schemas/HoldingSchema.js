import {Schema} from 'mongoose';

const HoldingSchema = new Schema({
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
  avg: {
    type: Number,
    required: true,
  },
  target: {
    type: Number,
    default: null,
  },
  stopLoss: {
    type: Number,
    default: null,
  },
});

export default HoldingSchema;