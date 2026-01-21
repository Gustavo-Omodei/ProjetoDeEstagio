import XLSX from "xlsx";
import Frete from "../models/Frete.js";
import Carrinho from "../models/Carrinho.js";
import CarrinhoProduto from "../models/CarrinhoProduto.js";
import Modelo from "../models/Modelo.js";
import Produto from "../models/Produtos.js";
import sequelize from "../database.js";
import { Op } from "sequelize";

export default {
  async importarFrete(req, res) {
    if (!req.file) {
      return res.status(400).json({ erro: "Arquivo não enviado" });
    }

    const transaction = await sequelize.transaction();

    try {
      const workbook = XLSX.read(req.file.buffer);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const linhas = XLSX.utils.sheet_to_json(sheet);

      const dados = linhas.map((row) => ({
        cepInicial: Number(row["CEP Inicial"]),
        cepFinal: Number(row["CEP Final"]),
        pesoMin: Number(row["Peso mínimo"]),
        pesoMax: Number(row["Peso máximo"]),
        dimensao: Number(row["Dimensão"]),
        valorFrete: Number(row["Preço Frete"]),
        prazo: Number(row["Prazo entrega"]),
      }));

      // validação básica
      dados.forEach((d, i) => {
        if (
          d.cepInicial == null ||
          d.cepFinal == null ||
          d.pesoMin == null ||
          d.pesoMax == null ||
          d.dimensao == null ||
          d.valorFrete == null ||
          d.prazo == null
        ) {
          throw new Error(`Linha ${i + 2} inválida`);
        }
      });

      await Frete.destroy({ where: {}, transaction });
      await Frete.bulkCreate(dados, { transaction });

      await transaction.commit();
      return res.json({
        mensagem: "Frete importado com sucesso",
        total: dados.length,
      });
    } catch (err) {
      await transaction.rollback();
      console.error("ERRO IMPORTAÇÃO FRETE:", err);
      return res.status(500).json({ erro: err.message });
    }
  },

  async calcularFrete(req, res) {
    const { idCliente, cep } = req.body;

    if (!idCliente || !cep) {
      return res.status(400).json({
        erro: "idCliente e cep são obrigatórios",
      });
    }

    try {
      // 1️⃣ buscar carrinho do cliente
      const carrinho = await Carrinho.findOne({
        where: { idCliente },
      });

      if (!carrinho) {
        return res.status(404).json({
          erro: "Carrinho não encontrado",
        });
      }

      // 2️⃣ buscar itens do carrinho + peso do modelo
      const itens = await CarrinhoProduto.findAll({
        where: { idCarrinho: carrinho.id },
        include: [
          {
            model: Produto,
            include: {
              model: Modelo,
              as: "modelo",
              attributes: ["peso"],
            },
          },
        ],
      });

      if (!itens.length) {
        return res.status(400).json({
          erro: "Carrinho vazio",
        });
      }

      // 3️⃣ somar peso total
      const pesoTotal = itens.reduce((total, item) => {
        const pesoItem = Number(item.Produto?.modelo?.peso || 0);

        return total + pesoItem * item.quantidade;
      }, 0);

      // 4️⃣ dimensão (por enquanto fixa, como na planilha)
      const dimensao = 100000;

      // 5️⃣ buscar faixa de frete
      const frete = await Frete.findOne({
        where: {
          cepInicial: { [Op.lte]: cep },
          cepFinal: { [Op.gte]: cep },
          pesoMin: { [Op.lte]: pesoTotal },
          pesoMax: { [Op.gte]: pesoTotal },
          dimensao,
        },
      });

      if (!frete) {
        return res.status(404).json({
          erro: "Frete indisponível para esse CEP e peso",
          pesoTotal,
        });
      }

      return res.json({
        cep,
        pesoTotal,
        valor: Number(frete.valorFrete),
        prazo: frete.prazo,
      });
    } catch (err) {
      console.error("ERRO CÁLCULO FRETE:", err);
      return res.status(500).json({ erro: "Erro ao calcular o frete" });
    }
  },
};
