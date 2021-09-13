"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("cartItems", "name", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("cartItems", "image", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("cartItems", "price", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("cartItems", "name");

    await queryInterface.removeCOlumn("cartItems", "image");

    await queryInterface.removeColumn("cartItems", "price");
  },
};
