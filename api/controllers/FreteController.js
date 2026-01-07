import XLSX from "xlsx";
import Frete from "../models/Frete.js";
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
        cepInicial: row["CEP Inicial"],
        cepFinal: row["CEP Final"],
        pesoMin: row["Peso mínimo"],
        pesoMax: row["Peso máximo"],
        dimensao: row["Dimensão"],
        valorFrete: row["Preço Frete"],
        prazo: row["Prazo entrega"],
      }));

      // validação básica
      dados.forEach((d, i) => {
        if (
          d.cepInicial == null ||
          d.cepFinal == null ||
          d.pesoMin == null ||
          d.pesoMax == null ||
          !d.dimensao
        ) {
          throw new Error(`Linha ${i + 2} inválida`);
        }
      });

      await Frete.destroy({ where: {}, transaction });
      await Frete.bulkCreate(dados, { transaction });

      await transaction.commit();
      return res.json({ mensagem: "Frete importado com sucesso" });
    } catch (err) {
      await transaction.rollback();
      console.error("ERRO IMPORTAÇÃO FRETE:", err);
      return res.status(500).json({ erro: err.message });
    }
  },

  async calcularFrete(req, res) {
    const { cep, peso, dimensao } = req.body;

    if (!cep || !peso || !dimensao) {
      return res.status(400).json({ erro: "Dados inválidos" });
    }

    try {
      const frete = await Frete.findOne({
        where: {
          cepInicial: { [Op.lte]: cep },
          cepFinal: { [Op.gte]: cep },
          pesoMin: { [Op.lte]: peso },
          pesoMax: { [Op.gte]: peso },
          dimensao,
        },
      });

      if (!frete) {
        return res.status(404).json({ erro: "Frete indisponível" });
      }

      return res.json({
        valor: frete.valorFrete,
        prazo: frete.prazo,
      });
    } catch (err) {
      console.error("ERRO CÁLCULO FRETE:", err);
      return res.status(500).json({ erro: "Erro ao calcular o frete" });
    }
  },
};
