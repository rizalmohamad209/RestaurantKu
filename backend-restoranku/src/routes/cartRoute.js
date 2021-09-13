const cartRoutes = require("express").Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../helpers/authMiddleware");

cartRoutes.put("/", authMiddleware.checkLogin, cartController.updateCart);
cartRoutes.get(
  "/",
  authMiddleware.checkLogin,
  cartController.getAllCartItemByUser
);
cartRoutes.delete(
  "/:id",
  authMiddleware.checkLogin,
  cartController.deleteProductCart
);

module.exports = cartRoutes;
