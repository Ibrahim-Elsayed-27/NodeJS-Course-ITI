import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "./post.controller.js";

const postRoutes = express.Router();

postRoutes.get("/posts", getPosts);
postRoutes.post("/posts", createPost);
postRoutes.put("/posts/:id", updatePost);
postRoutes.delete("/posts/:id", deletePost);

export default postRoutes;
