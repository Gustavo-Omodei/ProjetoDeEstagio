import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
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
  ColorPicker,
  ColorCircle,
  Button,
} from "./Produtos.styles";
import Form from "../components/Form/Form";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const [modelos, setModelos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [modeloModalOpen, setModeloModalOpen] = useState(false);
  const [categoriaModalOpen, setCategoriaModalOpen] = useState(false);

  const [colors, setColors] = useState([
    "#F5F5DC",
    "#E5DCC3",
    "#C0A080",
    "#8B5E3C",
  ]);
  const [selectedColor, setSelectedColor] = useState(null);

  const [formData, setFormData] = useState({
    nomeProduto: "",
    tamanho: "",
    idModelo: "",
    valor: "",
    descricao: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // <-- veja o idModelo aqui
    if (!formData.idModelo) {
      toast.error("Selecione um modelo antes de salvar!");
      return;
    }
    try {
      await axios.post("http://localhost:8800/produtos", formData);
      toast.success("Produto cadastrado com sucesso!");
    } catch {
      toast.error("Erro ao cadastrar produto");
    }
  };

  // --- Funções para buscar dados ---
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

  const getModelos = async () => {
    try {
      const res = await axios.get("http://localhost:8800/modelos");
      setModelos(res.data);
    } catch {
      toast.error("Erro ao buscar modelos");
    }
  };

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

  return (
    <PageContainer>
      <Title>Cadastrar produtos</Title>
      <Content>
        {/* Lado esquerdo */}
        <LeftSide>
          <UploadBox>
            <span role="img" aria-label="upload">
              🖼️
            </span>
          </UploadBox>
          <Thumbnails>
            <Thumbnail>+</Thumbnail>
            <Thumbnail>+</Thumbnail>
            <Thumbnail>+</Thumbnail>
          </Thumbnails>
        </LeftSide>

        {/* Lado direito */}
        <RightSide>
          <div>
            <Label>Título do produto</Label>
            <Input
              placeholder="Digite o título"
              value={formData.nomeProduto}
              onChange={(e) =>
                setFormData({ ...formData, nomeProduto: e.target.value })
              }
            />
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <Label>Dimensões</Label>
              <Input
                placeholder="Ex: 200x80x90cm"
                value={formData.tamanho}
                onChange={(e) =>
                  setFormData({ ...formData, tamanho: e.target.value })
                }
              />
            </div>
            <div style={{ flex: 1 }}>
              <Label>
                Modelo{" "}
                <span
                  style={{ cursor: "pointer", color: "#ab8d69" }}
                  onClick={() => setModeloModalOpen(true)}
                >
                  ⊕
                </span>
              </Label>
              <Select
                value={formData.idModelo || ""}
                onChange={(e) =>
                  setFormData({ ...formData, idModelo: Number(e.target.value) })
                }
              >
                {modelos.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nome}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <Label>Tecido</Label>
              <Input placeholder="Digite o tecido" />
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <Label>Preço</Label>
              <Input
                placeholder="R$"
                value={formData.valor}
                onChange={(e) =>
                  setFormData({ ...formData, valor: e.target.value })
                }
              />
            </div>
            <div style={{ flex: 1 }}>
              <Label>Cores disponíveis</Label>
              <ColorPicker>
                {colors.map((c, i) => (
                  <ColorCircle
                    key={i}
                    color={c}
                    selected={selectedColor === c}
                    onClick={() => setSelectedColor(c)}
                  />
                ))}
                <ColorCircle>+</ColorCircle>
              </ColorPicker>
            </div>
          </div>

          <div>
            <Label>Descrição</Label>
            <TextArea
              value={formData.descricao}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
              placeholder="Digite a descrição"
            />
          </div>

          <Button onClick={handleSubmit}>Salvar</Button>
        </RightSide>
      </Content>

      {/* --- Modal Categoria --- */}
      <Modal
        show={categoriaModalOpen}
        onHide={() => setCategoriaModalOpen(false)}
      >
        <Modal.Header closeButton>Adicionar Categoria</Modal.Header>
        <Modal.Body>
          <Form
            onEdit={onEdit}
            setOnEdit={setOnEdit}
            getData={getCategorias}
            endpoint="categorias"
            fields={[
              { name: "nome", label: "Nome categoria" },
              { name: "descricao", label: "Descrição" },
            ]}
          />
        </Modal.Body>
      </Modal>

      {/* --- Modal Modelo --- */}
      <Modal show={modeloModalOpen} onHide={() => setModeloModalOpen(false)}>
        <Modal.Header closeButton>Adicionar Modelo</Modal.Header>
        <Modal.Body>
          <Form
            onEdit={onEdit}
            setOnEdit={setOnEdit}
            getData={getModelos}
            endpoint="modelos"
            fields={[
              { name: "nome", label: "Nome modelo" },
              { name: "descricao", label: "Descrição" },
              {
                name: "idCategoria",
                label: "Categoria",
                type: "select",
                options: categorias.map((c) => ({
                  value: c.id,
                  label: c.nome,
                })),
              },
            ]}
          />
        </Modal.Body>
      </Modal>

      <GlobalStyle />
    </PageContainer>
  );
}

export default Produtos;
