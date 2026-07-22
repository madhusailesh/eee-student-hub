const express = require("express");

const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("./notes.controller");

const protect = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/authorize.middleware");
const upload = require("../../middleware/upload.middleware");

const router = express.Router();

// ✅ Public
router.get("/", getAll);
router.get("/:id", getOne);

// 🔒 Admin only
router.post("/", protect, authorize("admin"), upload.single("file"), create);
router.put("/:id", protect, authorize("admin"), update);
router.delete("/:id", protect, authorize("admin"), remove);

module.exports = router;