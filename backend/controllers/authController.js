import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  });
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password)
      return res.status(400).json("All Fields are required!");

    const userName = await User.findOne({ username: req.body.username });
    if (userName)
      return res.status(500).json("This username is already register");

    const userEmail = await User.findOne({ email: req.body.email });
    if (userEmail)
      return res.status(500).json("This email is already register");

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(500).json("User is not register");

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch)
      return res.status(500).json("Username or Password is wrong");

    if (user && isPasswordMatch) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRETE_KEY
      );
      const { password, isAdmin, ...otherDetails } = user._doc;
      res
        .cookie("access_cookie", token)
        .status(200)
        .json({ ...otherDetails });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
