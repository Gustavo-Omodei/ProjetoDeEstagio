import { DataTypes, INTEGER } from "sequelize";
import sequelize from "../database.js";
import Produtos from "./Produtos.js";
import Cliente from "./Clientes.js";

const Pedido = sequelize.define(
  "Pedido",
  {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fk_produto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Produtos,
        key: "id",
      },
    },
    fk_cliente: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: Cliente,
        key: "id",
      },
    },
    valor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

Pedido.belongsTo(Produtos, {
  foreignKey: "k_produto",
  as: "Produtos",
});

Pedido.belongsTo(Cliente, {
  foreignKey: "k_cliente",
  as: "Cliente",
});

export default Pedido;
