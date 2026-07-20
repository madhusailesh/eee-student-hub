const express = require("express");

const router = express.Router();
const authRoutes = require("../models/auth/auth.routes"); 
const noticeRoutes = require("../models/notice/notice.route");

router.use("/notices", noticeRoutes);
 
router.use("/auth", authRoutes);

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API is healthy",
  });
}); 
module.exports = router;