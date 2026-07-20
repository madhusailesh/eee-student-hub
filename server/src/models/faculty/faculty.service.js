const Faculty = require("./faculty.model");
const ApiError = require("../../utils/ApiError");

const getAllFaculty = async () => {
  return await Faculty.find({ isActive: true })
    .populate("subjects", "code name semester type")
    .sort({ priority: 1, name: 1 });
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