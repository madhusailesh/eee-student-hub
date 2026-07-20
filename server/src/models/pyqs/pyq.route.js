const express = require("express");

const router = express.Router();

const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("./pyq.controller");

const protect = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/authorize.middleware");
const upload = require("../../middleware/upload.middleware");

// Public Routes
router.get("/", getAll);
router.get("/:id", getOne);

// Admin Routes
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("file"),
  create
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  update
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  remove
);

module.exports = router;