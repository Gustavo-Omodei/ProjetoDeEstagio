import { where } from "sequelize";
import Pedido from "../models/Pedido.js";
import PedidoProduto from "../models/PedidoProdutos.js";
import Produto from "../models/Produtos.js";
import Modelo from "../models/Modelo.js";
import mercadoPago from "../services/mercadoPago.js";
import Cor from "../models/Cor.js";
import Categoria from "../models/Categoria.js";
import Tecido from "../models/Tecido.js";
import Endereco from "../models/Endereco.js";
import Cliente from "../models/Clientes.js";

export default {
  async criarPedido(req, res) {
    try {
      const { cliente, produtos, frete, prazo, endereco } = req.body;
      let valorTotal = 0;
      const pedido = await Pedido.create({
        status: "Aguardando pagamento",
        data: new Date(),
        fk_cliente: cliente.id,
        valor_total: 0,
        linkPagamento: "",
        prazo: prazo,
        frete: frete,
        fk_endereco: endereco.id,
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
      valorTotal += frete;
      valorTotal = Number(valorTotal.toFixed(2));

      const preferencia = await mercadoPago.criarPreferencia(
        cliente,
        produtos,
        pedido,
        frete,
      );
      await pedido.update(
        {
          valor_total: valorTotal,
          linkPagamento: preferencia.init_point,
        },
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
      const pedido = await Pedido.findByPk(req.params.id, {
        include: [
          { model: Endereco, as: "endereco" },
          { model: Cliente, as: "cliente" },
        ],
      });

      if (!pedido) {
        return res.status(404).json({ erro: "Pedido não encontrado" });
      }

      const produtos = await PedidoProduto.findAll({
        where: { fk_pedido: req.params.id },
        include: [
          {
            model: Produto,
            include: [
              {
                model: Modelo,
                as: "modelo",
                include: [
                  {
                    model: Categoria,
                    as: "Categoria",
                  },
                ],
              },
              {
                model: Cor,
                as: "cor",
              },
              {
                model: Tecido,
                as: "tecido",
              },
            ],
          },
        ],
      });

      if (produtos.length === 0) {
        return res.status(404).json({ erro: "Produtos não encontrados" });
      }

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
  async atualizarStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      console.log(id);

      const statusPermitidos = [
        "Aguardando pagamento",
        "Pago",
        "Em andamento",
        "Enviado",
        "Cancelado",
      ];

      if (!statusPermitidos.includes(status)) {
        return res.status(400).json({ erro: "Status inválido" });
      }

      const pedido = await Pedido.findByPk(id);
      console.log(pedido);

      if (!pedido) {
        return res.status(404).json({ erro: "Pedido não encontrado" });
      }

      await pedido.update({ status });

      return res.status(200).json({
        mensagem: "Status atualizado com sucesso",
        pedido,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ erro: "Erro ao atualizar status do pedido" });
    }
  },
};
