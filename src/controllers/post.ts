import { RequestHandler } from "express";
import { getAll } from "../models/post";

export const getAllPost: RequestHandler = async (req, res) => {
  const posts = await getAll();
  return res.status(200).json(posts);
};
