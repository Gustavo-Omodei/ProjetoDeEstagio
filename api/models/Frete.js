import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Frete = sequelize.define("Frete", {
  cepInicial: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cepFinal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pesoMin: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pesoMax: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dimensao: {
    type: DataTypes.INTEGER, // ou STRING, mas hoje é número
    allowNull: false,
  },
  valorFrete: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  prazo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Frete;
