import express from "express";
import {
  viewComments,
  updateComment,
  createComment,
  deleteComment,
} from "./Comment.Controller.js";
import verifyToken from "../../Middleware/VerifyToken.js";

let commentRoutes = express.Router();
commentRoutes.use(verifyToken);

commentRoutes.get("/comments", viewComments);
commentRoutes.put("/comments/:id", updateComment);
commentRoutes.post("/comments", createComment);
commentRoutes.delete("/comments/:id", deleteComment);
export default commentRoutes;
