import { where } from "sequelize";
import Pedido from "../models/Pedido.js";
import PedidoProduto from "../models/PedidoProdutos.js";
import Produto from "../models/Produtos.js";
import mercadoPago from "../services/mercadoPago.js";

export default {
  async criarPedido(req, res) {
    try {
      const { clienteId, produtos } = req.body;

      let valorTotal = 0;
      const pedido = await Pedido.create({
        status: "Pendente",
        data: new Date(),
        fk_cliente: clienteId,
        valor_total: 0,
        linkPagamento: "",
      });

      for (const produto of produtos) {
        const subtotal = produto.quantidade * produto.preco;

        valorTotal += subtotal;
        await PedidoProduto.create({
          fk_pedido: pedido.id,
          fk_produto: produto.idProduto,
          quantidade: produto.quantidade,
          preco_unitario: produto.preco,
        });
      }

      const preferencia = await mercadoPago.criarPreferencia(produtos);
      await pedido.update(
        { valor_total: valorTotal, linkPagamento: preferencia.init_point },
        {
          where: { id: pedido.id },
        },
      );

      res.status(201).json({
        pedidoId: pedido.id,
        mensagem: "Pedido criado",
        linkPagamento: preferencia.init_point,
        produtos,
        valorTotal,
        preferencia,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao criar pedido" });
    }
  },
  async listarPorID(req, res) {
    try {
      const pedido = await Pedido.findByPk(req.params.id);
      const produtos = await PedidoProduto.findAll({
        where: { fk_pedido: req.params.id },
        include: [
          {
            model: Produto,
            attributes: ["nomeExibicao"],
          },
        ],
      });

      if (!pedido)
        return res.status(404).json({ erro: "Pedido não encontrado" });
      if (produtos.length === 0)
        return res.status(404).json({ erro: "Produtos não encontrados" });

      res.json({ pedido, produtos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar pedido" });
    }
  },

  async listarPorUsuario(req, res) {
    const userId = req.params.userId;
    try {
      const pedidos = await Pedido.findAll({ where: { fk_cliente: userId } });

      if (!pedidos || pedidos.length === 0) {
        return res
          .status(404)
          .json({ erro: "Nenhum pedido encontrado para este usuário" });
      }
      res.json(pedidos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar pedidos do usuário" });
    }
  },

  async listarPedidos(req, res) {
    try {
      const pedidos = await Pedido.findAll();

      if (!pedidos || pedidos.length === 0) {
        return res.status(404).json({ erro: "Nenhum pedido encontrado" });
      }
      res.json(pedidos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao listar pedidos" });
    }
  },
};
