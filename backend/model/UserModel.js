import { model } from "mongoose";
import UserSchema from "../schemas/UserSchema.js";

const User = model("User", UserSchema);

export default User;
