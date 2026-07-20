const validate = (schema) => {
  return (req, res, next) => {
    const validationErrors = [];

    if (schema.body) {
      const { error, value } = schema.body.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        validationErrors.push(...error.details);
      } else {
        req.body = value;
      }
    }

    if (schema.params) {
      const { error, value } = schema.params.validate(req.params, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        validationErrors.push(...error.details);
      } else {
        req.params = value;
      }
    }

    if (schema.query) {
      const { error, value } = schema.query.validate(req.query, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        validationErrors.push(...error.details);
      } else {
        req.query = value;
      }
    }

    if (validationErrors.length) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    next();
  };
};

module.exports = validate;