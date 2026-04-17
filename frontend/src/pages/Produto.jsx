import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import GlobalStyle from "../styles/global";
import { AuthContext } from "../context/AuthContext";
import {
  PageContainer,
  Content,
  Label,
  Select,
  Button,
} from "../styles/styles";
import { Spinner } from "react-bootstrap";
import api from "../api/api";

export default function ProductPage() {
  const { id } = useParams();
  const [modelo, setModelos] = useState(null);
  const [idCorSelecionada, setIdCorSelecionada] = useState("");
  const [idTecidoSelecionado, setIdTecidoSelecionado] = useState("");
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [cores, setCores] = useState([]);
  const [tecidos, setTecidos] = useState([]);

  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const carregar = async () => {
      try {
        const m = await api.get(`/modelos/${id}`);
        const modeloData = m.data;
        setModelos(modeloData);
        setMainImage(modeloData.imagem1);
      } catch (e) {
        console.error("❌ Erro ao carregar modelo:", e);
      }
    };

    carregar();
  }, [id]);

  function useFetch(url, onSuccess) {
    useEffect(() => {
      axios
        .get(url)
        .then((res) => onSuccess(res.data))
        .catch((e) => {
          console.error(`❌ Erro ao carregar ${url}:`, e);
          toast.error(`Erro ao buscar dados de ${url}`);
        });
    }, [url, onSuccess]);
  }

  useFetch("http://localhost:8800/cores", setCores);
  useFetch("http://localhost:8800/tecidos", setTecidos);

  if (!modelo)
    return (
      <p>
        <Spinner />
      </p>
    );

  const imagens = [modelo.imagem1, modelo.imagem2, modelo.imagem3].filter(
    Boolean,
  );

  const handleAddToCart = async () => {
    if (!idCorSelecionada) {
      toast.error("Selecione uma cor!");
      return;
    }

    if (!idTecidoSelecionado) {
      toast.error("Selecione um tecido!");
      return;
    }

    if (!user) {
      return navigate("/login");
    }
    if (!token) {
      toast.error("Você não está autenticado.");
      return;
    }

    try {
      console.log("🛠 Criando variante de produto...");

      const variacao = await axios.post(
        "http://localhost:8800/produtos",
        {
          idModelo: modelo.id,
          idCor: idCorSelecionada,
          idTecido: idTecidoSelecionado,
          preco: modelo.valor,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const idProduto = variacao.data.produto?.id;

      if (!idProduto) {
        console.log("❌ ERRO: Produto criado sem ID:", variacao.data);
        toast.error("Erro ao criar variação do produto.");
        return;
      }

      const respostaCarrinho = await api.post(
        "/carrinho/adicionar",
        {
          idProduto,
          quantidade: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      toast.success("Adicionado ao carrinho!");
    } catch (e) {
      console.log("❌ ERRO AO ADICIONAR AO CARRINHO:");
      console.log("Status:", e.response?.status);
      console.log("Data:", e.response?.data);
      console.log("Message:", e.message);
      console.log("Payload enviado:", e.config?.data);

      toast.error("Erro ao adicionar ao carrinho.");
    }
  };

  return (
    <PageContainer>
      <Content>
        <div style={{ padding: "40px 80px", minWidth: "1200px" }}>
          <div style={{ display: "flex", gap: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {imagens.map((img, i) => (
                <img
                  key={i}
                  src={`http://localhost:8800${img}`}
                  alt=""
                  onClick={() => setMainImage(img)}
                  style={{
                    width: 90,
                    height: 90,
                    objectFit: "cover",
                    borderRadius: 10,
                    cursor: "pointer",
                    border:
                      mainImage === img
                        ? "2px solid #C0A98E"
                        : "1px solid #ddd",
                  }}
                />
              ))}
            </div>

            <div
              style={{
                flex: 1,
                background: "#F7F3EF",
                borderRadius: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 40,
                minHeight: "500px",
                maxHeight: "500px",
              }}
            >
              <img
                src={`http://localhost:8800${mainImage}`}
                alt="Imagem principal do produto"
                style={{
                  width: "90%",
                  height: "90%",
                  objectFit: "contain",
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: 38, fontWeight: 600 }}>
                {modelo.Categoria?.nome + " " + modelo.nome}
              </h1>

              <p style={{ opacity: 0.7, marginTop: -10 }}>{modelo.descricao}</p>

              <p style={{ fontSize: 32, fontWeight: 600, margin: "20px 0" }}>
                {modelo.valor.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>

              <Label>Cores disponíveis</Label>
              <div style={{ display: "flex", gap: 12, margin: "10px 0 25px" }}>
                {cores.map((cor) => (
                  <div
                    key={cor.id}
                    onClick={() => setIdCorSelecionada(cor.id)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: cor.codigoHex,
                      border:
                        idCorSelecionada === cor.id
                          ? "3px solid #9c826aff"
                          : "1px solid #aaa",
                      cursor: "pointer",
                    }}
                    title={cor.nome}
                  />
                ))}
              </div>

              <div style={{ flex: 1 }}>
                <Label>Tecidos</Label>
                <Select
                  value={idTecidoSelecionado}
                  onChange={(e) =>
                    setIdTecidoSelecionado(
                      e.target.value ? Number(e.target.value) : "",
                    )
                  }
                >
                  <option value="">Selecione um tecido</option>
                  {tecidos.map((c) => (
                    <option key={c.id} value={Number(c.id)}>
                      {c.nome}
                    </option>
                  ))}
                </Select>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 30,
                  gap: 15,
                }}
              >
                <Button onClick={handleAddToCart}>Adicionar ao Carrinho</Button>

                <button
                  style={{
                    background: "white",
                    border: "2px solid #ddd",
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                >
                  🤍
                </button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 60 }}>
            <h2>Detalhes</h2>
            <p style={{ maxWidth: "50%", opacity: 0.8 }}>{modelo.descricao}</p>
          </div>
        </div>
      </Content>
      <GlobalStyle />
    </PageContainer>
  );
}
