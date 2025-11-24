import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const ClienteEndereco = sequelize.define(
  "ClientesEnderecos",
  {
    idCliente: {
      type: DataTypes.INTEGER,
      references: { model: "Clientes", key: "id" },
    },
    idEndereco: {
      type: DataTypes.INTEGER,
      references: { model: "Enderecos", key: "id" },
    },
  },
  { timestamps: false }
);

export default ClienteEndereco;
