const jwt = require("jsonwebtoken");
const User = require("../models/users/user.model");
const ApiError = require("../utils/ApiError");

const protect = async (req, res, next) => {
  try {
console.log("Cookies:", req.cookies);
console.log("Cookie Header:", req.headers.cookie);
console.log("Token:", req.cookies?.accessToken);
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token && req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    console.log("TOKEN:", token);

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    console.log("DECODED:", decoded);

    const user = await User.findById(decoded.id).select(
      "-password -refreshToken"
    );

    req.user = user;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.name);
    console.log("JWT MESSAGE:", error.message);

    next(new ApiError(401, error.message));
  }
};

module.exports = protect;