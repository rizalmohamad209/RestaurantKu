'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('regencies', {
      kode: {
        type: Sequelize.INTEGER,
         primaryKey: true,
      },
      kode_provinsi: {
        type: Sequelize.INTEGER
      },
      nama_kab: {
        type: Sequelize.STRING
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('regencies');
  }
};