const { invoices, alamat_pengiriman, user } = require("../models")
module.exports = {
    getInvoices: (req, res) => {
        let { order_id } = req.params;
        invoices.findOne({
            include: [
                {
                    model: alamat_pengiriman,
                    as: "addresses"
                },
                {
                    model: user,
                    as: "users"
                }
            ],
            where: {
                user_id: req.deCodeToken.id,
                order_id: order_id
            }
        }).then((data) => {
            res.status(200).send({
                message: "Success get invoices",
                status: 200,
                data: data
            })
        }).catch((err) => {
            res.status(500).send({
                message: "Failed get invoices",
                status: 500,
                error: err
            })
        })
    }
}