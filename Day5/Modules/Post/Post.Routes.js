import express from "express";
import {
  createPost,
  deletePost,
  updatePost,
  viewPosts,
} from "./Post.Controller.js";
import verifyToken from "../../Middleware/VerifyToken.js";
let userRoutes = express.Router();

userRoutes.use(verifyToken);
userRoutes.get("/posts", viewPosts);
userRoutes.put("/posts/:id", updatePost);
userRoutes.post("/posts", createPost);
userRoutes.delete("/posts/:id", deletePost);

export default userRoutes;
