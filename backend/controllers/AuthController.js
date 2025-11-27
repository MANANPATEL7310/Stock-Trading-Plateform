import User from "../model/UserModel.js";
import { createSecretToken } from "../util/SecretToken.js";
import bcrypt from "bcryptjs";

export const Signup = async (req, res) => {
  try {
    const { email, password, username, createdAt } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const user = await User.create({
      email,
      password,
      username,
      createdAt,
    });

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      path: "/",
      withCredentials: true,
    });

    return res.status(201).json({
      message: "User signed in successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }

    // FIX Google OAuth user
    if (!user.password) {
      return res.json({
        message: "This account was created using Google. Please login with Google.",
      });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      path: "/",
      withCredentials: true,
    });

    return res.status(201).json({
      message: "User logged in successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};

export const Logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
};

export const googleCallback = (req, res) => {
  const token = createSecretToken(req.user._id);

  res.cookie("token", token, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    path: "/",
    withCredentials: true,
  });

  return res.redirect(`${process.env.DASHBOARD_URL}`);
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    return res.json({
      username: user.username,
      email: user.email,
      _id: user._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
