const tagRoute = require("express").Router();
const tagsController = require("../controllers/tagsController");
const tagController = require("../controllers/tagsController");

tagRoute.get("/", tagController.getAlltags);
tagRoute.post("/", tagController.postTags);
tagRoute.put("/:id", tagController.updateTags);
tagRoute.delete("/:id", tagsController.deleTags);

module.exports = tagRoute;
