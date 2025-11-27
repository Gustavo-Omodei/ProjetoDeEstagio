import Carrinho from "../models/Carrinho.js";
import CarrinhoProduto from "../models/CarrinhoProduto.js";
import Produtos from "../models/Produtos.js";

const CarrinhoController = {
  // Adicionar produto
  async adicionarProduto(req, res) {
    try {
      const idCliente = req.user.id;
      const { idModelo, idCor, idTecido, quantidade } = req.body;

      // Cria carrinho se não existir
      let carrinho = await Carrinho.findOne({ where: { idCliente } });
      if (!carrinho) {
        carrinho = await Carrinho.create({
          idCliente,
          criadoEm: new Date(),
          atualizadoEm: new Date(),
          status: "ativo",
        });
      }

      // Checa se a mesma combinação já está no carrinho
      let item = await CarrinhoProduto.findOne({
        where: { idCarrinho: carrinho.id, idModelo, idCor, idTecido },
      });

      if (item) {
        item.quantidade += quantidade;
        await item.save();
        return res.json(item);
      }

      const novoItem = await CarrinhoProduto.create({
        idCarrinho: carrinho.id,
        idModelo,
        idCor,
        idTecido,
        quantidade,
      });

      return res.status(201).json(novoItem);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro ao adicionar produto" });
    }
  },

  // Listar itens do carrinho
  async listarItens(req, res) {
    try {
      const idCliente = req.user.id;
      const carrinho = await Carrinho.findOne({ where: { idCliente } });
      if (!carrinho) return res.json([]); // carrinho vazio

      const itens = await CarrinhoProduto.findAll({
        where: { idCarrinho: carrinho.id },
        include: [Produtos],
      });

      return res.json(itens);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro ao listar itens" });
    }
  },

  // Atualizar quantidade
  async atualizarQuantidade(req, res) {
    try {
      const idCliente = req.user.id;
      const { idProduto } = req.params;
      const { quantidade } = req.body;

      const carrinho = await Carrinho.findOne({ where: { idCliente } });
      if (!carrinho)
        return res.status(404).json({ erro: "Carrinho não encontrado" });

      const item = await CarrinhoProduto.findOne({
        where: { idCarrinho: carrinho.id, idProduto },
      });
      if (!item)
        return res
          .status(404)
          .json({ erro: "Produto não encontrado no carrinho" });

      item.quantidade = quantidade;
      await item.save();

      return res.json(item);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro ao atualizar quantidade" });
    }
  },

  // Remover item
  async removerItem(req, res) {
    try {
      const idCliente = req.user.id;
      const { idProduto } = req.params;

      const carrinho = await Carrinho.findOne({ where: { idCliente } });
      if (!carrinho)
        return res.status(404).json({ erro: "Carrinho não encontrado" });

      const item = await CarrinhoProduto.findOne({
        where: { idCarrinho: carrinho.id, idProduto },
      });
      if (!item)
        return res
          .status(404)
          .json({ erro: "Produto não encontrado no carrinho" });

      await item.destroy();
      return res.json({ mensagem: "Produto removido" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro ao remover produto" });
    }
  },

  // Finalizar carrinho
  async finalizarCarrinho(req, res) {
    try {
      const idCliente = req.user.id;
      const carrinho = await Carrinho.findOne({ where: { idCliente } });
      if (!carrinho)
        return res.status(404).json({ erro: "Carrinho não encontrado" });

      carrinho.status = "finalizado";
      await carrinho.save();

      return res.json({ mensagem: "Carrinho finalizado" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro ao finalizar carrinho" });
    }
  },
};

export default CarrinhoController;
