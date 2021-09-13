const { alamat_pengiriman } = require("../models");

module.exports = {
  getAlamatPengiriman: (req, res) => {
    let id_user = req.deCodeToken.id;
    alamat_pengiriman
      .findAll({
        where: {
          user_id: id_user,
        },
      })
      .then((data) => {
        res.status(200).send({
          msg: "Success get all alamat pengiriman",
          status: 200,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed while get all alamat pengiriman",
          status: 500,
          error: err,
        });
      });
  },
  postAlamatPengiriman: (req, res) => {
    let id_user = req.deCodeToken.id;
    let { body } = req;

    let newData = {
      ...body,
      user_id: id_user,
    };

    alamat_pengiriman
      .create(newData)
      .then((data) => {
        res.status(200).send({
          msg: "Success post alamat pengiriman",
          status: 200,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed while post alamat pengiriman",
          status: 500,
          error: err,
        });
      });
  },
  editAlamatPengiriman: async (req, res) => {
    let id_user = req.deCodeToken.id;
    let { id } = req.params;
    let { body } = req;
    console.log(id);

    let findAlamat = await alamat_pengiriman.findOne({
      where: { id },
    });

    if (!findAlamat) {
      res.status(404).send({
        msg: "edit alamat failed",
        status: 404,
        error: "Data not found",
      });
    }

    alamat_pengiriman
      .update(body, {
        where: {
          id: id,
          user_id: id_user,
        },
      })
      .then((data) => {
        const resObject = { ...findAlamat.dataValues, ...body };
        res.status(200).send({
          msg: "Success update alamat pengiriman",
          status: 200,
          data: resObject,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed while update alamat pengiriman",
          status: 500,
          error: err,
        });
      });
  },
  deleteAlamat: async (req, res) => {
    let { id } = req.params;
    let id_user = req.deCodeToken.id;

    let findAlamat = await alamat_pengiriman.findOne({ where: { id } });

    if (!findAlamat) {
      res.status(404).send({
        msg: "Error delete alamat",
        status: 404,
        error: "Data not found",
      });
    }

    alamat_pengiriman
      .destroy({
        where: {
          id: id,
          user_id: id_user,
        },
      })
      .then((data) => {
        res.status(200).send({
          msg: "Success delete alamat",
          status: 200,
          data: findAlamat,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed while delete alamat",
          status: 500,
          error: err,
        });
      });
  },
};
