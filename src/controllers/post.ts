import { Request, Response } from "express";
import { getAll } from "../models/post";

export async function getTweet(req: Request, res: Response) {
  const posts = await getAll();
  return res.status(200).json(posts);
}
