require("dotenv").config({});
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());
const mainRoutes = require("./src/routes");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", mainRoutes);

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
