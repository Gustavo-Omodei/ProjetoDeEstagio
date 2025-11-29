import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Carrinho from "./Carrinho.js";
import Produto from "./Produtos.js";

const CarrinhoProduto = sequelize.define(
  "CarrinhoProduto",
  {
    idCarrinho: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Carrinhos", key: "id" },
    },
    idProduto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Produtos", key: "id" },
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
    tableName: "CarrinhoProdutos",
  }
);

// Associações
Carrinho.hasMany(CarrinhoProduto, { foreignKey: "idCarrinho" });
CarrinhoProduto.belongsTo(Carrinho, { foreignKey: "idCarrinho" });

CarrinhoProduto.belongsTo(Produto, { foreignKey: "idProduto" });
Produto.hasMany(CarrinhoProduto, { foreignKey: "idProduto" });

export default CarrinhoProduto;
