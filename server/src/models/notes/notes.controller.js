const {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require("./notes.service");

const { createNoteSchema } = require("./notes.validation");

const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");

const create = asyncHandler(async (req, res) => {
  const { error, value } = createNoteSchema.validate(req.body);

  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  const note = await createNote(value, req.user._id);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    data: note,
  });
});

const getAll = asyncHandler(async (req, res) => {
  const notes = await getAllNotes();

  res.status(200).json({
    success: true,
    data: notes,
  });
});

const getOne = asyncHandler(async (req, res) => {
  const note = await getNoteById(req.params.id);

  res.status(200).json({
    success: true,
    data: note,
  });
});

const update = asyncHandler(async (req, res) => {
  const note = await updateNote(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Note updated successfully",
    data: note,
  });
});

const remove = asyncHandler(async (req, res) => {
  const result = await deleteNote(req.params.id);

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};