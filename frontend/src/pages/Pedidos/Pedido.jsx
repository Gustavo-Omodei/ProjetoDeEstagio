import axios from "axios";
import { use, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { PageContainer } from "../../styles/styles";
import GlobalStyle from "../../styles/global";

export default function Pedido() {
  const [produtos, setProdutos] = useState([]);
  const [pedido, setPedido] = useState();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function listarProdutos() {
      try {
        const response = await api.get(`/pedido/listar/${id}`);
        setPedido(response.data.pedido);
        setProdutos(response.data.produtos);
        setLoading(false);
      } catch (e) {
        console.error("Erro ao listar produtos do pedido:", e);
      }
    }
    listarProdutos();
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <PageContainer>
      <div>
        <h1>Pedido #{pedido.id} </h1>

        <h2>Produtos</h2>
        <div>
          <table>
            <thead>
              <tr>
                <th>Nome do produto</th>
                <th>Quantidade</th>
                <th>Valor unitário</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((p) => (
                <tr key={p.id}>
                  <td>{p.Produto.nomeExibicao}</td>
                  <td>{p.quantidade}</td>
                  <td>{p.preco_unitario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={() => {
            window.location.href = pedido.linkPagamento;
          }}
        >
          Pagar com MercadoPago
        </button>
      </div>
      <GlobalStyle />
    </PageContainer>
  );
}
