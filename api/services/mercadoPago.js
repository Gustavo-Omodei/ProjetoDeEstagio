import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

class MercadoPagoService {
  async criarPreferencia(produtos) {
    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: produtos.map((p) => ({
          title: p.nome,
          unit_price: Number(p.preco),
          quantity: p.quantidade,
          currency_id: "BRL",
        })),
        back_urls: {
          success: "http://localhost:3000/sucesso",
          failure: "http://localhost:3000/erro",
          pending: "http://localhost:3000/pendente",
        },
      },
    });

    return response;
  }
}

export default new MercadoPagoService();
