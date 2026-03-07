import { DataTypes } from "sequelize";
import sequelize from "../database.js";
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
  },
  { timestamps: false },
);

Pedido.belongsTo(Cliente, {
  foreignKey: "fk_cliente",
  as: "cliente",
});

export default Pedido;
