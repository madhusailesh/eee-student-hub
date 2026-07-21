const express = require("express");

const router = express.Router();

 
const {
  create,
  getAll,
  getOne,
  getByCode,
} = require("./subject.controller");
const protect = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/authorize.middleware");
// Public
router.get("/", getAll);
router.get("/code/:code", getByCode);
router.get("/:id", getOne);

// Admin
router.post(
  "/",
  protect,
  authorize("admin"),
  create
);

module.exports = router;