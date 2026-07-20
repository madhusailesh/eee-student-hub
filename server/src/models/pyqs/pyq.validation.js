const Joi = require("joi");

const createPyqSchema = Joi.object({
  title: Joi.string().trim().required(),

  subject: Joi.string().required(),

  semester: Joi.number().integer().min(1).max(8).required(),

  branch: Joi.string().trim().uppercase().required(),

  year: Joi.number().required(),

  examType: Joi.string()
    .valid("Mid Semester", "End Semester", "Back")
    .required(),

  description: Joi.string().allow("").optional(),
});

module.exports = {
  createPyqSchema,
};