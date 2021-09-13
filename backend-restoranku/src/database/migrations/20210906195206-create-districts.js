'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('districts', {

      kode: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      kode_kab: {
        type: Sequelize.INTEGER
      },
      nama_kec: {
        type: Sequelize.STRING
      },
    
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('districts');
  }
};