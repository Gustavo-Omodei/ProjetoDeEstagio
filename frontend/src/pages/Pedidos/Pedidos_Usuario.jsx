import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/api";
import {
  Button,
  PageContainer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "../../styles/styles";
import GlobalStyle from "../../styles/global";
import { useNavigate } from "react-router-dom";

export default function Pedidos_Usuario() {
  const { user, token } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const listarPedidos = async (userId) => {
      try {
        const response = await api.get(`/pedido/listar/meus-pedidos/${userId}`);
        setPedidos(response.data);
      } catch (error) {
        console.error("Erro ao listar pedidos do usuário:", error);
      }
    };
    listarPedidos(user.id);
  }, [user.id]);
  return (
    <PageContainer>
      <div>
        <h2>Meus Pedidos</h2>
        <div
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #ddd",
            marginTop: "20px",
          }}
        >
          <Table>
            <Thead>
              <Tr>
                <Th>Número do pedido</Th>
                <Th>Data</Th>
                <Th>Status</Th>
                <Th>Valor</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pedidos.map((pedido) => (
                <Tr key={pedido.id}>
                  <Td>{pedido.id}</Td>
                  <Td>{new Date(pedido.data).toLocaleDateString("pt-BR")}</Td>
                  <Td>{pedido.status}</Td>
                  <Td>
                    {pedido.valor_total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Td>
                  <Td>
                    <Button onClick={() => navigate(`/pedido/${pedido.id}`)}>
                      Ver Detalhes
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      </div>
      <GlobalStyle />
    </PageContainer>
  );
}
