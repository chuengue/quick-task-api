const sequelize = require("sequelize");
const config = require("./config/config"); 
const env = process.env.NODE_ENV || "prod";

const databaseConfig = config[env];

const database = new sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    dialect: databaseConfig.dialect,
    host: databaseConfig.host,
    port: databaseConfig.port,
    dialectOptions: {... databaseConfig.dialectOptions},
    define: {
      timestamps: false,
    },
  },
    console.log("conexao com banco feita com sucesso"),
);

module.exports = database;
