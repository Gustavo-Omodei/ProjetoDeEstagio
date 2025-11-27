import express from "express";
import cors from "cors";
import sequelize from "./database.js";

// Routes
import ClienteRoutes from "./routes/ClienteRoutes.js";
import ProdutoRoutes from "./routes/ProdutoRoutes.js";
import ModeloRoutes from "./routes/ModeloRoutes.js";
import CategoriaRoutes from "./routes/CategoriaRoutes.js";
import CorRoutes from "./routes/CorRoutes.js";
import TecidosRoutes from "./routes/TecidoRoute.js";
import EnderecoRoutes from "./routes/EnderecoRoutes.js";
import CarrinhoRoutes from "./routes/CarrinhoRoutes.js";

// Models
import Cliente from "./models/Clientes.js";
import Endereco from "./models/Endereco.js";
import ClienteEndereco from "./models/ClienteEndereco.js";
import Categoria from "./models/Categoria.js";
import Modelo from "./models/Modelo.js";
import Produtos from "./models/Produtos.js";
import Cor from "./models/Cor.js";
import Tecido from "./models/Tecido.js";
import Carrinho from "./models/Carrinho.js";
import CarrinhoProduto from "./models/CarrinhoProduto.js";

const app = express();

app.use(cors());
app.use(express.json());

// ===================== RELACIONAMENTOS =====================

// Cliente ↔ Endereco (Many-to-Many)
Cliente.belongsToMany(Endereco, {
  through: "ClientesEnderecos",
  foreignKey: "idCliente",
});
Endereco.belongsToMany(Cliente, {
  through: "ClientesEnderecos",
  foreignKey: "idEndereco",
});

// Modelo ↔ Categoria (Many-to-One)
Modelo.belongsTo(Categoria, { foreignKey: "idCategoria" });
Categoria.hasMany(Modelo, { foreignKey: "idCategoria" });

// Cliente ↔ Carrinho (One-to-One)
Cliente.hasOne(Carrinho, { foreignKey: "idCliente" });
Carrinho.belongsTo(Cliente, { foreignKey: "idCliente" });

// Carrinho ↔ CarrinhoProduto (One-to-Many)
Carrinho.hasMany(CarrinhoProduto, { foreignKey: "idCarrinho" });
CarrinhoProduto.belongsTo(Carrinho, { foreignKey: "idCarrinho" });

// CarrinhoProduto ↔ Modelo/Cor/Tecido (Many-to-One)
CarrinhoProduto.belongsTo(Modelo, { foreignKey: "idModelo" });
CarrinhoProduto.belongsTo(Cor, { foreignKey: "idCor" });
CarrinhoProduto.belongsTo(Tecido, { foreignKey: "idTecido" });

// ============================================================

// Sincronização do banco
sequelize
  .sync()
  .then(() => console.log("Banco de dados sincronizado com sucesso"))
  .catch((error) =>
    console.log("Falha na sincronização do banco de dados", error)
  );

// Rotas
app.use("/uploads", express.static("uploads"));
app.use("/carrinho", CarrinhoRoutes);
app.use("/clientes", ClienteRoutes);
app.use("/enderecos", EnderecoRoutes);
app.use("/produtos", ProdutoRoutes);
app.use("/modelos", ModeloRoutes);
app.use("/categorias", CategoriaRoutes);
app.use("/cores", CorRoutes);
app.use("/tecidos", TecidosRoutes);

// Servidor
app.listen(8800, () => {
  console.log("Servidor rodando na porta 8800");
});
