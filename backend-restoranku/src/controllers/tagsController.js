const { tags } = require("../models");

module.exports = {
  getAlltags: (req, res) => {
    tags
      .findAll()
      .then((data) => {
        res.status(200).send({
          msg: "Succes get all tags",
          status: 200,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed while get all tags",
          status: 500,
          error: err,
        });
      });
  },
  postTags: (req, res) => {
    let { body } = req;
    tags
      .create(body)
      .then((data) => {
        res.status(200).send({
          msg: "Succes post tags",
          status: 200,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed while post tags",
          status: 500,
          error: err,
        });
      });
  },
  updateTags: async (req, res) => {
    let { body } = req;
    let { id } = req.params;

    let findTags = await tags.findOne({ where: { id } });

    if (findTags === null) {
      res.status(404).send({
        msg: "Update tags error",
        status: 404,
        error: " Data not found",
      });
    }

    tags
      .update(body, { where: { id } })
      .then((data) => {
        let resObject = { ...findTags.dataValues, ...body };
        res.status(200).send({
          msg: "Succes update tags",
          status: 200,
          data: resObject,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed while update tags",
          status: 500,
          error: err,
        });
      });
  },
  deleTags: async (req, res) => {
    let { id } = req.params;
    let findTags = await tags.findOne({ where: { id } });
    if (findTags === null) {
      res.status(404).send({
        msg: "Delete tags error",
        status: 404,
        Error: "Data not found",
      });
    }

    tags
      .destroy({
        where: { id },
      })
      .then((data) => {
        res.status(200).send({
          msg: "Succes delete tags",
          status: 200,
          data: findTags.dataValues,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed while delete tags",
          status: 500,
          error: err,
        });
      });
  },
};
