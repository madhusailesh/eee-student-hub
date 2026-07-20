const catchAsync = require("../../utils/catchAsync");
const facultyService = require("./faculty.service");

const getAllFaculty = catchAsync(async (req, res) => {
  const faculty = await facultyService.getAllFaculty();

  res.status(200).json({
    success: true,
    count: faculty.length,
    data: faculty,
  });
});

const getFacultyById = catchAsync(async (req, res) => {
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