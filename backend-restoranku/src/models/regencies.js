'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class regencies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  regencies.init({
    kode: {type: DataTypes.INTEGER,
           primaryKey: true},
    kode_provinsi: DataTypes.INTEGER,
    nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'regencies',
    timestamps: false
  });
  return regencies;
};