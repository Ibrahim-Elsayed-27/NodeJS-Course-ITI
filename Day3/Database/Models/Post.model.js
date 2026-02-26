import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: String,
    content: String,
  },
  { timestamps: true },
);

export const postModel = mongoose.model("Post", postSchema);
