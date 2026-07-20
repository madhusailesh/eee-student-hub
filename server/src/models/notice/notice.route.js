const express = require("express");

const noticeController = require("./notice.controller");
const noticeValidation = require("./notice.validation");

const validate = require("../../middleware/validate.middleware");
const protect = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/authorize.middleware");

const router = express.Router();

// GET all + CREATE
router
  .route("/")
  .get(noticeController.getAllNotices)
  .post(
    protect,
    authorize("admin"),
    validate(noticeValidation.createNotice),
    noticeController.createNotice
  );

// GET by id + UPDATE + DELETE
router
  .route("/:id")
  .get(
    validate(noticeValidation.getNoticeById),
    noticeController.getNoticeById
  )
  .put(
    protect,
    authorize("admin"),
    validate(noticeValidation.updateNotice),
    noticeController.updateNotice
  )
  .delete(
    protect,
    authorize("admin"),
    validate(noticeValidation.getNoticeById),
    noticeController.deleteNotice
  );

module.exports = router;