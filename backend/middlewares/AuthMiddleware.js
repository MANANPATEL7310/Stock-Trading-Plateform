import User from "../model/UserModel.js";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

export const userVerification = (req, res) => {
  console.log("AuthMiddleware: userVerification called");
  const token = req.cookies.token;
  console.log("AuthMiddleware: Token from cookies:", token);

  if (!token) {
    console.log("AuthMiddleware: No token found in cookies");
    return res.json({ status: false });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      console.log("AuthMiddleware: JWT verification failed:", err.message);
      return res.json({ status: false });
    }

    console.log("AuthMiddleware: JWT verified, payload:", data);
    const user = await User.findById(data.id);
    if (user) {
      console.log("AuthMiddleware: User found:", user.username);
      return res.json({ status: true, user: user.username });
    }

    console.log("AuthMiddleware: User not found in DB");
    return res.json({ status: false });
  });
};

export const verifyToken = (req, res, next) => {
  console.log("AuthMiddleware: verifyToken called");
  const token = req.cookies.token;
  console.log("AuthMiddleware: Token from cookies:", token);

  if (!token) {
    console.log("AuthMiddleware: No token, returning 'You need to signup first'");
    return res.json({ message: "You need to signup first" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      console.log("AuthMiddleware: JWT verification failed:", err.message);
      return res.json({ message: "You need to signup first" });
    }

    const user = await User.findById(data.id);
    if (!user) {
      console.log("AuthMiddleware: User not found in DB");
      return res.json({ message: "You need to signup first" });
    }

    console.log("AuthMiddleware: User verified:", user.username);
    req.user = user;
    next();
  });
};
