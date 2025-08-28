import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Modelo from "./Modelo.js";

const Produtos = sequelize.define(
  "Produtos",
  {
    nomeProduto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tamanho: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    idModelo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Modelo,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

export default Produtos;
