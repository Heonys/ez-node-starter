import express from "express";
import * as apiController from "../controllers/api";

const router = express.Router();

router.get("/user", apiController.getAllUser);

router.post("signup", apiController.signup);
router.post("login", apiController.login);
router.get("logout", apiController.logout);

export default router;
