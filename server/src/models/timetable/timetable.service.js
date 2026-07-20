const Timetable = require("./timetable.model");
const ApiError = require("../../utils/ApiError");

// Create Timetable
const createTimetable = async (data, userId) => {
  const exists = await Timetable.findOne({
    semester: data.semester,
    branch: data.branch,
    isActive: true,
  });

  if (exists) {
    throw new ApiError(
      409,
      `Timetable for Semester ${data.semester} already exists`
    );
  }

  const timetable = await Timetable.create({
    ...data,
    uploadedBy: userId,
  });

  return timetable;
};

// Get All Timetables
const getAllTimetables = async () => {
  return await Timetable.find({ isActive: true })
    .populate("uploadedBy", "fullName email")
    .sort({ semester: 1 });
};

// Get Timetable By ID
const getTimetableById = async (id) => {
  const timetable = await Timetable.findOne({
    _id: id,
    isActive: true,
  }).populate("uploadedBy", "fullName email");

  if (!timetable) {
    throw new ApiError(404, "Timetable not found");
  }

  return timetable;
};

// Update Timetable
const updateTimetable = async (id, data) => {
  const timetable = await Timetable.findOne({
    _id: id,
    isActive: true,
  });

  if (!timetable) {
    throw new ApiError(404, "Timetable not found");
  }

  // Prevent duplicate semester
  if (
    data.semester &&
    (data.semester !== timetable.semester ||
      data.branch !== timetable.branch)
  ) {
    const exists = await Timetable.findOne({
      semester: data.semester,
      branch: data.branch || timetable.branch,
      _id: { $ne: id },
      isActive: true,
    });

    if (exists) {
      throw new ApiError(
        409,
        `Semester ${data.semester} timetable already exists`
      );
    }
  }

  Object.assign(timetable, data);

  await timetable.save();

  return timetable;
};

// Soft Delete
const deleteTimetable = async (id) => {
  const timetable = await Timetable.findOne({
    _id: id,
    isActive: true,
  });

  if (!timetable) {
    throw new ApiError(404, "Timetable not found");
  }

  timetable.isActive = false;

  await timetable.save();

  return {
    message: "Timetable deleted successfully",
  };
};

module.exports = {
  createTimetable,
  getAllTimetables,
  getTimetableById,
  updateTimetable,
  deleteTimetable,
};