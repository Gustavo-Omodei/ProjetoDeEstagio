import mercadoPagoService from "../services/mercadoPago.js";

export default {
  async criarPreferencia(req, res) {
    try {
      const dados = req.body;

      const preferencia = await mercadoPagoService.criarPreferencia(dados);

      return res.status(200).json({
        id: preferencia.id,
        init_point: preferencia.init_point,
      });

    } catch (error) {
      console.error("Erro ao criar preferência:", error.response?.data || error);

      return res.status(500).json({
        erro: error.response?.data || "Erro ao criar preferência"
      });
    }
  }
};