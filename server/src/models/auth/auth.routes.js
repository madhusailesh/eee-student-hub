const express = require("express");

const router = express.Router();

const validate = require("../../middleware/validate.middleware");

const {
  signupSchema,
} = require("./auth.validation");

const {
  signupController,
} = require("./auth.controller");

router.post(
  "/signup",
  validate(signupSchema),
  signupController
);

module.exports = router;