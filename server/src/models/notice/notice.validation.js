const Joi = require("joi");
const mongoose = require("mongoose");

const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

const createNotice = {
  body: Joi.object({
    title: Joi.string().trim().required(),

    description: Joi.string().allow("").optional(),

    semester: Joi.number().min(1).max(8).allow(null),

    branch: Joi.string().uppercase().required(),

    priority: Joi.string()
      .valid("LOW", "MEDIUM", "HIGH")
      .default("MEDIUM"),

    expiryDate: Joi.date().allow(null),

    fileUrl: Joi.string().required(),
  }),
};

const updateNotice = {
  body: Joi.object({
    title: Joi.string(),

    description: Joi.string().allow(""),

    semester: Joi.number().min(1).max(8).allow(null),

    branch: Joi.string().uppercase(),

    priority: Joi.string().valid("LOW", "MEDIUM", "HIGH"),

    expiryDate: Joi.date().allow(null),

    fileUrl: Joi.string(),
  }),
};

const getNoticeById = {
  params: Joi.object({
    id: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createNotice,
  updateNotice,
  getNoticeById,
};