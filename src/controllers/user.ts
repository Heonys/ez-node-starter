import { Request, Response } from "express";
import { createUser } from "../models/user";

export const signup = async (req: Request, res: Response) => {
  const { name, age, password } = req.body;
  const userId = await createUser({ name, age, password });
  return res.status(200).json({ userId });
};

export const login = (req: Request, res: Response) => {
  return res.status(200).json({ message: "logged In" });
};

export const logout = (req: Request, res: Response) => {
  return res.status(200).json({ message: "logged out" });
};
