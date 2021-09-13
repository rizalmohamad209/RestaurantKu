'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class villages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  villages.init({
    kode: {type:DataTypes.INTEGER,
    primaryKey:true},
    kode_kec: DataTypes.INTEGER,
    nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'villages',
    timestamps:false
  });
  return villages;
};