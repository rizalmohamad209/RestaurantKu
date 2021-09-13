"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      products.belongsTo(models.category, {
        foreignKey: "category",
        as: "categories",
      });

      this.hasMany(models.tags, {
        as: "tags",
        foreignKey: "product_id",
      });
    }
  }
  products.init(
    {
      name_products: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image: DataTypes.STRING,
      category: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "products",
    }
  );
  return products;
};
