import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from "passport-jwt";
import User from "../models/user";


let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "wolfjobs",
};

passport.use(
  new JWTStrategy(opts, function (jwtPayload, done) {
    User.findById(jwtPayload._id, function (err, user) {
      if (err) {
        console.log("Error in finding user from JWT");
        return;
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
