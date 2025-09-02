import { Container } from "../styles/styles";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Grid from "../components/Grid/Grid";
import { Button, PageContainer, Title } from "../styles/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "../styles/global";

function ListaCoresETecidos() {
  const [cores, setCores] = useState([]);
  const [tecidos, setTecidos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getCores = async () => {
    try {
      const res = await axios.get("http://localhost:8800/cores");
      setCores(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error("Erro ao buscar cores");
    }
  };

  const getTecidos = async () => {
    try {
      const res = await axios.get("http://localhost:8800/tecidos");
      setTecidos(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error("Erro ao buscar tecidos");
    }
  };

  useEffect(() => {
    getCores();
    getTecidos();
  }, []);

  return (
    <PageContainer>
      <GlobalStyle />
      <Container>
        {/* título igual à foto */}
        <Title style={{ alignSelf: "flex-start" }}>Lista de cores</Title>

        {/* botão novo produto */}
        <div
          style={{
            marginBottom: "15px",
            alignSelf: "flex-end",
          }}
        >
          <Button
            as={Link}
            to="/cadastroModelos"
            style={{
              width: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            Novo produto
          </Button>
        </div>

        <Grid
          data={cores}
          setData={setCores}
          setOnEdit={setOnEdit}
          endpoint="cores"
          columns={[
            { key: "id", label: "Código cor" },
            { key: "nome", label: "Título" },
            { key: "descricao", label: "Cor" },
            { key: "status", label: "Status" },
            { key: "idCategoria", label: "Categoria" },
            { key: "valor", label: "Preço" },
            { key: "tamanho", label: "Dimensões" },
          ]}
        />
      </Container>
      <Container>
        {/* título igual à foto */}
        <Title style={{ alignSelf: "flex-start" }}>Lista de tecidos</Title>

        {/* botão novo produto */}
        <div
          style={{
            marginBottom: "15px",
            alignSelf: "flex-end",
          }}
        >
          <Button
            as={Link}
            to="/cadastroModelos"
            style={{
              width: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            Novo produto
          </Button>
        </div>

        <Grid
          data={tecidos}
          setData={setTecidos}
          setOnEdit={setOnEdit}
          endpoint="tecidos"
          columns={[
            { key: "id", label: "Código tecido" },
            { key: "nome", label: "Título" },
            { key: "descricao", label: "Descrição" },
            { key: "status", label: "Status" },
            { key: "idCategoria", label: "Categoria" },
            { key: "valor", label: "Preço" },
            { key: "tamanho", label: "Dimensões" },
          ]}
        />
      </Container>
    </PageContainer>
  );
}

export default ListaCoresETecidos;
