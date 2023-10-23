const express = require("express");
const api = express();
const router = require("./src/routes");
api.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
api.use(express.json());
api.use(router);

api.listen(9999);
