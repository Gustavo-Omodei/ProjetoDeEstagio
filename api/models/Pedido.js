import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Endereco from "./Endereco.js";
import Cliente from "./Clientes.js";

const Pedido = sequelize.define(
  "Pedido",
  {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fk_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cliente,
        key: "id",
      },
    },
    valor_total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    linkPagamento: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    prazo: {
      type: DataTypes.INTEGER,
    },
    frete: {
      type: DataTypes.FLOAT,
    },
    fk_endereco: {
      type: DataTypes.INTEGER,
      references: {
        model: Endereco,
        key: "id",
      },
    },
  },
  { timestamps: false },
);

Pedido.belongsTo(Cliente, {
  foreignKey: "fk_cliente",
  as: "cliente",
});
Pedido.belongsTo(Endereco, {
  foreignKey: "fk_endereco",
  as: "endereco",
});

export default Pedido;
