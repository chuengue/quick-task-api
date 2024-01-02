const express = require("express");
const taskController = require("../controllers/task.controller");
const taskRoutes = express.Router();

taskRoutes.get("/task", taskController.GetAllTasks);
taskRoutes.post("/task", taskController.Create);
taskRoutes.put("/task/:id", taskController.Update);
taskRoutes.get("/task/:id", taskController.GetById);
taskRoutes.delete("/task/:id", taskController.Delete);
taskRoutes.get("/search", taskController.Search);

module.exports = taskRoutes;
