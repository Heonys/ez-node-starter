import Mongoose from "mongoose";
import { config } from "../config";

export async function connectDB() {
  return Mongoose.connect(config.db.host);
}

Mongoose.connection.on("error", (error) => {
  console.error("conect error", error);
});

Mongoose.connection.on("disconnected", () => {
  console.error("disconnected");
  connectDB();
});
