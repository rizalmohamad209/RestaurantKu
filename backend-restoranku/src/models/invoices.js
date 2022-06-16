'use strict';
const { Sequelize } = require("sequelize");
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class invoices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.alamat_pengiriman, {
        as: "addresses",
        foreignKey: "address_id"
      })
      this.belongsTo(models.user, {
        as: "users",
        foreignKey: "user_id"
      })
    }
  };
  invoices.init({
    sub_total: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    address_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    status: {
      type: Sequelize.DataTypes.ENUM(["waiting_payment", "paid"]),
      defaultValue: "waiting_payment",
    },
    ongkir: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER
  }, {

    sequelize,
    modelName: 'invoices',
  });
  return invoices;
};