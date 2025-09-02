import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import GlobalStyle from "../../styles/global";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlusCircle } from "react-icons/fa";

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
} from "../../styles/styles";
import Form from "../../components/Form/Form";
import ModalTitle from "react-bootstrap/esm/ModalTitle";

function CadastroModelos() {
  const [onEdit, setOnEdit] = useState({
    nome: "",
    descricao: "",
    status: "",
    idCategoria: "",
    valor: "",
    tamanho: "",
    imagem1: null,
    imagem2: null,
    imagem3: null,
  });
  const [categorias, setCategorias] = useState([]);
  const [categoriaModalOpen, setCategoriaModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    status: "Ativo",
    idCategoria: "",
    valor: "",
    tamanho: "",
    imagem1: null,
    imagem2: null,
    imagem3: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("nome", formData.nome);
      data.append("descricao", formData.descricao);
      data.append("status", formData.status);
      data.append("idCategoria", formData.idCategoria);
      data.append("valor", formData.valor);
      data.append("tamanho", formData.tamanho);

      if (formData.imagem1) data.append("imagem1", formData.imagem1);
      if (formData.imagem2) data.append("imagem2", formData.imagem2);
      if (formData.imagem3) data.append("imagem3", formData.imagem3);

      await axios.post("http://localhost:8800/modelos", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Modelo cadastrado com sucesso!");
      setFormData({
        nome: "",
        descricao: "",
        status: "",
        idCategoria: "",
        valor: "",
        tamanho: "",
        imagem1: null,
        imagem2: null,
        imagem3: null,
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
            {[1, 2, 3].map((num) => (
              <label key={num}>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [`imagem${num}`]: e.target.files[0],
                    })
                  }
                />
                <Thumbnail>
                  {formData[`imagem${num}`] ? (
                    <img
                      src={URL.createObjectURL(formData[`imagem${num}`])}
                      alt={`Preview ${num}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    "+"
                  )}
                </Thumbnail>
              </label>
            ))}
          </Thumbnails>

          <UploadBox>
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
              {formData.imagem1 ? (
                <img
                  src={URL.createObjectURL(formData.imagem1)}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span>🖼️</span>
              )}
            </div>
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

          <div style={{ display: "flex", gap: "10px" }}>
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
                Categoria {""}
                <FaPlusCircle
                  onClick={() => setCategoriaModalOpen(true)}
                  style={{
                    cursor: "pointer",
                    color: "#ab8d69",
                  }}
                />
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
            <div style={{ flex: 1 }}>
              <Label>Status</Label>
              <Select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value ? String(e.target.value) : null,
                  })
                }
              >
                <option value="">Selecione uma categoria</option>
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </Select>
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
        </Modal>
      </Content>
      <GlobalStyle />
    </PageContainer>
  );
}

export default CadastroModelos;
