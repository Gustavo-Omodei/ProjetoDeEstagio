// Carrinho.jsx (versão com layout bonito estilo referência)

import { useEffect, useState, useContext, use } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Trash2 } from "lucide-react";
import {
  PageContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  ResumeBox,
  ResumeRow,
  ResumeTotal,
  FreteBox,
  Layout,
  Button,
  Th,
  Td,
  QtdWrapper,
  CartControls,
  CartButton,
  Container,
} from "../styles/styles";
import GlobalStyle from "../styles/global";
import styled from "styled-components";
import api from "../api/api";

export default function Carrinho() {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState(null);
  const [prazo, setPrazo] = useState(null);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregar() {
      try {
        const resp = await api.get("/carrinho/itens");
        console.log("itens do carrinho:", resp.data?.itens);
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

  const subtotal = itens.reduce(
    (acc, item) => acc + Number(item.preco || 0) * (item.quantidade || 0),
    0,
  );

  // async function criarPedido(cliente, produtos, frete, prazo) {
  //   try {
  //     const resp = await api.post(`/pedido/criar`, {
  //       cliente: cliente,
  //       produtos: produtos,
  //       frete: frete,
  //       prazo: prazo,
  //     })
  //     removerItem(produtos.map((p) => p.idProduto))
  //     navigate(`/pedido/${resp.data.pedidoId}`, {
  //       state: { linkPagamento: resp.data.linkPagamento },
  //     })
  //     setItens([])
  //   } catch (e) {
  //     toast.error(e)
  //   }
  // }
  function irParaCheckout() {
    navigate("/checkout", {
      state: {
        cliente: user,
        produtos: itens,
        subtotal,
        total: subtotal + (frete || 0),
      },
    });
  }

  async function calcularFrete() {
    try {
      const resp = await api.post(`/frete/calcular`, {
        cep: Number(cep?.replace(/\D/g, "")),
      });

      setFrete(Number(resp.data.valor));
      setPrazo(Number(resp.data.prazo));
    } catch (e) {
      toast.error("Digite um CEP válido.");
      console.error("Erro ao calcular frete", e);
    }
  }

  async function atualizarQuantidade(idProduto, novaQtde) {
    if (novaQtde < 1) return;
    setItens((prev) =>
      prev.map((item) =>
        item.idProduto === idProduto ? { ...item, quantidade: novaQtde } : item,
      ),
    );
    try {
      await api.put(
        `/carrinho/produtos/${idProduto}`,
        { quantidade: novaQtde },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (frete) {
        calcularFrete();
      }
    } catch (e) {
      console.error("Erro ao atualizar quantidade", e);
    }
  }

  async function removerItem(idProduto) {
    try {
      await api.delete(`/carrinho/produtos/${idProduto}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItens((prev) => prev.filter((item) => item.idProduto !== idProduto));
    } catch (e) {
      console.error("Erro ao remover item", e);
    }
  }

  if (carregando) return <div>Carregando carrinho...</div>;
  if (erro) return <div>{erro}</div>;

  return (
    <div>
      <PageContainer>
        <h2>🛒 Meu carrinho</h2>

        <Layout>
          {/* ===== LADO ESQUERDO - PRODUTOS ===== */}
          <div style={{ borderRadius: "12px", overflow: "hidden" }}>
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
                        <QtdWrapper>
                          <CartControls>
                            <button
                              onClick={() =>
                                atualizarQuantidade(
                                  item.idProduto,
                                  item.quantidade - 1,
                                )
                              }
                            >
                              -
                            </button>
                            <span>{item.quantidade}</span>
                            <button
                              onClick={() =>
                                atualizarQuantidade(
                                  item.idProduto,
                                  item.quantidade + 1,
                                )
                              }
                            >
                              +
                            </button>
                          </CartControls>
                        </QtdWrapper>
                      </Td>
                      <Td>
                        {item.preco.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </Td>
                      <Td>
                        {item.preco.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </Td>
                      <Td>
                        <CartButton
                          remove
                          onClick={() => removerItem(item.idProduto)}
                        >
                          <Trash2 size={16} />
                        </CartButton>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </div>
          {itens.length > 0 ? (
            <>
              <ResumeBox>
                <h3>Resumo da compra</h3>

                <ResumeRow>
                  <span>Subtotal</span>
                  <span>
                    {subtotal.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </ResumeRow>

                <FreteBox>
                  <input
                    type="text"
                    placeholder="CEP"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                  />
                  <Button style={{ width: "40%" }} onClick={calcularFrete}>
                    Calcular
                  </Button>
                </FreteBox>

                {frete !== null && (
                  <ResumeRow>
                    <span>Frete</span>
                    <span>
                      {frete.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </ResumeRow>
                )}
                {frete !== null && (
                  <ResumeRow>
                    <span>Prazo</span>
                    <span>{prazo || ""} dias</span>
                  </ResumeRow>
                )}

                <ResumeTotal>
                  <span>Total</span>
                  <span>
                    {(subtotal + (frete || 0)).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </ResumeTotal>

                <Button
                  onClick={() => {
                    irParaCheckout();
                  }}
                  style={{
                    width: "100%",
                    marginTop: 10,
                  }}
                >
                  Ir para o pagamento
                </Button>
              </ResumeBox>
            </>
          ) : (
            <div />
          )}
        </Layout>

        <GlobalStyle />
      </PageContainer>
    </div>
  );
}
