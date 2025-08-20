import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Categoria from "./Categoria.js";

const Modelo = sequelize.define("Modelos", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  IdCategoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Categoria,
      key: "id",
    },
  },
});

export default Modelo;
