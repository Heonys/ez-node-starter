import dotenv from "dotenv";
dotenv.config();

function required(key: string, defaultValue: any = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} id undefined`);
  }
  return value;
}

export const config = {
  db: {
    key: required("CLUSTER_KEY"),
  },
  host: {
    port: required("PORT"),
  },
  session: {
    secretKey: required("SECRET_KEY"),
  },
  auth: {
    kakaoId: required("KAKAO_ID"),
  },
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInSec: parseInt(required("JWT_EXPIRES_SEC")),
  },
  redis: {
    endpoint: required("REDIS_ENDPOINT"),
    password: required("REDIS_PASWORD"),
  },
  rateLimit: {
    windowMs: 60000,
    maxRequest: 10,
  },
};
