const asyncHandler = require("../../utils/asyncHandler");
const facultyService = require("./faculty.service");

const getAllFaculty = asyncHandler(async (req, res) => {
  const faculty = await facultyService.getAllFaculty();

  res.status(200).json({
    success: true,
    count: faculty.length,
    data: faculty,
  });
});

const getFacultyById = asyncHandler(async (req, res) => {
  const faculty = await facultyService.getFacultyById(req.params.id);

  res.status(200).json({
    success: true,
    data: faculty,
  });
});

module.exports = {
  getAllFaculty,
  getFacultyById,
};