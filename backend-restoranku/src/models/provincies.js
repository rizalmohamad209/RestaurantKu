'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class provincies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  provincies.init({
    kode: {type:DataTypes.INTEGER,
            primaryKey:true},
    nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'provincies',
    timestamps:false
  });
  return provincies;
};