const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const {
  signup,
  verifyOtp,
  login,
  getCurrentUser,
  refreshAccessToken,
} = require("./auth.service");

// Shared Cookie Options
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
};

const signupController = asyncHandler(async (req, res) => {
  const user = await signup(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        id: user.id,
        email: user.email,
      },
      "OTP sent successfully"
    )
  );
});

const verifyOtpController = asyncHandler(async (req, res) => {
  const result = await verifyOtp(req.body);

  return res.status(200).json(
    new ApiResponse(
      200,
      result,
      "Email verified successfully"
    )
  );
});

const loginController = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await login(req.body);

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000, // 15 min
  });

  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      "Login successful"
    )
  );
});

const getCurrentUserController = asyncHandler(async (req, res) => {
  const user = await getCurrentUser(req.user._id);

  return res.status(200).json(
    new ApiResponse(
      200,
      user,
      "Current user fetched successfully"
    )
  );
});

const refreshTokenController = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  const accessToken = await refreshAccessToken(refreshToken);

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      { accessToken },
      "Access token refreshed successfully"
    )
  );
});

module.exports = {
  signupController,
  verifyOtpController,
  loginController,
  getCurrentUserController,
  refreshTokenController,
};