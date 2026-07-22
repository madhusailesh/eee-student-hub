const express = require("express");
const router = express.Router();

const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("./resource.controller");

const { protect, authorize } = require("../../middleware/auth.middleware");
const upload = require("../../middleware/upload");

router.get("/", getAll);
router.get("/:id", getOne);

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
  upload.single("file"),
  update
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  remove
);

module.exports = router;