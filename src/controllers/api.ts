import type { Response, RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, createUser, findByEmail } from "../models/user";
import { config } from "../config";

const jwtSecretKey = config.jwt.secretKey;
const jwtExpiresInSec = config.jwt.expiresInSec;

export const getAllUser: RequestHandler = async (req, res) => {
  const user = await User.find();
  return res.status(200).json(user);
};

export const signup: RequestHandler = async (req, res) => {
  const { email, nickname, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await createUser({ email, nickname, provider: "local", password: hash });
  const token = createJwtToken(user);
  setToken(res, token);
  return res.status(200).json(user);
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await findByEmail(email);
  if (!user) return res.status(401).json({ message: "Invalid email or password" });
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return res.status(401).json({ message: "Invalid email or password" });
  const token = createJwtToken(user._id);
  setToken(res, token);
  return res.status(200).json({ token, user });
};

export const logout: RequestHandler = (req, res) => {
  return res.cookie("token", ""), res.status(200).json({ message: "User has been logged out" });
};

function createJwtToken(id: any) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInSec });
}

function setToken(res: Response, token: string) {
  const options: any = {
    maxAge: jwtExpiresInSec * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  res.cookie("token", token, options);
}
