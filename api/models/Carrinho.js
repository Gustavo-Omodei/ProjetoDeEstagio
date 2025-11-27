// models/Carrinho.js
import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Carrinho = sequelize.define(
  "Carrinho",
  {
    idCliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Clientes", key: "id" },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "ativo",
    },
  },
  {
    timestamps: true,
    createdAt: "criadoEm",
    updatedAt: "atualizadoEm",
  }
);

export default Carrinho;
