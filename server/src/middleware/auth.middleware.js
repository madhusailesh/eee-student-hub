const jwt = require("jsonwebtoken");
const User = require("../models/users/user.model");
const ApiError = require("../utils/ApiError");

const protect = async (req, res, next) => {
  try {
    let token;

    // Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Cookie
    if (!token && req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    // No token found
    if (!token) {
      return next(new ApiError(401, "Unauthorized"));
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // Find User
    const user = await User.findById(decoded.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return next(new ApiError(401, "User not found"));
    }

    req.user = user;

    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return next(new ApiError(401, "Invalid or expired token"));
    }

    next(error);
  }
};

module.exports = protect;