const categoryRoute = require("express").Router();
const categoryController = require("../controllers/categoryController");

categoryRoute.get("/", categoryController.getAllCategory);
categoryRoute.post("/", categoryController.postCategory);
categoryRoute.put("/:id", categoryController.updateCategory);
categoryRoute.delete("/:id", categoryController.deleteCategory);

module.exports = categoryRoute;
