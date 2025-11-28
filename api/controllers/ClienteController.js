import Cliente from "../models/Clientes.js";
import { Op } from "sequelize";
import Endereco from "../models/Endereco.js";
import ClienteEndereco from "../models/ClienteEndereco.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "segredo_super_forte";

export default {
  async listarClientes(req, res) {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  },

  async listarPorID(req, res) {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id, { include: "Enderecos" });

    if (!cliente) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    res.json(cliente);
  },
  async cadastrarCliente(req, res) {
    try {
      const { nome, email, cpf, telefone, senha } = req.body;

      const clienteExistente = await Cliente.findOne({
        where: { [Op.or]: [{ email }, { cpf }] },
      });
      if (clienteExistente) {
        if (clienteExistente.email === email) {
          return res.status(400).json({ erro: "Email já cadastrado." });
        }
        if (clienteExistente.cpf === cpf) {
          return res.status(400).json({ erro: "CPF já cadastrado." });
        }
      }

      const senhaHashed = await bcrypt.hash(senha, 10);

      const cliente = await Cliente.create({
        nome,
        email,
        cpf,
        telefone,
        senha: senhaHashed,
      });

      const token = jwt.sign({ id: cliente.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(201).json({
        user: {
          id: cliente.id,
          nome: cliente.nome,
          email: cliente.email,
          cpf: cliente.cpf,
          telefone: cliente.telefone,
        },
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao cadastrar cliente." });
    }
  },

  async atualizarCliente(req, res) {
    await Cliente.update(req.body, { where: { id: req.params.id } });
    res.sendStatus(204);
  },

  async deletar(req, res) {
    await Cliente.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  },

  async login(req, res) {
    const { email, senha } = req.body;

    const cliente = await Cliente.findOne({ where: { email } });
    if (!cliente) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senha, cliente.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: cliente.id, nome: cliente.nome, email: cliente.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      user: {
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
        cpf: cliente.cpf,
        telefone: cliente.telefone,
      },
      token,
    });
  },

  async me(req, res) {
    const cliente = await Cliente.findByPk(req.user.id);

    if (!cliente) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    res.json(cliente);
  },

  async adicionarEndereco(req, res) {
    const { idCliente, idEndereco } = req.body;

    await ClienteEndereco.create({
      idCliente,
      idEndereco,
    });

    res
      .status(201)
      .json({ message: "Endereço adicionado ao cliente com sucesso" });
  },

  async listarEnderecos(req, res) {
    const { idCliente } = req.params;
    const cliente = await Cliente.findByPk(idCliente, { include: Endereco });
    if (!cliente) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }
    res.json(cliente.Enderecos);
  },

  async removerEndereco(req, res) {
    const { idCliente, idEndereco } = req.params;

    await ClienteEndereco.destroy({
      where: { idCliente, idEndereco },
    });
    res
      .status(204)
      .json({ message: "Endereço removido do cliente com sucesso" });
  },
};
