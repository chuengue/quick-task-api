const modelTasks = require("../models/task");

const Sequelize = require("sequelize");

const createResponse = (task) => {
  const responseModel = {
    id: task.id,
    name: task.name,
    description: task.description,
    date: task.date,
    priority: task.priority,
    isRoutine: task.isRoutine,
    routineFrequency: {
      startDate: task.startDateRoutine,
      endDate: task.endDateRoutine,
    },
    updatedAt: task.updatedAt,
    createdAt: task.createdAt,
  };
  return responseModel;
};
const createErrorResponse = (code, message) => {
  return {
    error: {
      code,
      message: {
        text: message,
      },
    },
  };
};
module.exports = {
  async GetAllTasks(req, res) {
    try {
      const tasks = await modelTasks.findAll();
      const totalItens = tasks.length;
      const response = {
        data: tasks.map((e) => createResponse(e)),
        totalItens,
      };
      return res.json(response);
    } catch (error) {
      res.status(500).json(createErrorResponse(2, "Erro ao buscar Tarefas."));
      return console.error("Error: " + error.message);
    }
  },

  async Create(req, res) {
    try {
      const tasks = req.body;
      if (tasks.isRoutine) {
      }
      for (const task of tasks) {
        if (task.priority < 1 || task.priority > 4) {
          return res
            .status(400)
            .json(
              createErrorResponse(1, "Prioridade fora do intervalo válido (de 1 a 4)."),
            );
        }
      }
      const modelTask = {
        name: tasks.name,
        description: tasks.description,
        date: tasks.date,
        priority: tasks.priority,
        isRoutine: tasks.isRoutine,
        startDateRoutine: tasks.routineFrequency.startDate,
        endDateRoutine: tasks.routineFrequency.endDate,
      };
      const createdTasks = await modelTasks.create(modelTask);
      return res.json(createResponse(createdTasks));
    } catch (error) {
      console.error("Error create: " + error);
      return res.status(500).json(createErrorResponse(9, "Erro o criar tarefa"));
    }
  },
  async Update(req, res) {
    try {
      const taskId = req.params.id;
      const task = await modelTasks.findByPk(taskId);

      if (!task) {
        return res.status(404).json(createErrorResponse(7, "Tarefa não encontrada."));
      }

      if (req.body.name && req.body.name.trim() !== "") {
        task.name = req.body.name;
      } else {
        return res
          .status(400)
          .json(
            createErrorResponse(
              10,
              "O campo 'Nome' é obrigatório e não pode estar vazio.",
            ),
          );
      }
      task.description = req.body.description;
      task.date = req.body.date;
      task.priority = req.body.priority;

      if (req.body.routineFrequency) {
        if (req.body.routineFrequency.startDate && req.body.routineFrequency.endDate) {
          task.startDateRoutine = req.body.routineFrequency.startDate;
          task.endDateRoutine = req.body.routineFrequency.endDate;
        }
      }

      task.updatedAt = req.body.updatedAt;

      await task.save();

      return res.json(createResponse(task));
    } catch (error) {
      console.error("Error update: " + error.message);
      return res.status(500).json(createErrorResponse(8, "Erro ao atualizar tarefa."));
    }
  },
  async GetById(req, res) {
    try {
      const taskId = req.params.id;
      const task = await modelTasks.findByPk(taskId);

      if (!task) {
        return res.status(404).json(createErrorResponse(3, "Tarefa não encontrada"));
      }

      return res.json(createResponse(task));
    } catch (error) {
      console.error("Erro getById: " + error.message);
      return res.status(500).json(createErrorResponse(2, "Erro ao buscar Tarefa."));
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
          return res
            .status(400)
            .json(createErrorResponse(4, "Critério de pesquisa inválido"));
      }

      if (searchResult.length === 0) {
        return res.status(404).json(createErrorResponse(3, "Nenhuma tarefa encontrada"));
      }
      const totalItens = searchResult.length;
      const response = {
        data: searchResult.map((e) => createResponse(e)),
        totalItens,
      };
      return res.json(response);
    } catch (error) {
      console.error("Erro na pesquisa: " + error.message);
      return res.status(500).json(2, "Erro ao buscar tarefas.");
    }
  },
  async Delete(req, res) {
    try {
      const taskId = req.params.id; // Use req.params para obter o ID da URL
      console.log(req.params.id);
      const task = await modelTasks.findByPk(taskId);

      if (!task) {
        return res.status(404).json(createErrorResponse(3, "Tarefa não encontrada"));
      }

      await task.destroy();

      return res.json({ message: "Tarefa excluída com sucesso", code: 10 });
    } catch (error) {
      console.error("Error delete: " + error.message);
      return res.status(500).json(createErrorResponse(11, "Erro ao excluir a tarefa."));
    }
  },
};
