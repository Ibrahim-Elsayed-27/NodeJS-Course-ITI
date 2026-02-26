import express from "express";
import { listUsers, signIn, signUp } from "./User.Controller.js";
import checkEmail from "../../Middleware/checkEmail.js";
import hashPassword from "../../Middleware/hashPassword.js";
let userRoutes = express.Router();

userRoutes.get("/users", listUsers);
userRoutes.post("/signin", checkEmail, signIn);
userRoutes.post("/signup", checkEmail, hashPassword, signUp);

export default userRoutes;
