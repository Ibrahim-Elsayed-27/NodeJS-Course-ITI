import express from "express";
import connectDB from "./Database/dbConnect.js";
import userRoutes from "./Modules/User/User.Routes.js";
import postRoutes from "./Modules/Post/Post.Routes.js";
const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(postRoutes);
connectDB;
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
