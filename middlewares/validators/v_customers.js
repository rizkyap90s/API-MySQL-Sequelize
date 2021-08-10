const validator = require("validator");
const { customer } = require("../../models");

exports.customerValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    if (validator.isEmpty(req.body.name)) {
      errorMessages.push("Name cannot be empty!");
    }

    if (!validator.isLength(req.body.name, { min: 2 })) {
      errorMessages.push("Name has to be at least 2 characters!");
    }

    if (errorMessages.length > 0) {
      return next({ statusCode: 400, messages: errorMessages });
    }

    next();
  } catch (error) {
    next(error);
  }
};
