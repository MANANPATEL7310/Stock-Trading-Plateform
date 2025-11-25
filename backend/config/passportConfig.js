import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { Strategy as LocalStrategy } from "passport-local";
// import bcrypt from "bcryptjs";
import User from "../model/UserModel.js";
import dotenv from "dotenv";

dotenv.config();

// passport.use(
//   new LocalStrategy(async (username, password, done) => {
//     try {
//       const user = await User.findOne({ username });
//       if (!user) {
//         return done(null, false, { message: "Incorrect username" });
//       }
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return done(null, false, { message: "Incorrect password" });
//       }
//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   })
// );

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user);
        }
        user = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          username: profile.displayName,
        });
        await user.save();
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
