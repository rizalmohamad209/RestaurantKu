const invoicesRoute = require('express').Router();
const invoicesController = require("../controllers/invoicesController")
const authMiddleware = require("../helpers/authMiddleware")


invoicesRoute.get("/:order_id", authMiddleware.checkLogin, invoicesController.getInvoices)
module.exports = invoicesRoute