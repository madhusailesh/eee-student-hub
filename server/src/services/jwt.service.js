const jwt = require("jsonwebtoken");
const generateAccessToken = (user) => {
  console.log("=== DEBUG ACCESS TOKEN EXPIRY ===");
  console.log("process.env.ACCESS_TOKEN_EXPIRY:", process.env.ACCESS_TOKEN_EXPIRY);
  console.log("Type of ACCESS_TOKEN_EXPIRY:", typeof process.env.ACCESS_TOKEN_EXPIRY);
  console.log("=================================");

  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "7d",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};