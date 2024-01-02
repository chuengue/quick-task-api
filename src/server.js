const express = require("express");

const api = express();
const taskRoutes = require("./routes/taskRoutes");

api.use((req, res, next) => {
  console.log(`Solicitação recebida em: ${new Date()}`);
  next(); 
});

api.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

api.use(express.json());
api.use(taskRoutes);

api.listen(9999, () => {
  console.log('Servidor em execução na porta 9999');
});
