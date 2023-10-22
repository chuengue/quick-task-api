const express = require("express");
const api = express();
const router = require("./src/routes");

api.use(express.json());
api.use(router);

api.listen(9999);
