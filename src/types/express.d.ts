/// <reference types="express" />
import { UserData } from "../models/user";

declare global {
  namespace Express {
    export interface User extends UserData {}
  }
}
