import User from "../Database/Models/User.Model.js";

const checkEmail = async (req, res, next) => {
  let foundUser = await User.findOne({ email: req.body.email });
  if (req.url === "/signin") {
    if (foundUser) {
      req.foundUser = foundUser;
      next();
    } else {
      res.json({ message: "Email does not exist" });
    }
  }

  if (req.url === "/signup") {
    if (foundUser) {
      res.json({ message: "Email already exists" });
    } else {
      next();
    }
  }
};

export default checkEmail;
