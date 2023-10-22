const sequelize = require("sequelize");
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
      defaultValue: false,
    },
    startDateRoutine: {
      type: sequelize.STRING,
    },
    endDateRoutine: {
      type: sequelize.STRING,
    },
  },
  {
    sequelize: database,
    modelName: "tasks",
    schema: schema,
  },
);

module.exports = Tasks;
