import Mongoose, { Schema } from "mongoose";

export type UserData = {
  _id?: number;
  email: string;
  nickname: string;
  password: string;
  provider: "local" | "kakao";
  snsId?: string;
};

const userSchema = new Schema<UserData>({
  email: { type: String, required: false },
  nickname: { type: String, required: true },
  password: { type: String, required: false },
  provider: { type: String, require: false, enum: ["local", "kakao"], default: "local" },
  snsId: { type: String, require: false },
});

export const User = Mongoose.model("User", userSchema);

export async function createUser(user: UserData) {
  return new User(user).save().then((data) => data._id);
}

export async function findByEmail(email: string) {
  return User.findOne({ email });
}

export async function findById(id: string) {
  return User.findById(id);
}
