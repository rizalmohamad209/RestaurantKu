const { category } = require("../models");

module.exports = {
  getAllCategory: (req, res) => {
    category
      .findAll()
      .then((data) => {
        res.status(200).send({
          msg: "Success get all category",
          status: 200,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed while get all category",
          status: 500,
          error: err,
        });
      });
  },
  postCategory: (req, res) => {
    const { body } = req;
    category
      .create(body)
      .then((data) => {
        res.status(200).send({
          msg: "Success post cateory",
          status: 200,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed while post category",
          status: 500,
          error: err,
        });
      });
  },
  updateCategory: async (req, res) => {
    const { id } = req.params;
    let { body } = req;

    let findCategory = await category.findOne({
      where: { id },
    });

    if (findCategory === null) {
      res.status(404).send({
        msg: "Update category failed",
        status: 404,
        error: "Data not found",
      });
    }
    category
      .update(body, { where: { id } })
      .then((data) => {
        const resObject = { ...findCategory.dataValues, ...body };
        res.status(200).send({
          msg: "Succes update category",
          status: 200,
          data: resObject,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed while update category",
          status: 500,
          error: err,
        });
      });
  },
  deleteCategory: async (req, res) => {
    const { id } = req.params;

    let findCategory = await category.findOne({
      where: { id },
    });

    if (findCategory === null) {
      res.status(404).send({
        msg: "Delete categori failed",
        status: 404,
        error: "Data not found",
      });
    }

    category
      .destroy({ where: { id } })
      .then((data) => {
        res.status(200).send({
          msg: "Succes delete category",
          status: 200,
          data: findCategory,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed while delete category",
          status: 500,
          error: err,
        });
      });
  },
};
