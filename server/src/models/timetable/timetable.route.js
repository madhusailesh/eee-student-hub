const express = require("express");

const timetableController = require("./timetable.controller");
const timetableValidation = require("./timetable.validation");

const validate = require("../../middleware/validate.middleware");
const protect = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/authorize.middleware");

const router = express.Router();

router
  .route("/")
  .get(timetableController.getAllTimetables)
  .post(
    protect,
    authorize("admin"),
    validate(timetableValidation.createTimetable),
    timetableController.createTimetable
  );

router
  .route("/:id")
  .get(
    validate(timetableValidation.getTimetableById),
    timetableController.getTimetableById
  )
  .put(
    protect,
    authorize("admin"),
    validate(timetableValidation.updateTimetable),
    timetableController.updateTimetable
  )
  .delete(
    protect,
    authorize("admin"),
    validate(timetableValidation.getTimetableById),
    timetableController.deleteTimetable
  );

module.exports = router;