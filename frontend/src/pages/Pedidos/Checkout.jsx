import { useEffect, useState, useContext } from "react";
import { replace, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";
import { FiMapPin, FiTruck, FiCreditCard } from "react-icons/fi";
import {
  PageContainer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
} from "../../styles/styles";
import GlobalStyle from "../../styles/global";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/api";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState();
  const [produtos, setProdutos] = useState([]);
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [frete, setFrete] = useState();
  const [prazo, setPrazo] = useState();
  const { user, token } = useContext(AuthContext);
  const [mostrarEnderecos, setMostrarEnderecos] = useState(false);
  const total = frete + state.subtotal;

  useEffect(() => {
    if (!state) {
      navigate("/carrinho");
      return;
    }

    async function carregarDados() {
      try {
        const response = await api.get(`/clientes/${user.id}/enderecos`);
        const listaEnderecos = response.data.Enderecos || [];

        setEnderecos(listaEnderecos);

        if (listaEnderecos.length > 0) {
          const primeiroEndereco = listaEnderecos[0];
          setEnderecoSelecionado(primeiroEndereco);

          const resp = await api.post(`/frete/calcular`, {
            cep: primeiroEndereco.cep,
          });

          setFrete(Number(resp.data.valor));
          setPrazo(Number(resp.data.prazo));
        }

        setProdutos(state.produtos || []);
        setPedido({
          cliente: state.cliente,
          frete: state.frete,
          prazo: state.prazo,
          subtotal: state.subtotal,
          total: state.total,
          cep: state.cep,
        });
      } catch (e) {
        toast.error("Erro ao carregar endereços ou calcular frete.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [state, navigate, user.id]);

  async function confirmarPedido(cliente, produtos, frete, prazo) {
    console.log("produtos enviados:", produtos);
    try {
      const resp = await api.post(`/pedido/criar`, {
        cliente: cliente,
        produtos: produtos,
        frete: frete,
        prazo: prazo,
        endereco: enderecoSelecionado,
      });
      navigate(`/pedido/${resp.data.pedidoId}`, { replace: true, state: null });
      window.open(resp.data.linkPagamento, "_blank", "noopener,noreferrer");
    } catch (e) {
      toast.error(e);
    }
  }

  async function selecionarEndereco(endereco) {
    try {
      setEnderecoSelecionado(endereco);

      const resp = await api.post(`/frete/calcular`, {
        cep: endereco.cep,
      });

      setFrete(Number(resp.data.valor));
      setPrazo(Number(resp.data.prazo));
    } catch (e) {
      toast.error("Erro ao calcular frete para este endereço.");
      console.error(e);
    }
  }

  if (loading) return <div>Carregando checkout...</div>;
  if (!pedido) return <div>Checkout não encontrado.</div>;

  return (
    <PageContainer style={{ maxWidth: "1280px" }}>
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => navigate("/carrinho")}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#ab8d69",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          <FaArrowLeft />
          Voltar para o carrinho
        </button>
      </div>

      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontWeight: "bold",
            fontSize: "42px",
            marginBottom: 8,
            color: "#1f1f1f",
          }}
        >
          Checkout
        </h1>
        <p
          style={{
            color: "#7a7a7a",
            fontSize: 16,
            margin: 0,
          }}
        >
          Revise seus produtos, entrega e pagamento antes de finalizar.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              background: "#fff",
              border: "1px solid #ece7e2",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: 18,
                fontSize: 24,
                color: "#2b2b2b",
              }}
            >
              Produtos ({produtos.length} itens)
            </h3>

            <Table>
              <Thead>
                <Tr>
                  <Th style={{ textAlign: "start" }}>Produto</Th>
                  <Th>Quantidade</Th>
                  <Th>Valor unitário</Th>
                  <Th>Subtotal</Th>
                </Tr>
              </Thead>
              <Tbody>
                {produtos.map((p, index) => (
                  <Tr key={p.idProduto || p.id || index}>
                    <Td style={{ textAlign: "start" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                        }}
                      >
                        <img
                          src={p.imagem1 || "/placeholder.png"}
                          alt={p.nomeExibicao || "Produto"}
                          style={{
                            width: 76,
                            height: 76,
                            objectFit: "cover",
                            borderRadius: 12,
                            border: "1px solid #eee",
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontWeight: 700,
                              color: "#222",
                              marginBottom: 4,
                            }}
                          >
                            {p.nomeExibicao || "Produto"}
                          </div>
                          <div
                            style={{
                              color: "#8b8b8b",
                              fontSize: 14,
                            }}
                          >
                            Código: {p.idProduto || p.id || "N/A"}
                          </div>
                        </div>
                      </div>
                    </Td>

                    <Td>{p.quantidade}</Td>

                    <Td>
                      {Number(p.preco || 0).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Td>

                    <Td>
                      {(
                        Number(p.preco || 0) * Number(p.quantidade || 0)
                      ).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid #ece7e2",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
            }}
          >
            <div
              onClick={() => setMostrarEnderecos(!mostrarEnderecos)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                marginBottom: mostrarEnderecos ? 18 : 0,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: 22,
                  color: "#2b2b2b",
                }}
              >
                Entrega
              </h3>

              <span
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  color: "#9a7048",
                }}
              >
                {mostrarEnderecos ? "−" : "+"}
              </span>
            </div>

            {enderecoSelecionado && (
              <div
                style={{
                  border: "1px solid #eee",
                  borderRadius: 12,
                  padding: 14,
                  marginBottom: mostrarEnderecos ? 18 : 0,
                  background: "#fcfcfc",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    color: "#444",
                    marginBottom: 10,
                  }}
                >
                  <FiMapPin size={18} style={{ marginTop: 2 }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>Endereço selecionado</div>
                    <div style={{ color: "#777" }}>
                      {enderecoSelecionado.rua}, {enderecoSelecionado.numero}
                      {enderecoSelecionado.complemento
                        ? ` - ${enderecoSelecionado.complemento}`
                        : ""}
                    </div>
                    <div style={{ color: "#777" }}>
                      {enderecoSelecionado.bairro} -{" "}
                      {enderecoSelecionado.cidade}/{enderecoSelecionado.estado}
                    </div>
                    <div style={{ color: "#777" }}>
                      CEP: {enderecoSelecionado.cep}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    color: "#444",
                  }}
                >
                  <FiTruck size={18} style={{ marginTop: 2 }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>Prazo estimado</div>
                    <div style={{ color: "#777" }}>{prazo || 0} dias</div>
                  </div>
                </div>
              </div>
            )}

            {mostrarEnderecos && (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {enderecos.length === 0 ? (
                  <p style={{ margin: 0, color: "#777" }}>
                    Nenhum endereço cadastrado.
                  </p>
                ) : (
                  enderecos.map((endereco, index) => {
                    const isSelecionado =
                      enderecoSelecionado?.id === endereco.id;

                    return (
                      <label
                        key={endereco.id || index}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 12,
                          border: isSelecionado
                            ? "1px solid #ab8d69"
                            : "1px solid #e8e8e8",
                          borderRadius: 12,
                          padding: 14,
                          cursor: "pointer",
                          background: isSelecionado ? "#f8f3ee" : "#fff",
                        }}
                      >
                        <input
                          type="radio"
                          name="endereco_entrega"
                          checked={isSelecionado}
                          onChange={() => selecionarEndereco(endereco)}
                          style={{ marginTop: 4 }}
                        />

                        <div>
                          <div
                            style={{
                              fontWeight: 700,
                              color: "#222",
                              marginBottom: 6,
                            }}
                          >
                            Endereço {index + 1}
                          </div>

                          <div style={{ color: "#666", lineHeight: 1.5 }}>
                            {endereco.rua}, {endereco.numero}
                            {endereco.complemento
                              ? ` - ${endereco.complemento}`
                              : ""}
                          </div>

                          <div style={{ color: "#666", lineHeight: 1.5 }}>
                            {endereco.bairro} - {endereco.cidade}/
                            {endereco.estado}
                          </div>

                          <div style={{ color: "#666", lineHeight: 1.5 }}>
                            CEP: {endereco.cep}
                          </div>
                        </div>
                      </label>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              background: "#fff",
              border: "1px solid #ece7e2",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: 20,
                fontSize: 24,
                color: "#2b2b2b",
              }}
            >
              Resumo do pedido
            </h3>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 14,
                color: "#555",
              }}
            >
              <span>Subtotal</span>
              <span>
                {Number(pedido.subtotal || 0).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 18,
                color: "#555",
              }}
            >
              <span>Frete</span>
              <span>
                {frete.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>

            <div
              style={{
                borderTop: "1px solid #eee",
                paddingTop: 16,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 22,
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#222",
                }}
              >
                Total
              </span>
              <span
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: "#9a7048",
                }}
              >
                {Number(total || 0).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>

            <Button
              type="button"
              onClick={() => confirmarPedido(user, produtos, frete, prazo)}
              style={{
                width: "100%",
                fontSize: 16,
              }}
            >
              Finalizar pedido
            </Button>
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid #ece7e2",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: 18,
                fontSize: 22,
                color: "#2b2b2b",
              }}
            >
              Informações do pagamento
            </h3>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                color: "#444",
              }}
            >
              <FiCreditCard size={18} style={{ marginTop: 2 }} />
              <div>
                <div style={{ fontWeight: 600 }}>Forma de pagamento</div>
                <div style={{ color: "#777" }}>Mercado Pago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GlobalStyle />
    </PageContainer>
  );
}
