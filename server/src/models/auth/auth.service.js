const User = require("../users/user.model");
const Otp = require("./otp.model");
const ApiError = require("../../utils/ApiError");
const bcrypt = require("bcryptjs");

const { generateOtp, getOtpExpiry } = require("../../services/otp.service");
const { sendOtpEmail } = require("../../services/mail.service");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../../services/jwt.service");

const signup = async (data) => {
  // Check if user with email already exists
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    if (existingUser.isVerified) {
      throw new ApiError(409, "Email already exists and is verified");
    } else {
      // 🔴 Agar pichla unverified user abhi tak delete nahi hua, toh purana record hata do
      await User.deleteOne({ _id: existingUser._id });
    }
  }

  // Remove any old verification OTPs for this email
  await Otp.deleteMany({
    email: data.email,
    purpose: "verify-email",
  });

  // Create user (unverifiedExpireAt will default to now & expire in 60s)
  const user = await User.create({
    ...data,
    isVerified: false,
    unverifiedExpireAt: new Date(),
  });

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

// Verify OTP
const verifyOtp = async ({ email, otp }) => {
  console.log("Verifying Email:", email);

  const otpDoc = await Otp.findOne({
    email,
    otp,
    purpose: "verify-email",
  });

  if (!otpDoc) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  // 🔴 CRITICAL FIX: isVerified ko true karo AUR unverifiedExpireAt ko $unset karo
  const user = await User.findOneAndUpdate(
    { email },
    {
      $set: { isVerified: true },
      $unset: { unverifiedExpireAt: 1 }, // 👈 Isse TTL index remove ho jayega aur document delete NAHI hoga
    },
    { new: true }
  );

  if (!user) {
    throw new ApiError(400, "User account expired or not found");
  }

  await Otp.deleteMany({
    email,
    purpose: "verify-email",
  });

  return {
    email: user.email,
  };
};

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