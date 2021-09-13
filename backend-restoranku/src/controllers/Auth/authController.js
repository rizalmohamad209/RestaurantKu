const { user } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

module.exports = {
  signUp: (req, res) => {
    const { body } = req;
    const saltRounds = 10;

    console.log(body.password);

    body.password = bcrypt.hashSync(body.password, saltRounds);

    user
      .create(body)
      .then((data) => {
        res.status(200).send({
          msg: "Sign Up Succesfully",
          status: 200,
          data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Sign Up Failed",
          status: 500,
          Error: err,
        });
      });
  },
  signIn: async (req, res) => {
    const { body } = req;

    let findUser = await user.findOne({
      where: {
        [Op.or]: [{ username: body.email }, { email: body.email }],
      },
    });
    if (!findUser) {
      res.status(404).send({
        msg: "Sign In is error",
        status: 404,
        error: "User not found",
      });
    }

    const isValidPassword = bcrypt.compareSync(
      body.password,
      findUser.dataValues.password
    );

    if (!isValidPassword) {
      res.status(403).send({
        msg: "Sign is error",
        status: 403,
        error: "Password is invalid",
      });
    }

    const payload = {
      id: findUser.dataValues.id,
      username: findUser.dataValues.username,
      role: findUser.dataValues.role,
      email: findUser.dataValues.email,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 86400,
    });

    delete findUser.dataValues.password;

    res.status(200).send({
      msg: "Sign-in Succesfully",
      status: 200,
      data: { ...findUser.dataValues, token },
    });
  },
  logout: async (req, res) => {
    let blackListToken = req.header("authorization").split(" ")[1];
  },
};
