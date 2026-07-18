const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const { signup } = require("./auth.service");

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

module.exports = {
  signupController,
};