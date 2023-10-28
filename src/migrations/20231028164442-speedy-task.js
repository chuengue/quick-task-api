const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      priority: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: true,
      },
      isRoutine: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      startDateRoutine: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      endDateRoutine: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('NomeDaTabela');
  }
};
