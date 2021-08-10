const validator = require("validator");
const { supplier } = require("../../models");

exports.supplierValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    if (validator.isEmpty(req.body.name)) {
      errorMessages.push("Supplier name cannot be empty!");
    }

    if (errorMessages.length > 0) {
      return next({ statusCode: 400, messages: errorMessages });
    }

    next();
  } catch (error) {
    next(error);
  }
};
