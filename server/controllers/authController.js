import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!req.body) {
    return res.status(300).json({ message: "Fields have no Data init" });
  }
  if (password === undefined) {
    return res.status(300).json({ message: "Fields have no Data init" });
  }
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = bcryptjs.hashSync(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!req.body) {
    return res.status(400).json({ message:"Fields are required"});
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ message:'User not found' });
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(404).json({ message:'Incorrect Password'});
    }
    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_ACCESS_KEY_LOGIN,
      { expiresIn: "15m" }
    );
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000)
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json({
        user: rest,
        message: "Logged in",
        login:true
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
