import User from "../model/UserModel.js";
import { createSecretToken } from "../util/SecretToken.js";
import bcrypt from "bcryptjs";

export const Signup = async (req, res) => {
  console.log("AuthController: Signup called");
  try {
    const { email, password, username, createdAt } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("AuthController: User already exists");
      return res.json({ message: "User already exists" });
    }

    const user = await User.create({
      email,
      password,
      username,
      createdAt,
    });

    const token = createSecretToken(user._id);
    console.log("AuthController: Setting cookie for new user");
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User signed in successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error("AuthController: Signup error:", error);
  }
};

export const Login = async (req, res) => {
  console.log("AuthController: Login called");
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("AuthController: Login failed - User not found");
      return res.json({ message: "Incorrect password or email" });
    }

    // FIX Google OAuth user
    if (!user.password) {
      console.log("AuthController: Login failed - Google account");
      return res.json({
        message: "This account was created using Google. Please login with Google.",
      });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      console.log("AuthController: Login failed - Incorrect password");
      return res.json({ message: "Incorrect password or email" });
    }

    const token = createSecretToken(user._id);

    console.log("AuthController: Setting cookie for login");
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User logged in successfully",
      success: true,
    });
  } catch (error) {
    console.error("AuthController: Login error:", error);
  }
};

export const Logout = (req, res) => {
  console.log("AuthController: Logout called - Clearing cookie");
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  return res.status(200).json({ message: "Logged out successfully" });
};

export const googleCallback = (req, res) => {
  console.log("AuthController: googleCallback called");
  const token = createSecretToken(req.user._id);

  console.log("AuthController: Setting cookie for Google login");
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 3 * 24 * 60 * 60 * 1000,
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
