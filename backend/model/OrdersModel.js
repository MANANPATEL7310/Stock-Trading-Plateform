import {model} from 'mongoose';
import OrderSchema from "../schemas/OrderSchema.js";



const Order=model("Order",OrderSchema);

export default Order;