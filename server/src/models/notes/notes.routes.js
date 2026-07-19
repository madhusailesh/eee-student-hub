const express = require("express");

const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("./notes.controller");

const protect = require("../../middleware/auth.middleware");
// We'll add admin middleware next

const router = express.Router();

// Public / Protected
router.get("/", protect, getAll);
router.get("/:id", protect, getOne);

// Admin
router.post("/", protect, create);
router.put("/:id", protect, update);
router.delete("/:id", protect, remove);

module.exports = router;