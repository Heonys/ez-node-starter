import Mongoose from "mongoose";
import bluebird from "bluebird";
import { config } from "../util/config";

export async function connectDB() {
  Mongoose.Promise = bluebird;
  return Mongoose.connect(config.db.key);
}

Mongoose.connection.on("error", (error) => {
  console.error("conect error", error);
});

Mongoose.connection.on("disconnected", () => {
  console.error("disconnected");
  connectDB();
});
