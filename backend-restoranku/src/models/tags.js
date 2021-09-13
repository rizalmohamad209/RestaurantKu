"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.products, {
        as: "products",
        foreignKey: "product_id",
      });
    }
  }
  tags.init(
    {
      name_tags: DataTypes.STRING,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "tags",
    }
  );
  return tags;
};
