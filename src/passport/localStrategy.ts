import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import { User } from "../models/user";

export default () => {
  passport.use(
    new LocalStrategy.Strategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: false,
      },
      async (email, password, done) => {
        try {
          const targetUser = await User.findOne({ email });
          if (targetUser) {
            const result = await bcrypt.compare(password, targetUser.password);
            if (result) {
              done(null, targetUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다" });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원" });
          }
        } catch (error) {
          console.error(error);
          done(error, false, { message: "인증 오류" });
        }
      }
    )
  );
};
