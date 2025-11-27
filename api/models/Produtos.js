// models/Produto.js
import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Modelo from "./Modelo.js";
import Cor from "./Cor.js";
import Tecido from "./Tecido.js";

const Produto = sequelize.define(
  "Produto",
  {
    idModelo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Modelos", key: "id" },
    },
    idCor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Cores", key: "id" },
    },
    idTecido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Tecidos", key: "id" },
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nomeExibicao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Relacionamentos

export default Produto;
