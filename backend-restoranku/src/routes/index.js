const mainRoutes = require("express").Router();
const pengirimanRoutes = require("./alamatPengirimanRoute");
const authRoutes = require("./authRoute");
const cartRoutes = require("./cartRoute");
const categoryRoute = require("./categoryRoute");
const productsRoute = require("./productsRoute");
const tagRoute = require("./tagsRoute");
const wilayahRoutes = require("./wilayahRoute")

mainRoutes.use("/wilayah", wilayahRoutes)
mainRoutes.use("/category", categoryRoute);
mainRoutes.use("/tags", tagRoute);
mainRoutes.use("/products", productsRoute);
mainRoutes.use("/cart", cartRoutes);
mainRoutes.use("/auth", authRoutes);
mainRoutes.use("/pengiriman", pengirimanRoutes)
module.exports = mainRoutes;
