import { DataTypes } from "sequelize";
import sequelize from "../database.js";

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

export default CarrinhoProduto;
