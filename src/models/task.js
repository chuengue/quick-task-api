const sequelize = require("sequelize");
const uuid = require("uuid");
const database = require("../db");
const schema = "";

class Tasks extends sequelize.Model {}

Tasks.init(
  {
    id: {
      type: sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: sequelize.UUIDV4,
    },
    name: {
      type: sequelize.TEXT,
      allowNull: false,
    },
    description: {
      type: sequelize.TEXT,
      allowNull: true,
    },
    date: {
      type: sequelize.DATE,
      allowNull: true,
    },
    priority: {
      type: sequelize.INTEGER,
      defaultValue: 1,
      allowNull: true,
    },
    isRoutine: {
      type: sequelize.BOOLEAN,
      allowNull: false,
    },
    routineFrequency: {
      type: sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize: database,
    modelName: "tasks",
    schema: schema,
  },
);

module.exports = Tasks;
