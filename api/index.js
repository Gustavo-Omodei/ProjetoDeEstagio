import express from "express";
import sequelize from "./database.js";
import ClienteRoutes from "./routes/ClienteRoutes.js";
import ProdutoRoutes from "./routes/ProdutoRoutes.js";
import ModeloRoutes from "./routes/ModeloRoutes.js";
import CategoriaRoutes from "./routes/CategoriaRoutes.js";
import cors from "cors";
import Modelo from "./models/Modelo.js";
import Cor from "./models/Cor.js";
import Tecido from "./models/Tecido.js";
import Categoria from "./models/Categoria.js";
import Produtos from "./models/Produtos.js";
import Cliente from "./models/Clientes.js";

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

app.use("/uploads", express.static("uploads"));

app.use("/clientes", ClienteRoutes);
app.use("/produtos", ProdutoRoutes);
app.use("/modelos", ModeloRoutes);
app.use("/categorias", CategoriaRoutes);

app.listen(8800);
