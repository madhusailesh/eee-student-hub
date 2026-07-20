const Pyq = require("./pyq.model");

const createPyq = async (data, userId) => {
  return await Pyq.create({
    ...data,
    uploadedBy: userId,
  });
};

const getAllPyqs = async (filters) => {
  const {
    page = 1,
    limit = 10,
    semester,
    branch,
    subject,
    year,
    examType,
    q,
  } = filters;

  const query = {
    isActive: true,
  };

  if (semester) query.semester = Number(semester);
  if (branch) query.branch = branch.toUpperCase();
  if (subject) query.subject = subject;
  if (year) query.year = Number(year);
  if (examType) query.examType = examType;

  if (q) {
    query.title = {
      $regex: q,
      $options: "i",
    };
  }

  const total = await Pyq.countDocuments(query);

  const pyqs = await Pyq.find(query)
  .populate("subject")
    .populate("uploadedBy", "fullName email")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return {
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / limit),
    data: pyqs,
  };
};

const getPyqById = async (id) => {
  return await Pyq.findById(id)
    .populate("subject")
    .populate("uploadedBy", "fullName email");
};

const updatePyq = async (id, data) => {
  return await Pyq.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deletePyq = async (id) => {
  return await Pyq.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
};

module.exports = {
  createPyq,
  getAllPyqs,
  getPyqById,
  updatePyq,
  deletePyq,
};