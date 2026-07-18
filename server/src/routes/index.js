const express = require("express");

const router = express.Router();

const validate = require("../../middleware/validate.middleware");
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy 🚀",
    version: "v1",
  });
});
const {
  signupSchema,
} = require("./auth.validation");

router.post(
  "/signup",
  validate(signupSchema),
  signup
);
module.exports = router;