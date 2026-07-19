const User = require("../users/user.model");
const Otp = require("./otp.model");

const ApiError = require("../../utils/ApiError");

const { generateOtp, getOtpExpiry } = require("../../services/otp.service");
const { sendOtpEmail } = require("../../services/mail.service");

const signup = async (data) => {
  // Check if email already exists
  const existingUser = await User.exists({ email: data.email });

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  // Remove any old verification OTPs
  await Otp.deleteMany({
    email: data.email,
    purpose: "verify-email",
  });

  // Create user (password will be hashed by pre('save'))
  const user = await User.create(data);

  // Generate OTP
  const otp = generateOtp();

  // Save OTP
  await Otp.create({
    email: user.email,
    otp,
    purpose: "verify-email",
    expiresAt: getOtpExpiry(),
  });

  // Send OTP email
  await sendOtpEmail(user.email, otp);

  return {
    id: user._id,
    email: user.email,
  };
};
//veryfy otp
const verifyOtp = async ({ email, otp }) => {
  console.log("Email:", email);
  console.log("OTP:", otp);
  const otpDoc = await Otp.findOne({
    email,
    otp,
    purpose: "verify-email",
  });

  if (!otpDoc) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  await User.updateOne(
    { email },
    {
      isVerified: true,
    }
  );

  await Otp.deleteMany({
    email,
    purpose: "verify-email",
  });

  return {
    email,
  };
};


const bcrypt = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../../services/jwt.service");

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password +refreshToken");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (!user.isVerified) {
    throw new ApiError(403, "Please verify your email first");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
};


const getCurrentUser = async (userId) => {
  const user = await User.findById(userId).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};
const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(401, "Refresh token missing");
  }

  const decoded = verifyRefreshToken(refreshToken);

  const user = await User.findById(decoded.id).select("+refreshToken");

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  if (user.refreshToken !== refreshToken) {
    throw new ApiError(401, "Invalid refresh token");
  }

  return generateAccessToken(user);
};
module.exports = {
  signup,
  verifyOtp,
  login,
  getCurrentUser,
  refreshAccessToken,
};