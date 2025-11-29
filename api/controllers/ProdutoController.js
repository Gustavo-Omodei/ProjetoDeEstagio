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

      const sku = `PROD-${idModelo}-${idCor}-${idTecido}`;

      // 1 — Verifica se já existe
      let produto = await Produtos.findOne({ where: { sku } });

      if (produto) {
        return res.json({
          jaExistia: true,
          produto,
        });
      }

      // 2 — Se não existir, cria
      const nomeExibicao = `Modelo ${idModelo} Cor ${idCor} Tecido ${idTecido}`;

      produto = await Produtos.create({
        idModelo,
        idCor,
        idTecido,
        sku,
        nomeExibicao,
        preco,
      });

      return res.json({
        jaExistia: false,
        produto,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro ao criar produto." });
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
