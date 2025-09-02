import Cor from "../models/Cor.js";

export default {
  async listarCores(req, res) {
    const cores = await Cor.findAll();
    res.json(cores);
  },

  async listarPorID(req, res) {
    const { id } = req.params;
    const cor = await Cor.findByPk(id);

    if (!cor) {
      return res.status(404).json({ erro: "Cor não encontrada" });
    }

    res.json(cor);
  },

  async cadastrarCor(req, res) {
    const cor = await Cor.create(req.body);
    res.status(201).json(cor);
  },

  async atualizarCor(req, res) {
    await Cor.update(req.body, { where: { id: req.params.id } });
    res.sendStatus(204);
  },

  async deletar(req, res) {
    await Cor.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  },
};
