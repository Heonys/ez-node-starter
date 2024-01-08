import { Request, Response, NextFunction } from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import { createUser } from "../models/user";
import { User } from "../models/user";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, nickname, password } = req.body;
  try {
    const targetUser = await User.findOne({ email });
    if (targetUser) return res.redirect("/");
    const hash = await bcrypt.hash(password, 10);
    await createUser({ email, nickname, provider: "local", password: hash });
    console.log("########## 회원가입 성공 ##########");
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (error: Error, user: typeof User) => {
    if (error) {
      console.error(error);
      return next(error);
    }
    if (!user) return res.redirect("/");

    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      console.log("########## 로그인 성공 ##########");
      return res.redirect("/");
    });
  })(req, res, next);
};

export const logout = (req: Request, res: Response) => {
  req.logOut(() => {
    console.log("########## 로그아웃 ##########");
    res.redirect("/");
  });
};
