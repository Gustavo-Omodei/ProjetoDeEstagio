import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function Pagamento() {
const location = useLocation();
const navigate = useNavigate();

const dados = location.state

if (!dados) {
    navigate("/carrinho");
    return null;
  }

  const { itens, subtotal, frete, total } = dados;

  const irParaPagamento = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8800/pagamentos/criar-preferencia",
        {
          descricao: "Pedido Teste",
          valor: total  ,
          pedido_id: 1
        }
      );

      const { init_point } = response.data;

      window.location.href = init_point;

    } catch (error) {
      console.error("Erro ao criar preferência:", error);
    }
  };

  return (
    <div>
      <h1>Carrinho</h1>
      <button onClick={irParaPagamento}>
        Pagar com Mercado Pago
      </button>
    </div>
  );
}