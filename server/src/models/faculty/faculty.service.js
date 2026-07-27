const Faculty = require("./faculty.model");
const ApiError = require("../../utils/ApiError");

// Designation Rank Hierarchy Weights
const DESIGNATION_WEIGHT = {
  "Professor & Head": 1,
  "HOD": 1,
  "Professor": 2,
  "Associate Professor": 3,
  "Assistant Professor": 4,
  "Guest Faculty": 5,
};

const getAllFaculty = async () => {
  const facultyList = await Faculty.find({ isActive: true })
    .populate("subjects", "code name semester type")
    .sort({ priority: 1, name: 1 })
    .lean();

  // In-memory Guarantee Sort: Priority/Designation -> Name
  return facultyList.sort((a, b) => {
    const priorityA = a.priority || DESIGNATION_WEIGHT[a.designation] || 99;
    const priorityB = b.priority || DESIGNATION_WEIGHT[b.designation] || 99;

    if (priorityA !== priorityB) {
      return priorityA - priorityB; // Lower priority number comes first
    }

    return (a.name || "").localeCompare(b.name || ""); // Alphabetical fallback
  });
};

const getFacultyById = async (id) => {
  const faculty = await Faculty.findById(id)
    .populate("subjects", "code name semester type");

  if (!faculty || !faculty.isActive) {
    throw new ApiError(404, "Faculty not found");
  }

  return faculty;
};

module.exports = {
  getAllFaculty,
  getFacultyById,
};