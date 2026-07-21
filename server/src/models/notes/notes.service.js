const Note = require("./notes.model");
const ApiError = require("../../utils/ApiError");

const createNote = async (data, userId) => {
  const note = await Note.create({
    ...data,
    uploadedBy: userId,
  });

  return note;
};

const getAllNotes = async (filters) => {
  const query = {};

  if (filters.subject) {
    query.subject = filters.subject;
  }

  return await Note.find(query)
    .populate("subject", "name code semester")
    .sort({ createdAt: -1 });
};

const getNoteById = async (noteId) => {
  const note = await Note.findById(noteId)
    .populate("subject")
    .populate("uploadedBy", "fullName email");

  if (!note || !note.isActive) {
    throw new ApiError(404, "Note not found");
  }

  return note;
};

const updateNote = async (noteId, data) => {
  const note = await Note.findById(noteId);

  if (!note || !note.isActive) {
    throw new ApiError(404, "Note not found");
  }

  Object.assign(note, data);

  await note.save();

  return note;
};

const deleteNote = async (noteId) => {
  const note = await Note.findById(noteId);

  if (!note || !note.isActive) {
    throw new ApiError(404, "Note not found");
  }

  note.isActive = false;

  await note.save();

  return {
    message: "Note deleted successfully",
  };
};

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
};