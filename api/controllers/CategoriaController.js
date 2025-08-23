import Categoria from "../models/Categoria.js";

export default {
  async listarCategorias(req, res) {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  },

  async listarPorID(req, res) {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }

    res.json(categoria);
  },

  async cadastrarCategoria(req, res) {
    const categoria = await Categoria.create(req.body);
    res.status(201).json(categoria);
  },

  async atualizarCategoria(req, res) {
    await Categoria.update(req.body, { where: { id: req.params.id } });
    res.sendStatus(204);
  },

  async deletar(req, res) {
    await Categoria.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  },
};
