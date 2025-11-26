import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import GlobalStyle from "../styles/global";
import {
  PageContainer,
  Title,
  Content,
  LeftSide,
  UploadBox,
  Thumbnails,
  Thumbnail,
  RightSide,
  Label,
  Input,
  Select,
  TextArea,
  Button,
} from "../styles/styles";

export default function ProductPage() {
  const { id } = useParams();
  const [modelo, setModelos] = useState(null);
  const [cores, setCores] = useState([]);
  const [tecidos, setTecidos] = useState([]);

  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const carregar = async () => {
      try {
        const r = await axios.get(`http://localhost:8800/modelos/${id}`);
        const prod = r.data;
        setModelos(prod);

        const imgs = [modelo.imagem1, modelo.imagem2, modelo.imagem3].filter(
          Boolean
        );

        setMainImage(imgs[0] || "");
      } catch (e) {
        console.error(e);
      }
    };

    carregar();
  }, [id]);

  function useFetch(url, onSuccess) {
    useEffect(() => {
      axios
        .get(url)
        .then((res) => onSuccess(res.data))
        .catch(() => toast.error(`Erro ao buscar dados de ${url}`));
    }, [url, onSuccess]);
  }

  useFetch("http://localhost:8800/cores", setCores);
  useFetch("http://localhost:8800/tecidos", setTecidos);

  if (!modelo) return <p>Carregando...</p>;

  const imagens = [modelo.imagem1, modelo.imagem2, modelo.imagem3].filter(
    Boolean
  );

  return (
    <PageContainer>
      <Content>
        <div style={{ padding: "40px 80px" }}>
          <div style={{ display: "flex", gap: 40 }}>
            {/* MINIATURAS */}
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

            {/* IMAGEM PRINCIPAL */}
            <div
              style={{
                flex: 1,
                background: "#F7F3EF",
                borderRadius: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 40,
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

            {/* PAINEL */}
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: 38, fontWeight: 600 }}>
                {modelo.Categoria?.nome + " " + modelo.nome}
              </h1>

              <p style={{ opacity: 0.7, marginTop: -10 }}>
                Design leve e elegante, perfeito para salas modernas
              </p>

              <p style={{ fontSize: 32, fontWeight: 600, margin: "20px 0" }}>
                R$ {Number(modelo.valor).toFixed(2)}
              </p>

              {/* CORES — por enquanto fixo */}
              <Label>Cores disponíveis</Label>
              <div style={{ display: "flex", gap: 12, margin: "10px 0 25px" }}>
                {cores.map((cor) => (
                  <div
                    key={cor.id}
                    onClick={() => setModelos({ ...modelo, idCor: cor.id })}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: cor.codigoHex,
                      border:
                        modelo.idCor === cor.id
                          ? "3px solid #9c826aff"
                          : "1px solid #aaa",
                      cursor: "pointer",
                    }}
                    title={cor.nome}
                  />
                ))}
              </div>

              {/* TECIDOS — fixo por enquanto */}
              <div style={{ flex: 1 }}>
                <Label>Tecidos</Label>
                <Select
                  value={modelo.idTecido || ""}
                  onChange={(e) =>
                    setModelos({
                      ...modelo,
                      idTecido: e.target.value ? Number(e.target.value) : "",
                    })
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

              {/* BOTÕES */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 30,
                  gap: 15,
                }}
              >
                <button
                  style={{
                    background: "#BFA27B",
                    border: "none",
                    color: "white",
                    padding: "14px 26px",
                    borderRadius: 10,
                    fontSize: 16,
                    cursor: "pointer",
                  }}
                >
                  Adicionar ao Carrinho
                </button>

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

          {/* DETALHES */}
          <div style={{ marginTop: 60 }}>
            <h2>Detalhes</h2>
            <p style={{ maxWidth: "70%", opacity: 0.8 }}>{modelo.detalhes}</p>
          </div>
        </div>
      </Content>
      <GlobalStyle />
    </PageContainer>
  );
}
