const express = require("express");
const productController = require("./controllers/product.controller");
const routes = express.Router();

routes.get("/list", productController.GetAllProducts);
routes.post("/create", productController.Create);
routes.post("/update", productController.Update);
routes.get("/getOne", productController.GetById);
routes.post("/delete", productController.Delete);

routes.get("/getOne/:uuid", (req, res, next) => {
    const uuid = req.params.id;
    productController
        .GetById(uuid)
        .then((result) => {
            if (result === null) {
                return res.status(200).json({
                    message: "Tarefa inexistente",
                });
            } else {
                res.status(200).json({
                    task: result,
                });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                error: err,
            });
        });
});

module.exports = routes;
