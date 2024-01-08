import express from "express";
import * as userController from "../controllers/user";
import { isLoggedIn, isNotLoggedIn } from "../middleware/auth";
import passport from "passport";

const router = express.Router();

router.post("/signup", isNotLoggedIn, userController.signup);
router.post("/login", isNotLoggedIn, userController.login);
router.get("/logout", isLoggedIn, userController.logout);

// 카카오 로그인 요청
router.get("/kakao", passport.authenticate("kakao"));
// 카카오 로그인 화면에서 돌아오는 요청
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => res.redirect("/")
);

export default router;
