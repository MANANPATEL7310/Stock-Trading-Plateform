import { Router } from "express";
import { Signup, Login, Logout, googleCallback, getUserProfile } from "../controllers/AuthController.js";
import { userVerification, verifyToken } from "../middlewares/AuthMiddleware.js";
import passport from "passport";

const router = Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/", userVerification);
router.get("/user", verifyToken, getUserProfile);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${process.env.FRONTEND_URL}/signup`, session: false }),
  googleCallback
);

export default router;
