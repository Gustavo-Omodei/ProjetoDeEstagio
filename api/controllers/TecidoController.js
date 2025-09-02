import Tecido from "../models/Tecido.js";

export default {
  async listarTecidos(req, res) {
    const tecidos = await Tecido.findAll();
    res.json(tecidos);
  },

  async listarPorID(req, res) {
    const { id } = req.params;
    const tecido = await Tecido.findByPk(id);

    if (!tecido) {
      return res.status(404).json({ erro: "Tecido não encontrado" });
    }

    res.json(tecido);
  },

  async cadastrarTecido(req, res) {
    const tecido = await Tecido.create(req.body);
    res.status(201).json(tecido);
  },

  async atualizarTecido(req, res) {
    await Tecido.update(req.body, { where: { id: req.params.id } });
    res.sendStatus(204);
  },

  async deletar(req, res) {
    await Tecido.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  },
};
