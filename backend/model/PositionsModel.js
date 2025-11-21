import { model } from "mongoose";
import PositionSchema from "../schemas/PositionSchema.js";

const Position=model('Position', PositionSchema);

export default Position;