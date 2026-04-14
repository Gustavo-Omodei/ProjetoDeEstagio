import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

class MercadoPagoService {
  async criarPreferencia(cliente, produtos, pedido, frete) {
    const preference = new Preference(client);
    const cpfLimpo = cliente.cpf.replace(/\D/g, "");
    const telefoneLimpo = cliente.telefone.replace(/\D/g, "");
    const area_code = telefoneLimpo.slice(0, 2);
    const number = telefoneLimpo.slice(2);

    const response = await preference.create({
      body: {
        items: produtos.map((p) => ({
          id: p.id,
          title: p.nomeExibicao,
          unit_price: Number(p.preco),
          quantity: p.quantidade,
          currency_id: "BRL",
        })),
        payer: {
          name: cliente.nome,
          email: cliente.email,
          phone: {
            area_code: area_code,
            number: number,
          },
          identification: {
            type: "CPF",
            number: cpfLimpo,
          },
        },
        external_reference: String(pedido.id),
        notification_url:
          "https://n8nvps.cimerianofficial.com/webhook-test/4bce7efc-139e-46fb-963f-7b6bee8ad252",
        back_urls: {
          success: "http://localhost:3000/sucesso",
          failure: "http://localhost:3000/erro",
          pending: "http://localhost:3000/pendente",
        },
        shipments: { cost: frete },
      },
    });

    return response;
  }
}

export default new MercadoPagoService();
