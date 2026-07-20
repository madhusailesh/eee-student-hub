const Joi = require("joi");

const createSubjectSchema = Joi.object({
  branch: Joi.string().trim().uppercase().required(),

  semester: Joi.number().integer().min(1).max(8).required(),

  code: Joi.string().trim().uppercase().required(),

  name: Joi.string().trim().required(),

  credits: Joi.number().min(0).default(0),
});

module.exports = {
  createSubjectSchema,
};