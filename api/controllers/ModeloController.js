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
    try {
      const { nome, descricao, idCategoria, valor, tamanho } = req.body;

      const modelo = await Modelo.create({
        nome,
        descricao,
        idCategoria,
        valor,
        tamanho,
        imagem: req.file ? `/uploads/${req.file.filename}` : null,
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

      if (req.file) {
        dadosAtualizados.imagem = `/uploads/${req.file.filename}`;
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
