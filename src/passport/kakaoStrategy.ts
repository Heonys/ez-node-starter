import passport from "passport";
import { Strategy } from "passport-kakao";
import { config } from "../util/config";
import { User } from "../models/user";

export default () => {
  passport.use(
    new Strategy(
      {
        clientID: config.auth.kakaoId,
        callbackURL: "/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const targetUser = await User.findOne({ snsId: profile.id, provider: "kakao" });
          console.log("targetUser ::", targetUser);
          if (targetUser) {
            done(null, targetUser);
          } else {
            const newUser = await User.create({
              email: profile._json.kakao_account.email,
              nickname: profile.displayName,
              snsId: profile.id,
              provider: "kakao",
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
