const { transaction, good, supplier, customer } = require("../models");

class Goods {
  async getAllGoods(req, res, next) {
    try {
      let data = await good.findAll({
        attributes: { exclude: ["id_supplier"] },
        include: [
          {
            model: supplier,
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
          },
        ],
      });
      if (data.length === 0) {
        return next({ statusCode: 404, messages: ["Goods not found"] });
      }
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getGoodById(req, res, next) {
    try {
      let data = await good.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ["id_supplier"] },
        include: [
          {
            model: supplier,
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
        ],
      });

      if (!data) {
        return next({ statusCode: 404, messages: ["goods not found"] });
      }
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async createGood(req, res, next) {
    try {
      const newData = await good.create(req.body);
      const data = await good.findOne({
        where: {
          id: newData.id,
        },
        attributes: { exclude: ["id_supplier", "updatedAt", "deletedAt"] },
        include: [
          {
            model: supplier,
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
          },
        ],
      });
      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async updateGood(req, res, next) {
    try {
      const update = await good.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (update[0] === 0) {
        return next({ statusCode: 404, messages: ["good not found"] });
      }
      const data = await good.findOne({
        where: {
          id: req.params.id,
        },
        attributes: { exclude: ["id_supplier", "updatedAt", "deletedAt"] },
        include: [
          {
            model: supplier,
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
          },
        ],
      });
      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async deleteGoodById(req, res, next) {
    try {
      let data = await good.destroy({ where: { id: req.params.id } });
      if (!data) {
        return next({ statusCode: 400, messages: ["goods not found"] });
      }
      res.status(200).json({ messages: "Success delete goods" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Goods();
