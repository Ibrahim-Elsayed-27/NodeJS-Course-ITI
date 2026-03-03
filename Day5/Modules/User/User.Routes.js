import express from "express";
import { listUsers, signIn, signUp, verifyAccount } from "./User.Controller.js";
import checkEmail from "../../Middleware/checkEmail.js";
import hashPassword from "../../Middleware/hashPassword.js";
import validationMiddleware from "../../Middleware/validationMiddleware.js";
let userRoutes = express.Router();

userRoutes.get("/users", listUsers);
userRoutes.post("/signin", checkEmail, signIn);
userRoutes.post(
  "/signup",
  validationMiddleware,
  checkEmail,
  hashPassword,
  signUp,
);
userRoutes.get("/verify/:email", verifyAccount);

export default userRoutes;
