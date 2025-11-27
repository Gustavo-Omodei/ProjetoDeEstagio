import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Carrinho from "./Carrinho.js";

const CarrinhoProduto = sequelize.define(
  "CarrinhoProduto",
  {
    idCarrinho: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Carrinhos", key: "id" },
    },
    idModelo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idCor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idTecido: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

export default CarrinhoProduto;
