"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.customer.hasMany(models.transaction, {
        foreignKey: "id_customer",
      });
    }
  }
  customer.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true, // enable soft delete (deletedAt)
      timestamps: true, // enable createdAt and updatedAt
      modelName: "customer",
    }
  );
  return customer;
};
