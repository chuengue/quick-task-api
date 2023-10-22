const express = require("express");
const productController = require("./controllers/product.controller");
const routes = express.Router();

routes.get("/list", productController.GetAllProducts);
routes.post("/create", productController.Create);
routes.post("/update", productController.Update);
routes.get("/getOne", productController.GetById);
routes.post("/delete", productController.Delete);
routes.get("/search", productController.Search);

module.exports = routes;
