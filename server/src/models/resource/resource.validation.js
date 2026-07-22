const Joi = require("joi");

const createResourceSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "Title is required",
    "any.required": "Title is required",
  }),

  description: Joi.string().trim().allow("").optional(),

  semester: Joi.number().integer().min(1).max(8).required().messages({
    "number.base": "Semester must be a number",
    "number.min": "Semester must be between 1 and 8",
    "number.max": "Semester must be between 1 and 8",
  }),

  subject: Joi.string().required().messages({
    "string.empty": "Subject is required",
    "any.required": "Subject is required",
  }),

  type: Joi.string()
    .valid(
      "notes",
      "pyqs",
      "books",
      "videos",
      "assignments",
      "syllabus"
    )
    .required()
    .messages({
      "any.only":
        "Type must be one of notes, pyqs, books, videos, assignments, syllabus",
      "any.required": "Type is required",
    }),
});

const updateResourceSchema = Joi.object({
  title: Joi.string().trim(),

  description: Joi.string().trim().allow(""),

  semester: Joi.number().integer().min(1).max(8),

  subject: Joi.string(),

  type: Joi.string().valid(
    "notes",
    "pyqs",
    "books",
    "videos",
    "assignments",
    "syllabus"
  ),
}).min(1);

module.exports = {
  createResourceSchema,
  updateResourceSchema,
};