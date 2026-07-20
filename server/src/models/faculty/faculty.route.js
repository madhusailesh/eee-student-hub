const express = require("express");

const validate = require("../../middleware/validate");
const facultyValidation = require("./faculty.validation");
const facultyController = require("./faculty.controller");
const facultyRoutes = require("../models/faculty/faculty.routes");

const router = express.Router();

router.get("/", facultyController.getAllFaculty);

router.get(
  "/:id",
  validate(facultyValidation.getFacultyById),
  facultyController.getFacultyById
);

router.use("/faculty", facultyRoutes);
module.exports = router;