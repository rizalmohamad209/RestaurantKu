const authController = require("../controllers/Auth/authController");

const authRoutes = require("express").Router();

authRoutes.post("/signup", authController.signUp);
authRoutes.post("/signin", authController.signIn);

module.exports = authRoutes;
