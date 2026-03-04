import Pedido from "../models/Pedido.js";
export default {
  async criarPedido(req, res) {
    try {
      const { idCliente, idProduto, valor } = req.body;

      const pedido = await Pedido.create({
        status: "Pendente",
        data: new Date().toISOString(),
        fk_produto: idProduto,
        fk_cliente: idCliente,
        valor: valor,
      });
      res.status(201).json(pedido);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao criar pedido" });
    }
  },
};
