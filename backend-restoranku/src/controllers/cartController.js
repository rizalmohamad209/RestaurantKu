const { cartItem, products } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  updateCart: async (req, res) => {
    const { body } = req;
    console.log(body);
    const productsId = body.map((itm) => {
      return itm.id;
    });

    console.log(productsId);
    let productss = await products.findAll({
      where: {
        id: {
          [Op.in]: productsId,
        },
      },
    });

    console.log(productss);
    try {
      const cartItems = body.map((item) => {
        let relatedProduct = productss.find(
          (product) => product.id === item.id
        );
        data = {
          id: relatedProduct.id,
          product_id: relatedProduct.id,
          name_products: relatedProduct.name_products,
          image: relatedProduct.image,
          price: relatedProduct.price,
          qty: item.qty,
          usr_id: req.deCodeToken.id,
        };
        cartItem.upsert(data);
        return data;
      });

      res.status(200).send({
        msg: "Succes  update cart items",
        status: 200,
        data: cartItems,
      });
    } catch (err) {
      res.status(500).send({
        msg: "Failed While update cart items",
        status: 500,
        err,
      });
    }

    // console.log(productss);

    // console.log("ini body", req.body.qty);

    // productss.map((itm) => {
    //   let idP = itm.id;
    //   console.log(idP);
    //   const data = {
    //     id: idP,
    //     product_id: idP,
    //     name: itm.name_products,
    //     image: itm.image,
    //     price: itm.price,
    //   };

    //   console.log("ini new Data", data);
    //   cartItem.upsert(data);
    // });
  },
  getAllCartItemByUser: (req, res) => {
    cartItem
      .findAll({
        where: {
          usr_id: req.deCodeToken.id,
        },
      })
      .then((data) => {
        res.status(200).send({
          msg: "succes get cart items",
          status: 200,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed while get data cart items",
          status: 500,
          error: err,
        });
      });
  },
  deleteProductCart: async (req, res) => {
    let { id } = req.params;

    cartItem
      .destroy({
        where: {
          id: id,
          usr_id: req.deCodeToken.id,
        },
      })
      .then((data) => {
        res.status(200).send({
          msg: "Success delete product cart",
          status: 200,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed while delete product cart",
          status: 500,
          error: err,
        });
      });
  },
};
