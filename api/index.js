import express from "express";
import sequelize from "./database.js";
import ClienteRoutes from "./routes/ClienteRoutes.js";
import ProdutoRoutes from "./routes/ProdutoRoutes.js";
import ModeloRoutes from "./routes/ModeloRoutes.js";
import CategoriaRoutes from "./routes/CategoriaRoutes.js";
import CorRoutes from "./routes/CorRoutes.js";
import TecidosRoutes from "./routes/TecidoRoute.js";
import cors from "cors";
import Cor from "./models/Cor.js";
import Tecido from "./models/Tecido.js";
import Categoria from "./models/Categoria.js";
import Produtos from "./models/Produtos.js";
import Cliente from "./models/Clientes.js";
import Modelo from "./models/Modelo.js";
import Endereco from "./models/Endereco.js";
import ClienteEndereco from "./models/ClienteEndereco.js";
import EnderecoRoutes from "./routes/EnderecoRoutes.js";
import CarrinhoProduto from "./models/CarrinhoProduto.js";
import Carrinho from "./models/Carrinho.js";
import CarrinhoRoutes from "./routes/CarrinhoRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

Cliente.belongsToMany(Endereco, {
  through: "ClientesEnderecos",
  foreignKey: "idCliente",
});

Endereco.belongsToMany(Cliente, {
  through: "ClientesEnderecos",
  foreignKey: "idEndereco",
});

Cliente.hasMany(Carrinho, { foreignKey: "idCliente" });
Carrinho.belongsTo(Cliente, { foreignKey: "idCliente" });

Carrinho.belongsToMany(Produtos, {
  through: CarrinhoProduto,
  foreignKey: "idCarrinho",
});
Produtos.belongsToMany(Carrinho, {
  through: CarrinhoProduto,
  foreignKey: "idProduto",
});

sequelize
  .sync()
  .then(() => {
    console.log("Banco de dados sincronizado com suceso");
  })
  .catch((error) => {
    console.log("Falha na sincronização do banco de dados", error);
  });

app.use("/uploads", express.static("uploads"));
app.use("/carrinho", CarrinhoRoutes);
app.use("/clientes", ClienteRoutes);
app.use("/enderecos", EnderecoRoutes);
app.use("/produtos", ProdutoRoutes);
app.use("/modelos", ModeloRoutes);
app.use("/categorias", CategoriaRoutes);
app.use("/cores", CorRoutes);
app.use("/tecidos", TecidosRoutes);

app.listen(8800);
