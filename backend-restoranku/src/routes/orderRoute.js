const orderRoutes = require("express").Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../helpers/authMiddleware");

orderRoutes.post("/", authMiddleware.checkLogin, orderController.createOrder);
orderRoutes.get("/", authMiddleware.checkLogin, orderController.getOrderByUser)
module.exports = orderRoutes