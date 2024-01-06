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
  host: {
    port: required("PORT", 8080),
  },
  session: {
    secretKey: required("SECRET_KEY"),
  },
};
