import Mongoose, { Schema, Types } from "mongoose";

export type PostsData = {
  author: Types.ObjectId;
  comment: string;
};

const postsSchema = new Schema<PostsData>({
  author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  comment: { type: String, required: true },
});

const Post = Mongoose.model("Post", postsSchema);

export async function getAll() {
  return Post.find().sort({ createdAt: -1 });
}

export async function getById(id: string) {
  return Post.findById(id);
}
