import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Cliente = sequelize.define(
  "Clientes",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("cliente", "admin"),
      allowNull: false,
      defaultValue: "cliente",
    },
  },
  {
    timestamps: false,
  },
);

export default Cliente;
