const { transaction, good, supplier, customer } = require("../models");

class Transactions {
  // Get all transaction data
  async getAllTransactions(req, res, next) {
    try {
      let data = await transaction.findAll({
        // find all data of transaction table
        attributes: { exclude: ["id_good", "id_customer"] },
        include: [
          // Include is join
          {
            model: customer,
          },
          {
            model: good,
            include: [
              // Include is join
              { model: supplier },
            ],
          },
        ],
      });

      // If data is nothing
      if (data.length === 0) {
        return next({ statusCode: 404, messages: ["Transactions not found"] });
      }

      // If success
      res.status(200).json({ data });
    } catch (e) {
      // If error
      next(e);
    }
  }

  async getDetailTransaction(req, res, next) {
    try {
      let data = await transaction.findOne({
        // find all data of transaction table
        where: { id: req.params.id },
        attributes: { exclude: ["id_good", "id_customer"] },
        include: [
          // Include is join
          {
            model: customer,
          },
          {
            model: good,
            include: [
              // Include is join
              { model: supplier },
            ],
          },
        ],
      });

      // If data is nothing
      if (!data) {
        return next({ statusCode: 404, messages: ["Transaction not found"] });
      }
      // If success
      res.status(200).json({ data });
    } catch (e) {
      // If error
      next(e);
    }
  }

  async createTransaction(req, res, next) {
    try {
      // create transaction
      const newData = await transaction.create(req.body);

      // Find transaction with join
      const data = await transaction.findOne({
        where: {
          id: newData.id,
        },
        attributes: { exclude: ["id_good", "id_customer"] },
        include: [
          {
            model: customer,
          },
          {
            model: good,
            include: [
              {
                model: supplier,
              },
            ],
          },
        ],
      });

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  // Update data
  async updateTransaction(req, res, next) {
    try {
      // transaction table update data
      const updatedData = await transaction.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      // If no data updated
      if (updatedData[0] === 0) {
        return next({ statusCode: 404, messages: ["Transaction not found"] });
      }

      // Find the updated transaction
      const data = await transaction.findOne({
        where: {
          id: req.params.id,
        },
        attributes: { exclude: ["id_good", "id_customer"] },
        include: [
          {
            model: customer,
          },
          {
            model: good,
            include: [
              {
                model: supplier,
              },
            ],
          },
        ],
      });

      // If success
      res.status(201).json({ data });
    } catch (e) {
      // If error
      next(e);
    }
  }

  // Delete Data
  async deleteTransaction(req, res, next) {
    try {
      // Delete data
      let data = await transaction.destroy({ where: { id: req.params.id } });

      // If data deleted is null
      if (!data) {
        return next({ statusCode: 404, messages: ["Transaction not found"] });
      }

      // If success
      res.status(200).json({ message: "Success delete transaction" });
    } catch (e) {
      // If error
      next(e);
    }
  }
}

module.exports = new Transactions();
