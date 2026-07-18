const express = require("express");

const router = express.Router();
const authRoutes = require("../models/auth/auth.routes");

router.use("/auth", authRoutes);

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API is healthy",
  });
});

module.exports = router;