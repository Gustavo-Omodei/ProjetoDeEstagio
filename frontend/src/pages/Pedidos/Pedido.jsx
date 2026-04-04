import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export default function Pedido() {
  const [produtos, setProdutos] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { linkPagamento } = location.state;

  async function listarProdutos() {
    try {
      const produtos = await axios.get(
        `http://localhost:8800/pedido/listar/${id}`,
      );
      setProdutos(produtos.data.produtos);
    } catch (e) {}
  }
  useEffect(() => {
    listarProdutos();
  }, []);

  return (
    <div>
      <h1>Pedido #{id}</h1>

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
          window.location.href = linkPagamento;
        }}
      >
        Pagar com MercadoPago
      </button>
    </div>
  );
}
