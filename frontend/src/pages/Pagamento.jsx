import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function Pagamento() {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const { itens, subtotal, frete } = location.state || {};

  const irParaPagamento = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8800/pagamentos/criar-preferencia",
        {
          descricao: "Pedido Teste",
          valor: subtotal + (frete || 0),
          pedido_id: 1,
        },
      );

      const { init_point } = response.data;

      // 🔥 Redireciona para Mercado Pago
      window.location.href = init_point;
    } catch (error) {
      console.error("Erro ao criar preferência:", error);
    }
  };

  return (
    <div>
      <h1>Dados pessoais:</h1>
      <p>Nome: {user?.nome}</p>
      <p>Email: {user?.email}</p>
      <p>CPF: {user?.cpf}</p>
      <p>Telefone: {user?.telefone}</p>
      <h1>Pagamento</h1>
      <button onClick={irParaPagamento}>Pagar com Mercado Pago</button>
    </div>
  );
}
