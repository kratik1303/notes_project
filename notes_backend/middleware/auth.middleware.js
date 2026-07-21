import jwt, { decode } from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    let token;
    //check authentication header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //get user without password
      req.User = await User.findById(decode.id).select("-password");
      return next();
    }
    return res.status(401).json({
      message: "Not authorized, no token",
    });
  } catch (error) {
    return res.status(401).json({
      message: "Token Invalid",
      error: error.message,
    });
  }
};

export default protect;
