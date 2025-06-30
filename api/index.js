import express from "express";
import sequelize from "./database.js";
import ClienteController from "./controllers/ClienteController.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

sequelize
  .sync()
  .then(() => {
    console.log("Banco de dados sincronizado com suceso");
  })
  .catch((error) => {
    console.log("Falha na sincronização do banco de dados", error);
  });

app.get("/clientes", ClienteController.listarClientes);
app.get("/clientes/:id", ClienteController.listarPorID);
app.post("/clientes", ClienteController.cadastrarCliente);
app.put("/clientes/:id", ClienteController.atualizarCliente);
app.delete("/clientes/:id", ClienteController.deletar);

app.listen(8800);
