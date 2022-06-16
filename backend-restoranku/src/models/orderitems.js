'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.order, {
        foreignKey: "order_id",
        as: "orders"

      });
      this.belongsTo(models.products, {
        foreignKey: "product_id",
        as: "productss"


      })
    }
  };
  orderItems.init({

    order_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orderItems',
  });
  return orderItems;
};