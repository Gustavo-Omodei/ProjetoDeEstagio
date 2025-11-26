import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Carrinho = sequelize.define(
  "Carrinho",
  {
    idCliente: {
      type: DataTypes.INTEGER,
      references: { model: "Clientes", key: "id" },
    },
    criadoEm: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    atualizadoEm: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    criadoEm: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Carrinho;
