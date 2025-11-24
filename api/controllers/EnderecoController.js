import e from "express";
import Endereco from "../models/Endereco.js";

export default {
  async listarEnderecos(req, res) {
    const enderecos = await Endereco.findAll();
    res.json(enderecos);
  },

  async listarPorID(req, res) {
    const { id } = req.params;
    const endereco = await Endereco.findByPk(id);

    if (!endereco) {
      return res.status(404).json({ erro: "Endereço não encontrado" });
    }

    res.json(endereco);
  },

  async cadastrarEndereco(req, res) {
    const endereco = await Endereco.create(req.body);
    res.status(201).json(endereco);
  },

  async atualizarEndereco(req, res) {
    await Endereco.update(req.body, { where: { id: req.params.id } });
    res.sendStatus(204);
  },

  async deletar(req, res) {
    await Endereco.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  },
};
