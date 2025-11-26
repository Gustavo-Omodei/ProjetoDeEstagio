// controllers/ProdutoController.js
import Produtos from "../models/Produtos.js";
import Modelo from "../models/Modelo.js";
import Cor from "../models/Cor.js";
import Tecido from "../models/Tecido.js";
import Categoria from "../models/Categoria.js";

export default {
  async criar(req, res) {
    try {
      const { idModelo, idCor, idTecido, preco } = req.body;

      if (!idModelo || !idCor || !idTecido) {
        return res
          .status(400)
          .json({ erro: "Modelo, cor e tecido são obrigatórios." });
      }

      const modelo = await Modelo.findByPk(idModelo, {
        include: Categoria,
      });
      if (!modelo)
        return res.status(404).json({ erro: "Modelo não encontrado" });

      const cor = await Cor.findByPk(idCor);
      if (!cor) return res.status(404).json({ erro: "Cor não encontrada" });

      const tecido = await Tecido.findByPk(idTecido);
      if (!tecido)
        return res.status(404).json({ erro: "Tecido não encontrado" });

      // SKU: PROD-MODELOID-CORID-TECIDOID
      const sku = `PROD-${idModelo}-${idCor}-${idTecido}`;

      // Nome de exibição: Categoria + Modelo + Tecido + Cor
      const nomeExibicao = `${modelo.Categoria.nome} ${modelo.nome} ${tecido.nome} ${cor.nome}`;

      // Criar produto
      const produto = await Produtos.create({
        idModelo,
        idCor,
        idTecido,
        sku,
        nomeExibicao,
        preco,
      });

      return res.json(produto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro ao criar produto" });
    }
  },

  async listar(req, res) {
    try {
      const produtos = await Produtos.findAll({
        include: [{ model: Modelo, include: Categoria }, Cor, Tecido],
      });

      res.json(produtos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao listar produtos" });
    }
  },

  async listarPorID(req, res) {
    try {
      const produto = await Produtos.findByPk(req.params.id, {
        include: [{ model: Modelo, include: Categoria }, Cor, Tecido],
      });

      if (!produto)
        return res.status(404).json({ erro: "Produto não encontrado" });

      res.json(produto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar produto" });
    }
  },
};
