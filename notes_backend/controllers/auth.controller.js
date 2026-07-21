import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    // generate JWT
    const token = generateToken(user._id);

    res.status(201).json({
      message: "User Registered Successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check fields
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or password",
      });
    }
    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    //generate token
    const token = generateToken(user._id);
    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login Failed",
      error: error.message,
    });
  }
};
