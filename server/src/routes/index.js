const express = require("express");

const router = express.Router();

const authRoutes = require("../models/auth/auth.routes");
const noticeRoutes = require("../models/notice/notice.route");
const timetableRoutes = require("../models/timetable/timetable.route");
const dashboardRoutes = require("../models/dashboard/dashboard.route");
const subjectRoutes = require("../models/subjects/subject.routes"); // ✅

router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/subjects", subjectRoutes); // ✅
router.use("/notices", noticeRoutes);
router.use("/timetable", timetableRoutes);

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API is healthy",
  });
});

module.exports = router;