const express = require("express");

const router = express.Router();

const validate = require("../../middleware/validate.middleware"); 
const protect = require("../../middleware/auth.middleware");

const {
  signupSchema,  verifyOtpSchema,
  loginSchema,
} = require("./auth.validation"); 
const {
  signupController,
  verifyOtpController,
  loginController,
  getCurrentUserController,
} = require("./auth.controller");

router.post(
  "/signup",
  validate(signupSchema),
  signupController
);
router.post(
  "/verify-otp",
  validate(verifyOtpSchema),
  verifyOtpController
);
 

router.post(
  "/login",
  validate(loginSchema),
  loginController
);
router.get(
  "/me",
  protect,
  getCurrentUserController
);
module.exports = router;