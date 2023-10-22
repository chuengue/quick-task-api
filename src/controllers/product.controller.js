const modelTasks = require("../models/task");
const Sequelize = require("sequelize");
module.exports = {
  async GetAllProducts(req, res) {
    try {
      const tasks = await modelTasks.findAll();
      const totalItens = tasks.length;
      const response = {
        data: tasks,
        totalItens,
      };
      return res.json(response);
    } catch (error) {
      res.status(500).json({
        error: {
          code: 2,
          message: {
            text: "Erro ao buscar tarefas",
            error: error.message,
          },
        },
      });
      return console.error("Error: " + error.message);
    }
  },
  async Create(req, res) {
    try {
      const tasks = req.body;

      for (const task of tasks) {
        if (task.priority < 1 || task.priority > 4) {
          return res.status(400).json({
            error: {
              code: 1,
              message: {
                text: "Prioridade fora do intervalo válido (de 1 a 4).",
              },
            },
          });
        }
      }

      const createdTasks = await modelTasks.bulkCreate(tasks);
      return res.json(createdTasks);
    } catch (error) {
      console.error("Error create: " + error);
      return res.status(500).json({
        error: {
          code: 9,
          message: {
            text: "Erro ao criar tarefa",
            error: error,
          },
        },
      });
    }
  },
  async Update(res, req) {
    try {
      const prod = await modelTasks.findByPk(req.body.uuid);

      if (prod) {
        prod.name = req.body.description;
        prod.description = req.body.description;
        prod.date = req.body.date;
        prod.priority = req.body.priority;
        prod.routineFrequency = req.body.routineFrequency;
        prod.updatedAt = req.body.updatedAt;
        prod.save;
      }
      return res.json(prod);
    } catch (error) {
      return console.error("Error update: " + error.message);
    }
  },
  async GetById(req, res) {
    try {
      const taskId = req.query.id;
      console.log(req.params);
      const task = await modelTasks.findByPk(taskId);

      if (!task) {
        return res.status(404).json({
          error: {
            code: 3,
            message: {
              text: "Tarefa não encontrada",
            },
          },
        });
      }

      return res.json(task);
    } catch (error) {
      console.error("Erro getById: " + error.message);
      return res.status(500).json({
        error: {
          code: 2,
          message: {
            text: "Erro ao buscar tarefa",
            error: error.message,
          },
        },
      });
    }
  },
  async Search(req, res) {
    try {
      const searchArgument = req.query;
      const key = Object.keys(searchArgument)[0];
      const value = searchArgument[key];

      let searchResult;

      switch (key) {
        case "name":
          searchResult = await modelTasks.findAll({
            where: {
              name: {
                [Sequelize.Op.like]: `%${value}%`,
              },
            },
          });
          break;
        case "description":
          searchResult = await modelTasks.findAll({
            where: {
              description: {
                [Sequelize.Op.like]: `%${value}%`,
              },
            },
          });
          break;
        case "priority":
          searchResult = await modelTasks.findAll({
            where: {
              priority: {
                [Sequelize.Op.like]: `%${value}%`,
              },
            },
          });
          break;
        default:
          return res.status(400).json({
            error: {
              code: 4,
              message: {
                text: "Critério de pesquisa inválido",
              },
            },
          });
      }

      if (searchResult.length === 0) {
        return res.status(404).json({
          error: {
            code: 3,
            message: {
              text: "Nenhuma tarefa encontrada",
            },
          },
        });
      }

      return res.json(searchResult);
    } catch (error) {
      console.error("Erro na pesquisa: " + error.message);
      return res.status(500).json({
        error: {
          code: 2,
          message: {
            text: "Erro ao buscar tarefas",
            error: error.message,
          },
        },
      });
    }
  },
  async Delete(req, res) {
    try {
      const taskId = req.query.id;
      console.log(taskId);
      const task = await modelTasks.findByPk(taskId);
      if (!task) {
        return res.status(404).json({
          error: {
            code: 3,
            message: {
              text: "Tarefa não encontrada",
            },
          },
        });
      }
      await task.destroy();
      return res.json({ message: "deleted task", code: 10 });
    } catch (error) {
      return console.error("Error update: " + error.message);
    }
  },
};
