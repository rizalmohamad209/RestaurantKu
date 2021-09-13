"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cartItem.init(
    {
      product_id: DataTypes.INTEGER,
      usr_id: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      name_products: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "cartItem",
    }
  );
  return cartItem;
};
