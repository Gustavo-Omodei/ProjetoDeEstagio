import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Produtos from "./Produtos.js";
import Carrinho from "./Carrinho.js";

const CarrinhoProduto = sequelize.define(
  "CarrinhoProduto",
  {
    idCarrinho: {
      type: DataTypes.INTEGER,
      references: { model: "Carrinhos", key: "id" },
    },
    idProduto: {
      type: DataTypes.INTEGER,
      references: { model: "Produtos", key: "id" },
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  { timestamps: false }
);

CarrinhoProduto.belongsTo(Produtos, { foreignKey: "idProduto" });
CarrinhoProduto.belongsTo(Carrinho, { foreignKey: "idCarrinho" });

export default CarrinhoProduto;
