const { order, orderItems, cartItem, alamat_pengiriman, products } = require("../models");



module.exports = {
    createOrder: async (req, res) => {

        let { ongkir, address_id } = req.body

        try {


            let items = await cartItem.findAll({
                where: {
                    usr_id: req.deCodeToken.id,
                },
            })


            if (!items.length) {
                res.status(500).send({
                    msg: "Can't create order because you have not items in cart",
                    status: 500,

                });
            }

            let data = items.map((item) => {
                return item.dataValues
            });

            let subTotal = data.reduce((sum, item) => sum += (item.price * item.qty), 0)
            let orders = {
                ongkir,
                address_id,
                user_id: req.deCodeToken.id,
                totalHarga: subTotal
            }
            let ordered = await order.create(orders)


            let insertBulk = await orderItems.bulkCreate(items.map((itm) => ({
                ...itm,
                order_id: ordered.dataValues.id,
                product_id: parseInt(itm.product_id),
                qty: parseInt(itm.qty),

            })))


            return res.status(200).send({
                msg: "Success create order",
                status: 200,
                data: ordered.dataValues
            })



        } catch (err) {
            res.status(500).send({
                msg: "Failed post order",
                status: 500,
                error: err,
            });
        }



    },
    getOrderByUser: (req, res) => {
        order.findAll({
            include: [
                {
                    model: orderItems,
                    as: "orderItems",
                    include: {
                        model: products,
                        as: "productss"

                    }
                },

                {
                    model: alamat_pengiriman,
                    as: "addresses"
                }
            ],
            where: {
                user_id: req.deCodeToken.id
            }
        }).then((data) => {
            res.status(200).send({
                msg: "succes get all orders",
                status: 200,
                data: data,
            });
        })
            .catch((err) => {
                res.status(500).send({
                    msg: "Failed while get data order",
                    status: 500,
                    error: err,
                });
            });
    }
}