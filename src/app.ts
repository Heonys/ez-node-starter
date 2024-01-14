import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import hpp from "hpp";
import morgan from "morgan";
import compression from "compression";
import errorHandler from "errorhandler";
import nunjucks from "nunjucks";
import session from "express-session";
import passport from "passport";
import rateLimiter from "./middleware/rateLimiter";

// Redis
import * as redis from "redis";
import RedisStore from "connect-redis";

// Router
import authRouter from "./router/auth";
import apiRouter from "./router/api";

// configuration
import { config } from "./util/config";
import passportConfig from "./passport";

const app = express();
app.set("port", config.host.port || 8080);
passportConfig();

const redisClient = redis.createClient({
  url: `redis://${config.redis.endpoint}`,
  password: config.redis.password,
  legacyMode: false,
});
redisClient.connect().catch(console.error);

app.use(
  session({
    secret: config.session.secretKey,
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
  app.use(errorHandler());
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(cors({ origin: true, credentials: true }));

app.use("/auth", authRouter);
app.use("/api", apiRouter);

app.use(express.static(path.join(__dirname, "public")));

app.use("/", (req: Request, res: Response) => {
  res.render("index", { title: "ts-eznode-starter", message: "ts-eznode-starter" });
});
app.use((err: Error, req: Request, res: Response) => {
  console.error(err);
  res.sendStatus(500);
});

export default app;
