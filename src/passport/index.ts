import passport from "passport";
import local from "./localStrategy";
import kakao from "./kakaoStrategy";
import { User } from "../models/user";

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((_id, done) => {
    User.findOne({ _id })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
  kakao();
};
