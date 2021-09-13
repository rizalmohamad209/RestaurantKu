const productsRoute = require("express").Router();
const productController = require("../controllers/productController");
const uploadMiddleware = require("../helpers/uploadMiddleware");
const uploadCloudinary = require("../helpers/cloudinary");

productsRoute.get("/", productController.getAllProducts);
productsRoute.put(
  "/:id",
  uploadMiddleware,
  uploadCloudinary,
  productController.updateProduct
);
productsRoute.delete("/:id", productController.deleteProduct);
productsRoute.post("/", productController.postProduct);
module.exports = productsRoute;
