import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Cor = sequelize.define(
  "Cores",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codigoHex: {
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

export default Cor;
