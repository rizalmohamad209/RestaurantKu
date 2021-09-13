const wilayahRoutes = require("express").Router()
const wilayahController = require("../controllers/wilayahController")

wilayahRoutes.get("/kabupaten/", wilayahController.getAllKabupaten)
wilayahRoutes.get("/provinsi", wilayahController.getAllProvinsi)
wilayahRoutes.get("/kecamatan/", wilayahController.getAllKecamatanByKab)
wilayahRoutes.get("/kelurahan/", wilayahController.getAllDesaByKec)

module.exports = wilayahRoutes