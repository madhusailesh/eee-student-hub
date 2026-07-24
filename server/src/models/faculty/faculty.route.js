const express = require("express");

const validate = require("../../middleware/validate.middleware");
const facultyValidation = require("./faculty.validation");
const facultyController = require("./faculty.controller"); 

const router = express.Router();

router.get("/", facultyController.getAllFaculty);

router.get(
  "/:id",
  validate(facultyValidation.getFacultyById),
  facultyController.getFacultyById
);
 
module.exports = router;