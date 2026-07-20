const express = require("express");

const router = express.Router();
const authRoutes = require("../models/auth/auth.routes"); 
const noticeRoutes = require("../models/notice/notice.route");
const timetableRoutes = require("../models/timetable/timetable.route");

const dashboardRoutes = require("../models/dashboard/dashboard.route");

router.use("/notices", noticeRoutes);
 
router.use("/auth", authRoutes);

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API is healthy",
  });
}); 
router.use("/dashboard", dashboardRoutes);
router.use("/timetable", timetableRoutes);
module.exports = router;