const pengirimanRoutes = require("express").Router();
const pengirimanController = require("../controllers/pengirimanController");
const authMiddleware = require("../helpers/authMiddleware");

pengirimanRoutes.get(
  "/",
  authMiddleware.checkLogin,
  pengirimanController.getAlamatPengiriman
);
pengirimanRoutes.post(
  "/",
  authMiddleware.checkLogin,
  pengirimanController.postAlamatPengiriman
);
pengirimanRoutes.put(
  "/:id",
  authMiddleware.checkLogin,
  pengirimanController.editAlamatPengiriman
);
pengirimanRoutes.delete(
  "/:id",
  authMiddleware.checkLogin,
  pengirimanController.deleteAlamat
);

module.exports = pengirimanRoutes;
