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

module.exports = {
  signup,
};