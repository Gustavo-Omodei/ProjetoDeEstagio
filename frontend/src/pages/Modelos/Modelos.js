import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import GlobalStyle from "../../styles/global";
import "bootstrap/dist/css/bootstrap.min.css";

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
} from "./Modelos.styles";
import Form from "../../components/Form/Form";
import ModalTitle from "react-bootstrap/esm/ModalTitle";

function Modelos() {
  const [onEdit, setOnEdit] = useState(null);

  const [categorias, setCategorias] = useState([]);

  const [categoriaModalOpen, setCategoriaModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    idCategoria: "",
    valor: "",
    tamanho: "",
    imagem: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("nome", formData.nome);
      data.append("descricao", formData.descricao);
      data.append("idCategoria", formData.idCategoria);
      data.append("valor", formData.valor);
      data.append("tamanho", formData.tamanho);
      data.append("imagem", formData.imagem); // arquivo

      await axios.post("http://localhost:8800/modelos", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Modelo cadastrado com sucesso!");
      setFormData({
        nome: "",
        descricao: "",
        idCategoria: "",
        valor: "",
        tamanho: "",
        imagem: "",
      });
    } catch {
      toast.error("Erro ao cadastrar modelo");
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
    getCategorias();
  }, []);

  return (
    <PageContainer>
      <Title>Cadastrar modelos</Title>
      <Content>
        {/* Lado esquerdo */}
        <LeftSide>
          <Thumbnails>
            {[1, 2, 3].map((i) => (
              <label key={i}>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setFormData({ ...formData, imagem: e.target.files[0] })
                  }
                />
                <Thumbnail>+</Thumbnail>
              </label>
            ))}
          </Thumbnails>

          <UploadBox>
            <span role="img" aria-label="upload">
              <div
                style={{
                  width: "600px",
                  height: "600px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {formData.imagem ? (
                  <img
                    src={URL.createObjectURL(formData.imagem)}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span>🖼️</span>
                )}
              </div>
            </span>
          </UploadBox>
        </LeftSide>

        {/* Lado direito */}
        <RightSide>
          <div>
            <Label>Título do modelo</Label>
            <Input
              placeholder="Digite o título"
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
            />
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
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
                Categoria{" "}
                <span
                  style={{ cursor: "pointer", color: "#ab8d69" }}
                  onClick={() => setCategoriaModalOpen(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                  >
                    <path
                      style={{ fill: "#ab8d69" }}
                      d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                    />
                  </svg>
                </span>
              </Label>
              <Select
                value={formData.idCategoria ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    idCategoria: e.target.value ? Number(e.target.value) : null,
                  })
                }
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((c) => (
                  <option key={c.id} value={Number(c.id)}>
                    {c.nome}
                  </option>
                ))}
              </Select>
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
            {/* <div style={{ flex: 1 }}>
              <Label>Imagem</Label>
              <Input
                placeholder="URL da imagem"
                value={formData.imagem}
                onChange={(e) =>
                  setFormData({ ...formData, imagem: e.target.value })
                }
              />
            </div> */}
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
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <ModalTitle>Adicionar Categoria</ModalTitle>
        </Modal.Header>
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
        <ToastContainer></ToastContainer>
      </Modal>

      <GlobalStyle />
    </PageContainer>
  );
}

export default Modelos;
