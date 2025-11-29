import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  PageContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  CartControls,
  CartButton,
} from "../styles/styles";
import GlobalStyle from "../styles/global";

export default function Carrinho() {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    async function carregar() {
      try {
        const resp = await axios.get("http://localhost:8800/carrinho/itens", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItens(resp.data?.itens || []);
      } catch (e) {
        console.error(e);
        setErro("Não foi possível carregar o carrinho.");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, [token]);

  const total = itens.reduce(
    (acc, item) => acc + Number(item.preco || 0) * (item.quantidade || 0),
    0
  );

  async function atualizarQuantidade(idProduto, novaQtde) {
    if (novaQtde < 1) return;
    setItens((prev) =>
      prev.map((item) =>
        item.idProduto === idProduto ? { ...item, quantidade: novaQtde } : item
      )
    );
    try {
      await axios.put(
        `http://localhost:8800/carrinho/produtos/${idProduto}`,
        { quantidade: novaQtde },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (e) {
      console.error("Erro ao atualizar quantidade", e);
    }
  }

  async function removerItem(idProduto) {
    try {
      await axios.delete(
        `http://localhost:8800/carrinho/produtos/${idProduto}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItens((prev) => prev.filter((item) => item.idProduto !== idProduto));
    } catch (e) {
      console.error("Erro ao remover item", e);
    }
  }

  if (carregando) return <div>Carregando carrinho...</div>;
  if (erro) return <div>{erro}</div>;

  return (
    <PageContainer>
      <h2>🛒 Carrinho</h2>

      {itens.length === 0 ? (
        <div>Carrinho vazio.</div>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Produto</Th>
              <Th>Quantidade</Th>
              <Th>Valor</Th>
              <Th>Subtotal</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {itens.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <img
                    src={item.imagem1 || "/placeholder.png"}
                    alt={item.nomeExibicao || "Produto"}
                    style={{ width: 100, borderRadius: 8 }}
                  />
                  <div>{item.nomeExibicao || "Produto"}</div>
                </Td>
                <Td>
                  <CartControls>
                    <button
                      onClick={() =>
                        atualizarQuantidade(item.idProduto, item.quantidade - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantidade}</span>
                    <button
                      onClick={() =>
                        atualizarQuantidade(item.idProduto, item.quantidade + 1)
                      }
                    >
                      +
                    </button>
                  </CartControls>
                </Td>
                <Td>R$ {Number(item.preco || 0).toFixed(2)}</Td>
                <Td>
                  R$ {(Number(item.preco || 0) * item.quantidade).toFixed(2)}
                </Td>
                <Td>
                  <CartButton
                    remove
                    onClick={() => removerItem(item.idProduto)}
                  >
                    Remover
                  </CartButton>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <GlobalStyle />
        </Table>
      )}

      {itens.length > 0 && (
        <h3 style={{ textAlign: "right", marginTop: 20 }}>
          Total: R$ {total.toFixed(2)}
        </h3>
      )}
    </PageContainer>
  );
}
