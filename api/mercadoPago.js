import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

class MercadoPagoService {
  async criarPreferencia(dados) {
    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            title: dados.descricao,
            unit_price: Number(dados.valor),
            quantity: dados.quantidade || 1,
            currency_id: "BRL",
          },
        ],
        back_urls: {
          success: "http://localhost:8800/sucesso",
          failure: "http://localhost:8800/erro",
          pending: "http://localhost:8800/pendente",
        },
      },
    });

    return response;
  }
}

export default new MercadoPagoService();
