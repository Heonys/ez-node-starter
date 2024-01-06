import Mongoose, { Schema } from "mongoose";

export type UserData = {
  name: string;
  age: number;
  password: string;
};

const userSchema = new Schema<UserData>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
});

const User = Mongoose.model("User", userSchema);

export async function createUser(user: UserData) {
  return new User(user).save().then((data) => data.id);
}

export async function findByUsername(name: string) {
  return User.findOne({ name });
}

export async function findById(id: string) {
  return User.findById(id);
}
