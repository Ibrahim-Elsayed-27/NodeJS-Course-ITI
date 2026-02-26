import userModel from "../../Database/Models/User.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const listUsers = async (req, res) => {
  let users = await userModel.find();
  res.json({ message: "Users retrieved successfully", users });
};

const signIn = async (req, res) => {
  let foundUser = req.foundUser;
  let matchPassword = bcrypt.compareSync(req.body.password, foundUser.password);

  if (matchPassword) {
    let token = jwt.sign(
      { _id: foundUser._id, role: foundUser.role, email: foundUser.email },
      "day4",
    );
    foundUser.password = undefined;
    res.json({
      message: "User signed in successfully",
      user: foundUser,
      token,
    });
  } else {
    res.status(422).json({ message: "Invalid password or Email" });
  }
};

const signUp = async (req, res) => {
  let addUser = await userModel.insertOne(req.body);
  addUser.password = undefined;
  res.json({ message: "User signed up successfully", user: addUser });
};

export { listUsers, signIn, signUp };
