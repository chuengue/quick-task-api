const sequelize = require("sequelize");
const database = require("../db");
const schema = "";

const User = database.define('User', {
  username: {
    type: sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;