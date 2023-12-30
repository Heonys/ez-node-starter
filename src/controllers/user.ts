import { Request, Response } from "express";

export const signup = (req: Request, res: Response) => {
  return res.status(200).json({ message: "signup" });
};

export const login = (req: Request, res: Response) => {
  return res.status(200).json({ message: "logged In" });
};

export const logout = (req: Request, res: Response) => {
  return res.status(200).json({ message: "logged out" });
};
