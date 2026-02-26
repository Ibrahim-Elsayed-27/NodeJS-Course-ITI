import mongoose from "mongoose";

const connectDB = mongoose
  .connect("mongodb://localhost:27017/day4")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

export default connectDB;
