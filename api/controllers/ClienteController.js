import Cliente from "../models/Clientes.js";

export default {
  async listarClientes(req, res) {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  },

  async listarPorID(req, res) {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    res.json(cliente);
  },

  async cadastrarCliente(req, res) {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  },

  async atualizarCliente(req, res) {
    await Cliente.update(req.body, { where: { id: req.params.id } });
    res.sendStatus(204);
  },

  async deletar(req, res) {
    await Cliente.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  },
};
