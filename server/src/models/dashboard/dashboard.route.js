const express = require("express");

const dashboardController = require("./dashboard.controller");

const router = express.Router();

router.get("/", dashboardController.getDashboard);

module.exports = router;