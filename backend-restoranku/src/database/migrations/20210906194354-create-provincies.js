'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('provincies', {
    
      kode: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      nama_prov: {
        type: Sequelize.STRING
      },
     
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('provincies');
  }
};