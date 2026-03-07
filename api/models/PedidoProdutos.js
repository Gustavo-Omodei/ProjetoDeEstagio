import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Pedido from "./Pedido.js";
import Produtos from "./Produtos.js";

const PedidoProduto = sequelize.define(
  "PedidoProduto",
  {
    fk_pedido: {
      type: DataTypes.INTEGER,
      references: {
        model: Pedido,
        key: "id",
      },
    },
    fk_produto: {
      type: DataTypes.INTEGER,
      references: {
        model: Produtos,
        key: "id",
      },
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    preco_unitario: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { timestamps: false },
);

PedidoProduto.belongsTo(Produtos, {
  foreignKey: "fk_produto",
});

PedidoProduto.belongsTo(Pedido, {
  foreignKey: "fk_pedido",
});

export default PedidoProduto;
