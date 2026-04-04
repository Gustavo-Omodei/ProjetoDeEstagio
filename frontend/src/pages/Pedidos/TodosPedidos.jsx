import { useEffect } from "react";
import api from "../../api/api";
import { useState } from "react";
import GlobalStyle from "../../styles/global";
import {
  PageContainer,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
} from "../../styles/styles";

export default function TodosPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    async function listarPedidos() {
      try {
        const response = await api.get("pedido/listar");
        console.log(response.data);
        setPedidos(response.data);
      } catch (erros) {}
    }
    listarPedidos();
  }, []);

  return (
    <PageContainer>
      <div>
        <h2 style={{ textAlign: "center" }}>LISTA DE PEDIDOS</h2>
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
              {pedidos.map((pedido) => {
                return (
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
                      <button>Ver detalhes</button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>{" "}
        </div>
      </div>
      <GlobalStyle />
    </PageContainer>
  );
}
