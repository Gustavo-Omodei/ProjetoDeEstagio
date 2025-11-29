import Carrinho from "../models/Carrinho.js";
import CarrinhoProduto from "../models/CarrinhoProduto.js";
import Produto from "../models/Produtos.js";
import Modelo from "../models/Modelo.js";
import Cor from "../models/Cor.js";
import Tecido from "../models/Tecido.js";

const CarrinhoController = {
  // Adicionar item ao carrinho
  async adicionarProduto(req, res) {
    try {
      const idCliente = req.user.id;
      const { idProduto, quantidade } = req.body;

      if (!idProduto) {
        return res.status(400).json({ erro: "idProduto é obrigatório" });
      }

      // Carrinho do cliente
      let carrinho = await Carrinho.findOne({
        where: { idCliente, status: "ativo" },
      });

      // Se não existir, cria
      if (!carrinho) {
        carrinho = await Carrinho.create({ idCliente });
      }

      // Verifica se já existe o mesmo produto
      let item = await CarrinhoProduto.findOne({
        where: { idCarrinho: carrinho.id, idProduto },
      });

      if (item) {
        item.quantidade += quantidade ?? 1;
        await item.save();
        return res.json(item);
      }

      const novoItem = await CarrinhoProduto.create({
        idCarrinho: carrinho.id,
        idProduto,
        quantidade: quantidade ?? 1,
      });

      return res.status(201).json(novoItem);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ erro: "Erro ao adicionar produto ao carrinho" });
    }
  },

  // Listar itens do carrinho
  async listarItens(req, res) {
    try {
      const carrinho = await Carrinho.findOne({
        where: { idCliente: req.user.id },
      });

      if (!carrinho) {
        return res.json({ itens: [] });
      }

      const itens = await CarrinhoProduto.findAll({
        where: { idCarrinho: carrinho.id },
        include: [
          {
            model: Produto,
            include: [
              { model: Modelo, as: "modelo" },
              { model: Cor, as: "cor" },
              { model: Tecido, as: "tecido" },
            ],
          },
        ],
      });

      // Depois de atualizar a quantidade
      const itensAtualizados = await CarrinhoProduto.findAll({
        where: { idCarrinho: carrinho.id },
        include: [
          {
            model: Produto,
            include: [
              { model: Modelo, as: "modelo" },
              { model: Cor, as: "cor" },
              { model: Tecido, as: "tecido" },
            ],
          },
        ],
      });

      const resposta = itensAtualizados.map((item) => ({
        id: item.id,
        idProduto: item.idProduto,
        quantidade: item.quantidade,
        preco: item.Produto?.preco ? Number(item.Produto.preco) : 0,
        imagem1: item.Produto?.modelo?.imagem1
          ? `http://localhost:8800${item.Produto.modelo.imagem1}`
          : "/placeholder.png",
        nomeExibicao:
          [
            item.Produto?.modelo?.nome,
            item.Produto?.cor?.nome,
            item.Produto?.tecido?.nome,
          ]
            .filter(Boolean) // remove valores null ou ""
            .join(" ") || "Produto",
      }));

      return res.json({ itens: resposta });

      return res.json({ itens: resposta });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Erro ao buscar carrinho" });
    }
  },

  // Atualizar quantidade
  async atualizarQuantidade(req, res) {
    try {
      const idCliente = req.user.id;
      const { idProduto } = req.params;
      const { quantidade } = req.body;

      const carrinho = await Carrinho.findOne({
        where: { idCliente, status: "ativo" },
      });

      if (!carrinho) {
        return res.status(404).json({ erro: "Carrinho não encontrado" });
      }

      const item = await CarrinhoProduto.findOne({
        where: { idCarrinho: carrinho.id, idProduto },
      });

      if (!item) {
        return res
          .status(404)
          .json({ erro: "Item não encontrado no carrinho" });
      }

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

      const carrinho = await Carrinho.findOne({
        where: { idCliente, status: "ativo" },
      });

      if (!carrinho) {
        return res.status(404).json({ erro: "Carrinho não encontrado" });
      }

      const item = await CarrinhoProduto.findOne({
        where: { idCarrinho: carrinho.id, idProduto },
      });

      if (!item) {
        return res
          .status(404)
          .json({ erro: "Item não encontrado no carrinho" });
      }

      await item.destroy();

      return res.json({ mensagem: "Item removido do carrinho" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro ao remover item" });
    }
  },

  // Finalizar carrinho
  async finalizarCarrinho(req, res) {
    try {
      const idCliente = req.user.id;

      const carrinho = await Carrinho.findOne({
        where: { idCliente, status: "ativo" },
      });

      if (!carrinho) {
        return res.status(404).json({ erro: "Carrinho não encontrado" });
      }

      carrinho.status = "finalizado";
      await carrinho.save();

      return res.json({ mensagem: "Carrinho finalizado com sucesso" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro ao finalizar carrinho" });
    }
  },
};

export default CarrinhoController;
