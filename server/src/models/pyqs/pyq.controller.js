const {
  createPyqSchema,
} = require("./pyq.validation");

const {
  createPyq,
  getAllPyqs,
  getPyqById,
  updatePyq,
  deletePyq,
} = require("./pyq.service");

const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");

const create = asyncHandler(async (req, res) => {
  const { error, value } = createPyqSchema.validate(req.body);

  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  if (!req.file) {
    throw new ApiError(400, "PDF file is required");
  }

  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  const pyq = await createPyq(
    {
      ...value,
      fileUrl,
    },
    req.user._id
  );

  res.status(201).json({
    success: true,
    message: "PYQ uploaded successfully",
    data: pyq,
  });
});

const getAll = asyncHandler(async (req, res) => {
  const result = await getAllPyqs(req.query);

  res.status(200).json({
    success: true,
    ...result,
  });
});

const getOne = asyncHandler(async (req, res) => {
  const pyq = await getPyqById(req.params.id);

  if (!pyq) {
    throw new ApiError(404, "PYQ not found");
  }

  res.status(200).json({
    success: true,
    data: pyq,
  });
});

const update = asyncHandler(async (req, res) => {
  const pyq = await updatePyq(req.params.id, req.body);

  if (!pyq) {
    throw new ApiError(404, "PYQ not found");
  }

  res.status(200).json({
    success: true,
    message: "PYQ updated successfully",
    data: pyq,
  });
});

const remove = asyncHandler(async (req, res) => {
  const pyq = await deletePyq(req.params.id);

  if (!pyq) {
    throw new ApiError(404, "PYQ not found");
  }

  res.status(200).json({
    success: true,
    message: "PYQ deleted successfully",
  });
});

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};