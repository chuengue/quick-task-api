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
  
);

database.sync()
   .then(() => {
      console.log(`Conexão com o banco de dados de ${env} estabelecida com sucesso.`);
   })
   .catch((error) => {
      console.error('Erro ao conectar-se ao banco de dados:', error);
   });
module.exports = database;
