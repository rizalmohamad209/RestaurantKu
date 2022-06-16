"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class alamat_pengiriman extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.order, {
        as: "addresses",
        foreignKey: "address_id"
      })
      this.hasMany(models.invoices, {
        as: "invoices",
        foreignKey: "id"
      })
    }
  }
  alamat_pengiriman.init(
    {
      provinsi: DataTypes.STRING,
      kabupaten: DataTypes.STRING,
      kecamatan: DataTypes.STRING,
      kelurahan: DataTypes.STRING,
      detail_pengiriman: DataTypes.STRING,
      nama_alamat: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "alamat_pengiriman",
    }
  );
  return alamat_pengiriman;
};
