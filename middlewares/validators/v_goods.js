const validator = require("validator");
const path = require("path");
const { supplier } = require("../../models");
const crypto = require("crypto");
const { promisify } = require("util");

exports.goodValidator = async (req, res, next) => {
  try {
    const errorMessages = [];
    if (!validator.isInt(req.body.price)) {
      errorMessages.push("price must be number(INTEGER)!");
    }
    if (!validator.isInt(req.body.id_supplier)) {
      errorMessages.push("id_supplier must be number(INTEGER)!");
    }
    if (errorMessages.length > 0) {
      return next({ statusCode: 400, messages: errorMessages });
    }

    // If image was uploaded
    if (req.files) {
      // req.files.image is come from key (file) in postman
      const file = req.files.image;
      console.log(file);

      // Make sure image is photo
      if (!file.mimetype.startsWith("image")) {
        errorMessages.push("File must be an image");
      }

      // Check file size (max 1MB)
      if (file.size > 1000000) {
        errorMessages.push("Image must be less than 1MB");
      }

      // If error
      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }

      // Create custom filename
      // let fileName = crypto.randomBytes(16).toString("hex");
      let fileName = new Date().getTime() + "_" + file.name;
      console.log(fileName);

      // Rename the file
      file.name = `${fileName}${path.parse(file.name).ext}`;

      // Make file.mv to promise
      const move = promisify(file.mv);

      // Upload image to /public/images
      await move(`./public/images/${file.name}`);

      // assign req.body.image with file.name
      req.body.image = file.name;
    }

    // const findSupplier = await supplier.findOne({
    //   where: { id: req.body.id_supplier },
    // });

    // if (!findSupplier) {
    //   return next({ statusCode: 400, messages: ["supplier not found"] });
    // }

    next();
  } catch (error) {
    next(error);
  }
};
