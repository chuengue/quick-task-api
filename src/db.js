const sequelize = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();

const database = new sequelize(process.env.DATABASE_NAME,process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    dialect: "mysql",
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialectOptions: {
        ssl: {
          rejectUnauthorized: true,
        },
      },
      define: {
        timestamps: false,
      },
});
database.sync()
   .then(() => {
      console.log('Conexão com o banco de dados estabelecida com sucesso.');
   })
   .catch((error) => {
      console.error('Erro ao conectar-se ao banco de dados:', error);
   });
module.exports = database;
