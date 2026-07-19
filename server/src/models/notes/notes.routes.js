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

const router = express.Router();
const upload = require("../../middleware/upload.middleware");
// Student + Admin
router.get("/", protect, getAll);
router.get("/:id", protect, getOne);

// Admin only 
router.put("/:id", protect, authorize("admin"), update);
router.delete("/:id", protect, authorize("admin"), remove);
router.post("/", protect, authorize("admin"), upload.single("file"), create);
module.exports = router;
