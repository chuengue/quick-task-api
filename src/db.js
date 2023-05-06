const sequelize = require("sequelize");
const database = new sequelize("dbtodo", "eduardo", "99068547", {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
});
database.sync();

module.exports = database;
