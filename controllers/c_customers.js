const { customer } = require("../models");

class Customers {
  async getAllCustomers(req, res, next) {
    try {
      const data = await customer.findAll();
      // if not found
      if (data.length === 0) {
        return next({ statusCode: 404, messages: ["Customers not found"] });
      }
      //   if success
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getOneCustomer(req, res, next) {
    try {
      const data = await customer.findOne({
        where: { id: req.params.id },
      });
      // if not found
      if (!data) {
        return next({ statusCode: 404, messages: ["Customer not found"] });
      }
      //   if success
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async createCustomer(req, res, next) {
    try {
      //   create customer
      const newData = await customer.create(req.body);

      // send back last transaction
      const data = await customer.findOne({
        where: { id: newData.id },
      });

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async updateCustomer(req, res, next) {
    try {
      //   update data
      const updatedCustomer = await customer.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      console.log(updatedCustomer);

      if (updatedCustomer[0] === 0) {
        return next({ statusCode: 404, messages: ["Customer not found"] });
      }

      const data = await customer.findOne({
        where: {
          id: req.params.id,
        },
      });

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async deleteCustomer(req, res, next) {
    try {
      let data = await customer.destroy({ where: { id: req.params.id } });

      if (!data) {
        return next({ statusCode: 404, messages: ["Customer not found!"] });
      }

      res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Customers();
