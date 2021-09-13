const jwt = require("jsonwebtoken");

module.exports = {
  checkLogin: (req, res, next) => {
    const bearer = req.header("authorization");
    console.log(bearer);
    console.log();
    if (!bearer) {
      res.status(401).send({
        msg: "Please login first",
        status: 401,
        Error: "You must login",
      });
    } else {
      const token = bearer.split(" ")[1];
      try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.deCodeToken = decodedToken;
        next();
      } catch (err) {
        res.status(401).send({
          msg: "Can't Access",
          status: 401,
          error: "Invalid Token",
        });
      }
    }
  },
};
