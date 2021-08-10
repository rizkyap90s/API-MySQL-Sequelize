const { supplier } = require("../models");

class Suppliers {
  async getAllSuppliers(req, res, next) {
    try {
      const data = await supplier.findAll();
      // if not found
      if (data.length === 0) {
        return next({ statusCode: 404, messages: ["Suppliers is not found"] });
      }
      //   if success
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getOneSupplier(req, res, next) {
    try {
      const data = await supplier.findOne({
        where: { id: req.params.id },
      });
      // if not found
      if (!data) {
        return next({ statusCode: 404, messages: ["Supplier is not found"] });
      }
      //   if success
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async createSupplier(req, res, next) {
    try {
      //   create customer
      const newData = await supplier.create(req.body);

      // send back last transaction
      const data = await supplier.findOne({
        where: { id: newData.id },
      });

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async updateSupplier(req, res, next) {
    try {
      //   update data
      const updateSupplier = await supplier.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      console.log(updateSupplier);

      if (updateSupplier[0] === 0) {
        return next({ statusCode: 404, messages: ["Supplier is not found"] });
      }

      const data = await supplier.findOne({
        where: {
          id: req.params.id,
        },
      });

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async deleteSupplier(req, res, next) {
    try {
      let data = await supplier.destroy({ where: { id: req.params.id } });

      if (!data) {
        return next({ statusCode: 404, messages: ["Supplier is not found!"] });
      }

      res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Suppliers();
