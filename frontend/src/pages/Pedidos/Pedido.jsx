import axios from "axios";
import { use, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { FaArrowLeft } from "react-icons/fa6";
import {
  PageContainer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "../../styles/styles";
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
        console.log(response.data);
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
        <FaArrowLeft style={{ color: "#ab8d69" }} />
        <a
          style={{
            color: "#ab8d69",
            textDecoration: "none",
            alignContent: "start",
            fontWeight: "bold",
          }}
          href="/meusPedidos"
        >
          Voltar para pedidos
        </a>
      </div>
      <div>
        <h1>Pedido #{pedido.id} </h1>
        <p>
          Realizado em {new Date(pedido.data).toLocaleDateString()}{" "}
          <span>{pedido.status}</span>
        </p>
      </div>
      <div
        style={{
          padding: "8px",
          boxShadow: "2px 2px 16px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
        }}
      >
        <h2>Produtos</h2>
        <div>
          <Table>
            <Thead>
              <Tr>
                <Th
                  style={{
                    textAlign: "start",
                  }}
                >
                  Nome do produto
                </Th>
                <Th>Quantidade</Th>
                <Th>Valor unitário</Th>
                <Th>Subtotal</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {produtos.map((p) => (
                <Tr key={p.id}>
                  <Td style={{ textAlign: "start" }}>
                    <img
                      src={`http://localhost:8800${p.Produto.modelo.imagem1}`}
                      alt="modelo"
                      style={{
                        width: "60px",
                        display: "inline-block",
                        marginRight: "16px",
                      }}
                    />
                    {p.Produto.modelo.nome} {p.Produto.cor.nome}
                  </Td>
                  <Td>{p.quantidade}</Td>
                  <Td>
                    {p.preco_unitario.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Td>
                  <Td>
                    {(p.preco_unitario * p.quantidade).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      </div>
      {/* <button
        onClick={() => {
          window.location.href = pedido.linkPagamento;
        }}
      >
        Pagar com MercadoPago
      </button> */}
      <GlobalStyle />
    </PageContainer>
  );
}
