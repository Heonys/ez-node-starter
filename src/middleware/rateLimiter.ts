import rateLimit from "express-rate-limit";
import { config } from "../config";

export default rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequest,
  message: "Too many requests from this IP, please try again later.",
});
