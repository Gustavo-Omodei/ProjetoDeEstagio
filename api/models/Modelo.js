import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Categoria from "./Categoria.js";
// import Cor from "./Cor.js";
// import Tecido from "./Tecido.js";

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
    idCategoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Categoria,
        key: "id",
      },
    },
    valor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tamanho: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // IdCor: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Cor,
    //     key: "id",
    //   },
    // },
    // IdTecido: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Tecido,
    //     key: "id",
    //   },
    // },
  },
  {
    timestamps: false,
  }
);

export default Modelo;
