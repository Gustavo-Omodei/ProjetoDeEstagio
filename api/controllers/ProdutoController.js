import Produto from "../models/Produtos.js";

export default {
  async listarProdutos(req, res) {
    const produtos = await Produto.findAll();
    res.json(produtos);
  },

  async listarPorID(req, res) {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    res.json(produto);
  },

  async cadastrarProduto(req, res) {
    const produto = await Produto.create(req.body);
    res.status(201).json(produto);
  },

  async atualizarProduto(req, res) {
    await Produto.update(req.body, { where: { id: req.params.id } });
    res.sendStatus(204);
  },

  async deletar(req, res) {
    await Produto.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  },
};
