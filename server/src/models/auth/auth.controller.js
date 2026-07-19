const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
 
const {
  signup,
  verifyOtp,
  login,
  getCurrentUser,
  refreshAccessToken,
} = require("./auth.service");
const signupController = asyncHandler(async (req, res) => {
  const user = await signup(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        id: user._id,
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

  return res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          accessToken, // Mobile apps ke liye useful
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

  return res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    })
    .status(200)
    .json(
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