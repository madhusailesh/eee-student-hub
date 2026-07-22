const Resource = require("./resource.model");
const Subject = require("../subjects/subject.model");

const createResource = async (data) => {
  return await Resource.create(data);
};

const getAllResources = async (filters) => {
  const query = {};

  if (filters.semester) {
    query.semester = Number(filters.semester);
  }

  if (filters.type) {
    query.type = filters.type;
  }

  if (filters.subjectCode) {
    const subject = await Subject.findOne({
      code: filters.subjectCode.toUpperCase(),
    });

    if (!subject) return [];

    query.subject = subject._id;
  }

  return await Resource.find(query)
    .populate("subject", "name code semester")
    .populate("uploadedBy", "fullName email")
    .sort({ createdAt: -1 });
};

const getResourceById = async (id) => {
  return await Resource.findById(id)
    .populate("subject", "name code semester")
    .populate("uploadedBy", "fullName email");
};

const updateResource = async (id, data) => {
  return await Resource.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteResource = async (id) => {
  return await Resource.findByIdAndDelete(id);
};

module.exports = {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
};