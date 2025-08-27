import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Container, Title } from "../styles/styles";
import Form from "../components/Form/Form";
import Grid from "../components/Grid/Grid";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import GlobalStyle from "../styles/global";
import "react-toastify/dist/ReactToastify.css";
import ModalFooter from "react-bootstrap/esm/ModalFooter";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const [modelos, setModelos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [modeloModalOpen, setModeloModalOpen] = useState(false);
  const [categoriaModalOpen, setCategoriaModalOpen] = useState(false);

  const [novoModelo, setNovoModelo] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("");
  const [novaDecricao, setNovaDecricao] = useState("");


  // Busca produtos
  const getProdutos = async () => {
    try {
      const res = await axios.get("http://localhost:8800/produtos");
      setProdutos(
        res.data.sort((a, b) => (a.nomeProduto > b.nomeProduto ? 1 : -1))
      );
    } catch {
      toast.error("Erro ao buscar produtos");
    }
  };

  // Busca modelos
  const getModelos = async () => {
    try {
      const res = await axios.get("http://localhost:8800/modelos");
      setModelos(res.data);
    } catch {
      toast.error("Erro ao buscar modelos");
    }
  };

  // Busca categorias
  const getCategorias = async () => {
    try {
      const res = await axios.get("http://localhost:8800/categorias");
      setCategorias(res.data);
    } catch {
      toast.error("Erro ao buscar categorias");
    }
  };

  useEffect(() => {
    getProdutos();
    getModelos();
    getCategorias();
  }, []);

  // Salvar novo modelo
  const salvarModelo = async () => {
    if (!novoModelo) return toast.error("Digite o nome do modelo");
    try {
      await axios.post("http://localhost:8800/modelos", { nome: novoModelo });
      toast.success("Modelo adicionado!");
      setNovoModelo("");
      setModeloModalOpen(false);
      getModelos();
    } catch {
      toast.error("Erro ao salvar modelo");
    }
  };

  // Salvar nova categoria
  const salvarCategoria = async () => {
    if (!novaCategoria) return toast.error("Digite o nome da categoria");
    if (!novaDecricao) return toast.error("Digite o nome da categoria");
    try {
        await axios.post("http://localhost:8800/categorias", {
        nome: novaCategoria,
        descricao: novaDecricao,
      });
      toast.success("Categoria adicionada!");
      setNovaCategoria("");
      setNovaDecricao("");  
      setCategoriaModalOpen(false);
      getCategorias();
    } catch {
      toast.error("Erro ao salvar categoria");
    }
  };

  return (
    <Container>
      <Title>Cadastro de Produtos</Title>

      <Form
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        getData={getProdutos}
        endpoint="produtos"
        fields={[
          { name: "nomeProduto", label: "Nome", placeholder: "Digite o nome" },
          { name: "valor", label: "Preço", placeholder: "Digite o valor" },
          {
            name: "tamanho",
            label: "Dimensões",
            placeholder: "Digite o tamanho",
          },
          {
            name: "idCategoria",
            label: "Categoria",
            type: "select",
            options: categorias.map((c) => ({ value: c.id, label: c.nome })),
            addButton: {
              label: "+",
              onClick: () => setCategoriaModalOpen(true),
            },
          },
          {
            name: "idModelo",
            label: "Modelo",
            type: "select",
            options: modelos.map((m) => ({ value: m.id, label: m.nome })),
            addButton: { label: "+", onClick: () => setModeloModalOpen(true) },
          },
        ]}
      />
      <Modal
        show={categoriaModalOpen}
        onHide={() => setCategoriaModalOpen(false)}
        >
        <Modal.Header>
          Adicionar Categoria
        </Modal.Header>
        <Modal.Body>
          <Form
          onEdit={onEdit}
          setOnEdit={setOnEdit}
          getData={getCategorias}
          endpoint="categorias"
          fields={
            [
              {name: "nome", label: "Nome categoria"},
              {name: "descricao", label: "Nome descricao"},
              
            ]
          }>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={modeloModalOpen}
        onHide={() => setModeloModalOpen(false)}
        >
        <Modal.Header>
          Adicionar Modelo
        </Modal.Header>
        <Modal.Body>
          <Form
          onEdit={onEdit}
          setOnEdit={setOnEdit}
          getData={getModelos}
          endpoint="modelos"
          fields={
            [
              {name: "nome", label: "Nome categoria"},
              {name: "descricao", label: "Nome descricao"},
{name: "IdCategoria",
            label: "Categoria",
            type: "select",
            options: categorias.map((c) => ({ value: c.id, label: c.nome }))
              },            ]
          }>
          </Form>
        </Modal.Body>
      </Modal>


      {/* Grid de Produtos */}
      <Grid
        data={produtos}
        setData={setProdutos}
        setOnEdit={setOnEdit}
        endpoint="produtos"
        columns={[
          { key: "nomeProduto", label: "Nome" },
          { key: "valor", label: "Preço" },
          { key: "tamanho", label: "Dimensões" },
          { key: "idModelo", label: "Modelo" },
        ]}
      />

      <GlobalStyle />
    </Container>
  );
}

export default Produtos;
