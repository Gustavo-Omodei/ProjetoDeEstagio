import express from "express";
import sequelize from "./database.js";
import ClienteRoutes from "./routes/ClienteRoutes.js";
import ProdutoRoutes from "./routes/ProdutoRoutes.js";
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

app.use("/clientes", ClienteRoutes);
app.use("/produtos", ProdutoRoutes);

app.listen(8800);
