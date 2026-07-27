const jwt = require("jsonwebtoken");
const User = require("../models/users/user.model");
const ApiError = require("../utils/ApiError");

const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Check Authorization Header (Bearer Token)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]?.trim();
    }

    // 2. Fallback to Cookie Token if header is not present
    if (!token && req.cookies?.accessToken) {
      token = req.cookies.accessToken.trim();
    }

    // No token found in both places
    if (!token) {
      return next(new ApiError(401, "Unauthorized - Access Token Missing"));
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // Support both payload keys: decoded.id OR decoded._id
    const userId = decoded.id || decoded._id;

    if (!userId) {
      return next(new ApiError(401, "Invalid token structure"));
    }

    // Find User
    const user = await User.findById(userId).select(
      "-password -refreshToken"
    );

    if (!user) {
      return next(new ApiError(401, "User no longer exists"));
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