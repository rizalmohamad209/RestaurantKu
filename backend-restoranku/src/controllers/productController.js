const { Op } = require("sequelize");
const { products, category, tags } = require("../models");

module.exports = {
  getAllProducts: (req, res) => {
    let { tagsi = [], q = "", categori = "" } = req.query;
    console.log(tagsi);
    products
      .findAll({
        include: [
          {
            model: category,
            as: "categories",
            attributes: ["name_category"],
            where: {
              name_category: { [Op.like]: `%${categori}%` },
            },
          },
          {
            model: tags,
            as: "tags",
            where: {
              name_tags: { [Op.like]: `%${tagsi}%` },
            },
          },
        ],
        where: {
          name_products: { [Op.like]: `%${q}%` },
        },
      })
      .then((data) => {
        res.status(200).send({
          msg: "Succes get products by tags",
          status: 200,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed while get products by tags",
          status: 500,
          error: err,
        });
      });
  },
  postProduct: (req, res) => {
    let { body } = req;

    const newData = {
      ...body,
      image: req.image.url,
    };

    products
      .create(newData)
      .then((data) => {
        res.status(200).send({
          msg: "Succes post products",
          status: 200,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed while post products",
          status: 500,
          error: err,
        });
      });
  },
  updateProduct: async (req, res) => {
    let { id } = req.params;
    let { body } = req;

    let findProducts = await products.findOne({ where: { id } });

    if (findProducts === null) {
      res.status(404).send({
        msg: " Update products error",
        status: 404,
        error: "Data not found",
      });
    }

    const newData = {
      ...body,
      image: req.image.url,
    };

    products
      .update(newData, { where: { id } })
      .then((data) => {
        const resObject = { ...findProducts.dataValues, ...newData };
        res.status(200).send({
          msg: "Succes update product",
          status: 200,
          data: resObject,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed while update product",
          status: 500,
          error: err,
        });
      });
  },
  deleteProduct: async (req, res) => {
    let { id } = req.params;
    let findProducts = await products.findOne({ where: { id } });

    if (findProducts === null) {
      res.status(404).send({
        msg: "Delete product error",
        status: 404,
        error: "Data not found",
      });
    }

    products
      .destroy({ where: { id } })
      .then((data) => {
        res.status(200).send({
          msg: "Succes delete product",
          status: 200,
          data: findProducts.dataValues,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed while delete product",
          status: 500,
          error: err,
        });
      });
  },
};
