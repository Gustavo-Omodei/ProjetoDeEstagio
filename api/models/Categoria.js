import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Categoria = sequelize.define(
  "Categorias",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Categoria;
