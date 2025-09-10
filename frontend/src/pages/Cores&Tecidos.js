import { Button, PageContainer, Title } from "../styles/styles";
import { toast } from "react-toastify";
import Grid from "../components/Grid";
import ModalGeral from "../components/Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import GlobalStyle from "../styles/global";
import "react-toastify/dist/ReactToastify.css";

function ListaCoresETecidos() {
  const [modalInfo, setModalInfo] = useState({
    aberto: false,
    tipo: null,
    item: null,
  });
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

  const handleNovo = (tipo) => {
    setModalInfo({ aberto: true, tipo, item: null });
  };

  const handleEditar = (tipo, item) => {
    setModalInfo({ aberto: true, tipo, item });
  };

  const handleClose = () => {
    setModalInfo({ aberto: false, tipo: null, item: null });
  };

  const modalConfig = {
    cor: {
      title: "Cor",
      getData: getCores,
      endpoint: "cores",
      fields: [
        { name: "nome", label: "Nome da cor" },
        { name: "codigoHex", label: "Código HEX" },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: [
            { value: "Disponível", label: "Disponível" },
            { value: "Indisponível", label: "Indisponível" },
          ],
        },
      ],
    },
    tecido: {
      title: "Tecido",
      getData: getTecidos,
      endpoint: "tecidos",
      fields: [
        { name: "nome", label: "Nome do tecido" },
        { name: "descricao", label: "Descrição" },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: [
            { value: "Disponível", label: "Disponível" },
            { value: "Indisponível", label: "Indisponível" },
          ],
        },
      ],
    },
  };

  const currentModal = modalInfo.tipo ? modalConfig[modalInfo.tipo] : null;

  return (
    <PageContainer>
      <Title>Lista de cores</Title>
      <GlobalStyle />
      {/* Cores */}
      <div style={{ marginBottom: "15px", alignSelf: "flex-end" }}>
        <Button
          onClick={() => handleNovo("cor")}
          style={{
            width: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Nova cor
        </Button>
      </div>
      <Grid
        data={cores}
        setData={setCores}
        setOnEdit={setOnEdit}
        endpoint="cores"
        tipo="cor" // informa o tipo do item
        handleEditar={handleEditar} // passa a função que abre o modal
        columns={[
          { key: "id", label: "Código cor" },
          { key: "nome", label: "Título" },
          { key: "codigoHex", label: "Código HEX" },
          { key: "status", label: "Status" },
        ]}
      />
      <Title>Lista de tecidos</Title>
      <div style={{ marginBottom: "15px", alignSelf: "flex-end" }}>
        <Button
          onClick={() => handleNovo("tecido")}
          style={{
            width: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Novo tecido
        </Button>
      </div>
      <Grid
        data={tecidos}
        setData={setTecidos}
        setOnEdit={setOnEdit}
        endpoint="tecidos"
        tipo="tecido"
        handleEditar={handleEditar}
        columns={[
          { key: "id", label: "Código tecido" },
          { key: "nome", label: "Título" },
          { key: "descricao", label: "Descrição" },
          { key: "status", label: "Status" },
        ]}
      />

      {/* Modal Dinâmico */}
      {currentModal && (
        <ModalGeral
          open={modalInfo.aberto}
          onClose={handleClose}
          title={currentModal.title}
          item={modalInfo.item}
          setOnEdit={setOnEdit}
          getData={currentModal.getData}
          endpoint={currentModal.endpoint}
          fields={currentModal.fields}
        />
      )}
    </PageContainer>
  );
}

export default ListaCoresETecidos;
