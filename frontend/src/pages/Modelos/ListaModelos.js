import { Container, Button, PageContainer, Title } from "../../styles/styles";
import { toast } from "react-toastify";
import Grid from "../../components/Grid/Grid";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "../../styles/global";
import Modal from "react-bootstrap/Modal";
import ModalTitle from "react-bootstrap/esm/ModalTitle";
import Form from "../../components/Form/Form";
import { useNavigate } from "react-router-dom";

function ListaModelos() {
  const [modelos, setModelos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const navigate = useNavigate();

  const getModelos = async () => {
    try {
      const res = await axios.get("http://localhost:8800/modelos");
      setModelos(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error("Erro ao buscar modelos");
    }
  };

  useEffect(() => {
    getModelos();
  }, []);

  const handleEditar = (tipo, item) => {
    navigate(`/editarModelo/${item.id}`);
  };

  return (
    <PageContainer>
      <GlobalStyle />
      <Container>
        <Title style={{ alignSelf: "flex-start" }}>Lista de modelos</Title>

        <div style={{ marginBottom: "15px", alignSelf: "flex-end" }}>
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
            Novo modelo
          </Button>
        </div>

        <Grid
          data={modelos}
          setData={setModelos}
          setOnEdit={setOnEdit}
          endpoint="modelos"
          tipo="modelo"
          handleEditar={handleEditar}
          columns={[
            { key: "id", label: "Código produto" },
            { key: "nome", label: "Título" },
            { key: "descricao", label: "Modelo" },
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

export default ListaModelos;
