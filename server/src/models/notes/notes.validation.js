const Joi = require("joi");

const createNoteSchema = Joi.object({
  title: Joi.string().trim().required(),

  subject: Joi.string().trim().required(),

  semester: Joi.number().integer().min(1).max(8).required(),

  branch: Joi.string().trim().uppercase().required(),

  description: Joi.string().allow("").optional(),

  fileUrl: Joi.string().uri().required(),
});

module.exports = {
  createNoteSchema,
};