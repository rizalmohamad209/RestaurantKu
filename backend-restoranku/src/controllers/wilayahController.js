const { regencies, provincies, districts, villages } = require("../models");

module.exports = {
  getAllKabupaten: (req, res) => {
    let { kode } = req.query;
    regencies
      .findAll({
        where: {
          kode_provinsi: kode,
        },
      })
      .then((data) => {
        res.status(200).send({
          msg: "Success get all kabupaten by provinsi",
          status: 200,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed While get all kabupaten by provinsi",
          status: 500,
          error: err,
        });
      });
  },
  getAllProvinsi: (req, res) => {
    provincies
      .findAll()
      .then((data) => {
        res.status(200).send({
          msg: "Success get All Provinsi",
          status: 200,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed While get all provinsi",
          status: 500,
          error: err,
        });
      });
  },
  getAllKecamatanByKab: (req, res) => {
    let { kode } = req.query;
    districts
      .findAll({
        where: {
          kode_kab: kode,
        },
      })
      .then((data) => {
        res.status(200).send({
          msg: "Succes get all kecamatan by kabupaten",
          status: 200,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed While get kecamatan by kabupaten",
          status: 500,
          error: err,
        });
      });
  },
  getAllDesaByKec: (req, res) => {
    let { kode } = req.query;
    villages
      .findAll({
        where: {
          kode_kec: kode,
        },
      })
      .then((data) => {
        res.status(200).send({
          msg: "Success get all desa by kecamatan",
          status: 200,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed while get all desa by kecamatan",
          status: 500,
          error: err,
        });
      });
  },
};
