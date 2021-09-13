'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('villages', {
   
  
      kode: {

        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kode_kec: {
        type: Sequelize.INTEGER
      },
      nama_desa: {
        type: Sequelize.STRING
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('villages');
  }
};