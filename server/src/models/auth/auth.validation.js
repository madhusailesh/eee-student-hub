const Joi = require("joi");

const signupSchema = Joi.object({
  fullName: Joi.string().trim().min(3).max(100).required(),

  email: Joi.string().email().lowercase().required(),

  password: Joi.string().min(6).max(32).required(),

  semester: Joi.number().integer().min(1).max(8).required(),

  rollNumber: Joi.string().allow("").optional(),
  
  phone: Joi.string().allow("").optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().required(),
});

const verifyOtpSchema = Joi.object({
  email: Joi.string().email().required(),

  otp: Joi.string().length(6).required(),
});

module.exports = {
  signupSchema,
  loginSchema,
  verifyOtpSchema,
};