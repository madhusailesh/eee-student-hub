const express = require("express");

const router = express.Router();

const {
  create,
  getAll,
  getOne,
} = require("./subject.controller");

const protect = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/authorize.middleware");

// Public
router.get("/", getAll);
router.get("/:id", getOne);

// Admin (sirf agar future me zarurat pade)
router.post(
  "/",
  protect,
  authorize("admin"),
  create
);

module.exports = router;