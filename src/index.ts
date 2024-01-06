import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import nunjucks from "nunjucks";
import session from "express-session";
import userRouter from "./router/user";
import { config } from "./config";
import { connectDB } from "./schema";

const app = express();
app.set("port", config.host.port || 8080);

app.use(
  session({
    secret: config.session.secretKey, // 세션을 암호화하기 위한 키
    resave: true, // 세션 데이터가 변경되지 않아도 항상 저장
    saveUninitialized: true, // 초기화되지 않은 세션도 저장
    // cookie: { secure: false }, // HTTPS에서만 쿠키 전송 여부 (배포 환경에서는 true로 설정하는 것이 안전)
  })
);
connectDB();

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  autoescape: true,
  watch: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use("/user", userRouter);

app.use("/", (req: Request, res: Response) => {
  res.render("index", { title: "Nunjucks Example", message: "Hello, Nunjucks!" });
});

app.use((err: Error, req: Request, res: Response) => {
  console.error(err);
  res.sendStatus(500);
});

app.listen(app.get("port"));
