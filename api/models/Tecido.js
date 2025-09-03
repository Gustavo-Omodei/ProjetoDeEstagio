import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Tecido = sequelize.define(
  "Tecidos",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Tecido;
