const express = require("express");
const taskController = require("./controllers/product.controller");
const routes = express.Router();

routes.get("/task", taskController.GetAllTasks);
routes.post("/task", taskController.Create);
routes.put("/task/:id", taskController.Update);
routes.get("/task/:id", taskController.GetById);
routes.delete("/task/:id", taskController.Delete);
routes.get("/search", taskController.Search);

module.exports = routes;
