import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./router/user";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.set("port", process.env.PORT || 8080);

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.use("/user", userRouter);

app.use("/", (req: Request, res: Response) => {
  res.send("hello ez-node-starter");
});

app.use((err: Error, req: Request, res: Response) => {
  console.error(err);
  res.sendStatus(500);
});

app.listen(app.get("port"));
