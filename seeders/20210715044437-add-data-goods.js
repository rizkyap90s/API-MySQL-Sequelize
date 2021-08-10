"use strict";
const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("goods", [
      {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        id_supplier: 1,
        image: faker.image.imageUrl(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        id_supplier: 1,
        image: faker.image.imageUrl(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        id_supplier: 1,
        image: faker.image.imageUrl(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("goods", null, {});
  },
};
