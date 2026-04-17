import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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

export default function Pedido() {
  const navigate = useNavigate();
  const [statusSelecionado, setStatusSelecionado] = useState("");
  const [atualizandoStatus, setAtualizandoStatus] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, token } = useContext(AuthContext);
  const [mostrarEnderecos, setMostrarEnderecos] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function listarProdutos() {
      console.log(user);
      try {
        const response = await api.get(`/pedido/listar/${id}`);
        console.log(response.data);

        setPedido(response.data.pedido);
        setProdutos(response.data.produtos);
        setLoading(false);
        setPedido(response.data.pedido);
        setProdutos(response.data.produtos);
        setStatusSelecionado(response.data.pedido.status);
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

  const statusStyles = {
    "Aguardando pagamento": {
      backgroundColor: "#fef3c7",
      color: "#92400e",
    },
    Pago: {
      backgroundColor: "#d1fae5",
      color: "#065f46",
    },
    Cancelado: {
      backgroundColor: "#fee2e2",
      color: "#991b1b",
    },
    Enviado: {
      backgroundColor: "#dbeafe",
      color: "#1e40af",
    },
    "Em andamento": {
      backgroundColor: "#e9d5ff",
      color: "#6b21a8",
    },
  };

  const estiloStatus = statusStyles[pedido.status] || {
    backgroundColor: "#e5e7eb",
    color: "#374151",
  };

  async function atualizarStatusPedido() {
    try {
      setAtualizandoStatus(true);

      const response = await api.put(`/pedido/${id}`, {
        status: statusSelecionado,
      });

      console.log(response);
      setPedido((prev) => ({
        ...prev,
        status: statusSelecionado,
      }));

      toast.success("Status do pedido atualizado com sucesso!");
    } catch (e) {
      console.error("Erro ao atualizar status:", e);
      toast.error("Erro ao atualizar status do pedido.");
    } finally {
      setAtualizandoStatus(false);
    }
  }
  return (
    <PageContainer style={{ maxWidth: "1280px" }}>
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => navigate("/meusPedidos")}
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
          Voltar para pedidos
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
          PEDIDO #{id}
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              color: "#7a7a7a",
              fontSize: 16,
              margin: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            Realizado em{" "}
            {new Date(pedido.data).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>

          <span
            style={{
              ...estiloStatus,
              padding: "6px 12px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: "600",
              display: "inline-flex",
              alignItems: "center",
              textTransform: "capitalize",
              lineHeight: 1,
            }}
          >
            {pedido.status}
          </span>
        </div>
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
              Produtos
            </h3>

            <Table>
              <Thead>
                <Tr>
                  <Th>Produto</Th>
                  <Th>Quantidade</Th>
                  <Th>Valor unitário</Th>
                  <Th>Subtotal</Th>
                </Tr>
              </Thead>
              <Tbody>
                {produtos.map((p, index) => (
                  <Tr key={p.id || index}>
                    <Td style={{ textAlign: "start" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                        }}
                      >
                        <img
                          src={`http://localhost:8800${p.Produto.modelo.imagem1}`}
                          alt={p.Produto.nomeExibicao || "Produto"}
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
                            {p.Produto.modelo.Categoria.descricao}{" "}
                            {p.Produto.modelo.nome} {p.Produto.tecido.nome}{" "}
                            {p.Produto.cor.nome}
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
                      {Number(p.preco_unitario || 0).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Td>

                    <Td>
                      {(
                        Number(p.preco_unitario || 0) *
                        Number(p.quantidade || 0)
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
                Detalhes de entrega
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

            {mostrarEnderecos && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    border: "1px solid #ab8d69",
                    borderRadius: 12,
                    margin: 0,
                    padding: 14,
                    cursor: "pointer",
                    background: "#f8f3ee",
                  }}
                >
                  <div style={{ width: "50%" }}>
                    <div style={{ color: "#666", lineHeight: 1.5 }}>
                      {pedido.endereco.rua}, {pedido.endereco.numero}
                      {pedido.endereco.complemento
                        ? ` - ${pedido.endereco.complemento}`
                        : ""}
                    </div>

                    <div style={{ color: "#666", lineHeight: 1.5 }}>
                      {pedido.endereco.bairro} - {pedido.endereco.cidade}/
                      {pedido.endereco.estado}
                    </div>

                    <div style={{ color: "#666", lineHeight: 1.5 }}>
                      CEP: {pedido.endereco.cep}
                    </div>
                    <div style={{ color: "#666", lineHeight: 1.5 }}>
                      Prazo estimado: {pedido.prazo} dias
                    </div>
                  </div>
                  <div style={{ width: "50%" }}>
                    <div style={{ color: "#666", lineHeight: 1.5 }}>
                      {pedido.cliente.nome}
                    </div>

                    <div style={{ color: "#666", lineHeight: 1.5 }}>
                      {pedido.cliente.telefone}
                    </div>

                    <div style={{ color: "#666", lineHeight: 1.5 }}>
                      {pedido.cliente.email}
                    </div>
                  </div>
                </label>
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
                {(pedido.valor_total - pedido.frete).toLocaleString("pt-BR", {
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
                {pedido.frete.toLocaleString("pt-BR", {
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
                {pedido.valor_total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>

            {pedido.status === "Aguardando pagamento" &&
            user.role !== "admin" ? (
              <Button
                onClick={() =>
                  window.open(
                    pedido.linkPagamento,
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                type="button"
                style={{
                  width: "100%",
                  fontSize: 16,
                }}
              >
                Realizar pagamento
              </Button>
            ) : (
              <div />
            )}
            {user.role === "admin" ? (
              <div style={{ marginTop: 12 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <label
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#444",
                    }}
                  >
                    Atualizar status do pedido
                  </label>

                  <select
                    value={statusSelecionado}
                    onChange={(e) => setStatusSelecionado(e.target.value)}
                    style={{
                      width: "100%",
                      height: 46,
                      borderRadius: 10,
                      border: "1px solid #d6d6d6",
                      padding: "0 12px",
                      fontSize: 15,
                      background: "#fff",
                      color: "#333",
                      outline: "none",
                    }}
                  >
                    <option value="Aguardando pagamento">
                      Aguardando pagamento
                    </option>
                    <option value="Pago">Pago</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>

                  <Button
                    type="button"
                    onClick={atualizarStatusPedido}
                    disabled={
                      atualizandoStatus || statusSelecionado === pedido.status
                    }
                    style={{
                      width: "100%",
                      fontSize: 16,
                      opacity:
                        atualizandoStatus || statusSelecionado === pedido.status
                          ? 0.7
                          : 1,
                      cursor:
                        atualizandoStatus || statusSelecionado === pedido.status
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    {atualizandoStatus ? "Atualizando..." : "Salvar status"}
                  </Button>
                </div>
              </div>
            ) : null}
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
