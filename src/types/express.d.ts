import { UserData } from "../models/user";

declare global {
  namespace Express {
    interface User extends UserData {}
  }
}