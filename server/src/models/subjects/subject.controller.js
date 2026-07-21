const Subject = require("./subject.model");
const {
  createSubjectSchema,
} = require("./subject.validation");

 

const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const {
  createSubject,
  getAllSubjects,
  getSubjectById,
  getSubjectByCode,
} = require("./subject.service");
const create = asyncHandler(async (req, res) => {
  const { error, value } = createSubjectSchema.validate(req.body);

  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  const subject = await createSubject(value);

  res.status(201).json({
    success: true,
    data: subject,
  });
});

const getAll = asyncHandler(async (req, res) => {
  const subjects = await getAllSubjects(req.query);

  res.status(200).json({
    success: true,
    data: subjects,
  });
});

const getOne = asyncHandler(async (req, res) => {
  const subject = await getSubjectById(req.params.id);

  if (!subject) {
    throw new ApiError(404, "Subject not found");
  }

  res.status(200).json({
    success: true,
    data: subject,
  });
});
const getByCode = asyncHandler(async (req, res) => {
  const subject = await getSubjectByCode(req.params.code);

  if (!subject) {
    throw new ApiError(404, "Subject not found");
  }

  res.status(200).json({
    success: true,
    data: subject,
  });
});
module.exports = {
  create,
  getAll,
  getOne,
  getByCode,
};