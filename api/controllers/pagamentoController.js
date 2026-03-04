import mercadoPagoService from "../mercadoPago.js";

export default {
  async criarPreferencia(req, res) {
    try {
      const preferencia = await mercadoPagoService.criarPreferencia(req.body);

      return res.status(200).json({
        id: preferencia.id,
        title: preferencia.title,
        init_point: preferencia.init_point,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro ao criar preferência" });
    }
  },
};
