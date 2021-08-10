const validator = require("validator");
const { good, transaction } = require("../../models");

exports.createTransactionValidator = async (req, res, next) => {
  try {
    // Check total is number
    const errorMessages = [];

    if (!validator.isInt(req.body.id_good)) {
      errorMessages.push("id_good must be number (interger)");
    }

    if (!validator.isInt(req.body.quantity)) {
      errorMessages.push("Quantity must be number (interger)");
    }

    if (!validator.isInt(req.body.id_customer)) {
      errorMessages.push("id_customer must be number (interger)");
    }

    if (errorMessages.length > 0) {
      return next({ statusCode: 400, messages: errorMessages });
    }

    // Find price and total
    const findGood = await good.findOne({ where: { id: req.body.id_good } });

    if (!findGood) {
      return next({ statusCode: 400, messages: ["Good not found"] });
    }

    const price = findGood.price;
    req.body.total = eval(price * req.body.quantity);

    next();
  } catch (error) {
    next(error);
  }
};

exports.updateTransactionValidator = async (req, res, next) => {
  try {
    // Check total is number
    const errorMessages = [];

    if (!validator.isInt(req.body.id_good)) {
      errorMessages.push("id_good must be number (interger)");
    }

    if (!validator.isInt(req.body.quantity)) {
      errorMessages.push("Quantity must be number (interger)");
    }

    if (!validator.isInt(req.body.id_customer)) {
      errorMessages.push("id_customer must be number (interger)");
    }

    if (errorMessages.length > 0) {
      return next({ statusCode: 400, messages: errorMessages });
    }

    // Find price and total
    const findGood = await good.findOne({ where: { id: req.body.id_good } });

    if (!findGood) {
      return next({ statusCode: 400, messages: ["Good not found"] });
    }

    const price = findGood.price;
    req.body.total = eval(price * req.body.quantity);

    next();
  } catch (error) {
    next(error);
  }
};
