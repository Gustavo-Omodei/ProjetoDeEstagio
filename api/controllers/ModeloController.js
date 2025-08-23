import Modelo from "../models/Modelo.js";

export default {
  async listarModelos(req, res) {
    const modelos = await Modelo.findAll();
    res.json(modelos);
  },

  async listarPorID(req, res) {
    const { id } = req.params;
    const modelo = await Modelo.findByPk(id);

    if (!modelo) {
      return res.status(404).json({ erro: "Modelo não encontrado" });
    }

    res.json(modelo);
  },

  async cadastrarModelo(req, res) {
    const modelo = await Modelo.create(req.body);
    res.status(201).json(modelo);
  },

  async atualizarModelo(req, res) {
    await Modelo.update(req.body, { where: { id: req.params.id } });
    res.sendStatus(204);
  },

  async deletar(req, res) {
    await Modelo.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  },
};
