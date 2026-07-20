const timetableService = require("./timetable.service");
const catchAsync = require("../../utils/asyncHandler");

// Create Timetable
const createTimetable = catchAsync(async (req, res) => {
  const timetable = await timetableService.createTimetable(
    req.body,
    req.user._id
  );

  res.status(201).json({
    success: true,
    message: "Timetable uploaded successfully",
    data: timetable,
  });
});

// Get All Timetables
const getAllTimetables = catchAsync(async (req, res) => {
  const timetables = await timetableService.getAllTimetables();

  res.status(200).json({
    success: true,
    count: timetables.length,
    data: timetables,
  });
});

// Get Timetable By ID
const getTimetableById = catchAsync(async (req, res) => {
  const timetable = await timetableService.getTimetableById(req.params.id);

  res.status(200).json({
    success: true,
    data: timetable,
  });
});

// Update Timetable
const updateTimetable = catchAsync(async (req, res) => {
  const timetable = await timetableService.updateTimetable(
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Timetable updated successfully",
    data: timetable,
  });
});

// Delete Timetable
const deleteTimetable = catchAsync(async (req, res) => {
  const result = await timetableService.deleteTimetable(req.params.id);

  res.status(200).json({
    success: true,
    ...result,
  });
});

module.exports = {
  createTimetable,
  getAllTimetables,
  getTimetableById,
  updateTimetable,
  deleteTimetable,
};