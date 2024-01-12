import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import hpp from "hpp";
import morgan from "morgan";
import nunjucks from "nunjucks";
import session from "express-session";
import passport from "passport";
import * as redis from "redis";
import RedisStore from "connect-redis";
import authRouter from "./router/auth";
import apiRouter from "./router/api";
import { config } from "./config";
import { connectDB } from "./schema";
import passportConfig from "./passport";
import websocket from "./util/socket";
import serverSiteEvent from "./util/sse";
import rateLimiter from "./middleware/rateLimiter";

const app = express();
passportConfig();
app.set("port", config.host.port || 8080);

// Initialize store.
const redisClient = redis.createClient({
  url: `redis://${config.redis.endpoint}`,
  password: config.redis.password,
  legacyMode: false,
});
redisClient.connect().catch(console.error);

app.use(
  session({
    secret: config.session.secretKey, // 세션을 암호화하기 위한 키
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    store: new RedisStore({ client: redisClient }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

if (process.env.NODE_ENV === "production") {
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(hpp());
  app.use(morgan("combined"));
  app.use(rateLimiter);
} else {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/auth", authRouter);
app.use("/api", apiRouter);

app.use(express.static(path.resolve(__dirname, "src/public")));
app.use("/", (req: Request, res: Response) => {
  res.render("index", { title: "ts-eznode-starter", message: "ts-eznode-starter" });
});
app.use((err: Error, req: Request, res: Response) => {
  console.error(err);
  res.sendStatus(500);
});

connectDB()
  .then(() => {
    const server = app.listen(app.get("port"));
    websocket(server);
    serverSiteEvent(server);
  })
  .catch(console.error);
