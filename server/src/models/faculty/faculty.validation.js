const Joi = require("joi");
const mongoose = require("mongoose");

const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

const getFacultyById = {
  params: Joi.object({
    id: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  getFacultyById,
};