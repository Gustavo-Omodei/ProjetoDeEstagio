import Modelo from "../models/Modelo.js";
import Categoria from "../models/Categoria.js";

export default {
  async listarModelos(req, res) {
    const modelos = await Modelo.findAll({
      include: [
        {
          model: Categoria,
          as: "Categoria",
        },
      ],
    });
    res.json(modelos);
  },

  async listarPorID(req, res) {
    const { id } = req.params;
    const modelo = await Modelo.findByPk(id, {
      include: [
        {
          model: Categoria,
          as: "Categoria",
        },
      ],
    });

    if (!modelo) {
      return res.status(404).json({ erro: "Modelo não encontrado" });
    }

    res.json(modelo);
  },

  async cadastrarModelo(req, res) {
    try {
      const { nome, descricao, status, peso, idCategoria, valor, tamanho } =
        req.body;

      const modelo = await Modelo.create({
        nome,
        descricao,
        status,
        idCategoria,
        peso,
        valor,
        tamanho,
        imagem1: req.files.imagem1
          ? `/uploads/${req.files.imagem1[0].filename}`
          : null,
        imagem2: req.files.imagem2
          ? `/uploads/${req.files.imagem2[0].filename}`
          : null,
        imagem3: req.files.imagem3
          ? `/uploads/${req.files.imagem3[0].filename}`
          : null,
      });

      res.status(201).json(modelo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao cadastrar modelo" });
    }
  },

  async atualizarModelo(req, res) {
    try {
      const { id } = req.params;

      const dadosAtualizados = {
        ...req.body,
      };

      if (req.files.imagem1) {
        dadosAtualizados.imagem1 = `/uploads/${req.files.imagem1[0].filename}`;
      }
      if (req.files.imagem2) {
        dadosAtualizados.imagem2 = `/uploads/${req.files.imagem2[0].filename}`;
      }
      if (req.files.imagem3) {
        dadosAtualizados.imagem3 = `/uploads/${req.files.imagem3[0].filename}`;
      }

      await Modelo.update(dadosAtualizados, { where: { id } });

      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao atualizar modelo" });
    }
  },

  async deletar(req, res) {
    await Modelo.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  },
};
