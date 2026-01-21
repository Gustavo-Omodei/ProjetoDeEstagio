import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Categoria from "./Categoria.js";

const Modelo = sequelize.define(
  "Modelos",
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
    idCategoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Categoria,
        key: "id",
      },
    },
    peso: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    valor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tamanho: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagem1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagem2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagem3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Modelo.belongsTo(Categoria, {
  foreignKey: "idCategoria",
  as: "Categoria",
});

export default Modelo;
