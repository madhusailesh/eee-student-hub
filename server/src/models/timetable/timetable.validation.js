const Joi = require("joi");
const mongoose = require("mongoose");

const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

const createTimetable = {
  body: Joi.object({
    semester: Joi.number()
      .integer()
      .min(1)
      .max(8)
      .required(),

    branch: Joi.string()
      .uppercase()
      .trim()
      .required(),

    title: Joi.string()
      .trim()
      .required(),

    fileUrl: Joi.string()
      .trim()
      .required(),
  }),
};

const updateTimetable = {
  body: Joi.object({
    semester: Joi.number()
      .integer()
      .min(1)
      .max(8),

    branch: Joi.string()
      .uppercase()
      .trim(),

    title: Joi.string()
      .trim(),

    fileUrl: Joi.string()
      .trim(),

    isActive: Joi.boolean(),
  }),
};

const getTimetableById = {
  params: Joi.object({
    id: Joi.string()
      .custom(objectId)
      .required(),
  }),
};

module.exports = {
  createTimetable,
  updateTimetable,
  getTimetableById,
};