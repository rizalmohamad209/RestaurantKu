'use strict';
const { Sequelize } = require("sequelize");
const {
  Model
} = require('sequelize');

const { invoices } = require("./invoices");
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.orderItems, {
        foreignKey: "order_id",
        as: "orderItems"

      })
      this.belongsTo(models.alamat_pengiriman, {
        as: "addresses",
        foreignKey: "address_id"
      })
    }
  };
  order.init({

    address_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    status: {
      type: Sequelize.DataTypes.ENUM(["waiting_payment", "processing", "in_delivery", "delivered"]),
      defaultValue: "waiting_payment",
    },
    ongkir: DataTypes.INTEGER,
    totalHarga: DataTypes.INTEGER
  }, {

    sequelize,
    modelName: 'order',
  });

  order.addHook('afterCreate', async (ord, options) => {

    await sequelize.models.invoices.create({
      sub_total: ord.totalHarga,
      total: ord.totalHarga + ord.ongkir,
      address_id: ord.address_id,
      user_id: ord.user_id,
      ongkir: ord.ongkir,
      order_id: ord.id

    })

  })
  return order;
};