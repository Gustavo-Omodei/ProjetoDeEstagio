import Carrinho from "../models/Carrinho.js";
import Produto from "../models/Produtos.js";
import CarrinhoProduto from "../models/CarrinhoProduto.js";

export default {
  async criarCarrinho(req, res) {
    try {
      const { idCliente } = req.body;

      const carrinho = await Carrinho.create({
        idCliente,
        status: "aberto",
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      });

      res.status(201).json(carrinho);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao criar carrinho" });
    }
  },

  async adicionarProduto(req, res) {
    try {
      const { idCarrinho, idProduto, quantidade } = req.body;

      const carrinho = await Carrinho.findByPk(idCarrinho);
      if (!carrinho)
        return res.status(404).json({ erro: "Carrinho não encontrado" });

      const produto = await Produto.findByPk(idProduto);
      if (!produto)
        return res.status(404).json({ erro: "Produto não encontrado" });

      const itemExistente = await CarrinhoProduto.findOne({
        where: { idCarrinho, idProduto },
      });

      if (itemExistente) {
        itemExistente.quantidade += quantidade;
        await itemExistente.save();
        return res.json(itemExistente);
      }

      const novoItem = await CarrinhoProduto.create({
        idCarrinho,
        idProduto,
        quantidade,
      });

      res.status(201).json(novoItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao adicionar produto ao carrinho" });
    }
  },

  async listarItens(req, res) {
    try {
      const { idCarrinho } = req.params;

      const itens = await CarrinhoProduto.findAll({
        where: { idCarrinho },
        include: [
          {
            model: Produto,
            attributes: ["id", "nome", "preco", "descricao"],
          },
        ],
      });

      res.json(itens);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao listar itens do carrinho" });
    }
  },

  async atualizarQuantidade(req, res) {
    try {
      const { idCarrinho, idProduto } = req.params;
      const { quantidade } = req.body;

      const item = await CarrinhoProduto.findOne({
        where: { idCarrinho, idProduto },
      });

      if (!item) return res.status(404).json({ erro: "Item não encontrado" });

      item.quantidade = quantidade;
      await item.save();

      res.json(item);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao atualizar quantidade" });
    }
  },

  async removerItem(req, res) {
    try {
      const { idCarrinho, idProduto } = req.params;

      const item = await CarrinhoProduto.findOne({
        where: { idCarrinho, idProduto },
      });

      if (!item) return res.status(404).json({ erro: "Item não encontrado" });

      await item.destroy();
      res.json({ mensagem: "Item removido" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao remover item" });
    }
  },

  async finalizarCarrinho(req, res) {
    try {
      const { idCarrinho } = req.params;

      const carrinho = await Carrinho.findByPk(idCarrinho);
      if (!carrinho)
        return res.status(404).json({ erro: "Carrinho não encontrado" });

      carrinho.status = "finalizado";
      carrinho.atualizadoEm = new Date();
      await carrinho.save();

      res.json({ mensagem: "Carrinho finalizado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao finalizar carrinho" });
    }
  },
};
