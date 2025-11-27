import User from "../model/UserModel.js";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

export const userVerification = (req, res) => {
  const token = req.cookies.token;
  
  // DEBUG: Log incoming cookies
  console.log("UserVerification: Cookies received:", req.cookies);

  if (!token) {
    console.log("UserVerification: No token found");
    return res.json({ status: false });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) return res.json({ status: false });

    const user = await User.findById(data.id);
    if (user) return res.json({ status: true, user: user.username });

    return res.json({ status: false });
  });
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ message: "You need to signup first" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ message: "You need to signup first" });
    }

    const user = await User.findById(data.id);
    if (!user) {
      return res.json({ message: "You need to signup first" });
    }

    req.user = user;
    next();
  });
};
