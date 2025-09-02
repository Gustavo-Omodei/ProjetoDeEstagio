import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import GlobalStyle from "../../styles/global";
import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
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

function EditarModelo() {
  const { id } = useParams();
  const [modelo, setModelo] = useState({
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
  const [onEdit, setOnEdit] = useState(null);
  const [categoriaModalOpen, setCategoriaModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("nome", modelo.nome);
      data.append("descricao", modelo.descricao);
      data.append("status", modelo.status);
      data.append("idCategoria", modelo.idCategoria);
      data.append("valor", modelo.valor);
      data.append("tamanho", modelo.tamanho);

      if (modelo.imagem1) data.append("imagem1", modelo.imagem1);
      if (modelo.imagem2) data.append("imagem2", modelo.imagem2);
      if (modelo.imagem3) data.append("imagem3", modelo.imagem3);

      await axios.put(`http://localhost:8800/modelos/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Modelo atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao cadastrar modelo");
    }
  };

  const getModelobyID = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:8800/modelos/${id}`);
      setModelo(res.data);
    } catch (error) {
      toast.error("Erro ao buscar modelos");
    }
  }, [id]);

  const getCategorias = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8800/categorias");
      setCategorias(res.data);
    } catch {
      toast.error("Erro ao buscar categorias");
    }
  }, []);
  useEffect(() => {
    getModelobyID();
    getCategorias();
  }, [id, getModelobyID, getCategorias]);

  return (
    <PageContainer>
      <Title>Editar modelo</Title>
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
                    setModelo({
                      ...modelo,
                      [`imagem${num}`]: e.target.files[0],
                    })
                  }
                />
                <Thumbnail>
                  {modelo[`imagem${num}`] ? (
                    <img
                      src={
                        modelo[`imagem${num}`] instanceof File
                          ? URL.createObjectURL(modelo[`imagem${num}`])
                          : `http://localhost:8800${modelo[`imagem${num}`]}`
                      }
                      alt={`Imagem ${num}`}
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
              <Carousel
                data-bs-theme="dark"
                style={{ width: "100%", height: "100%" }}
              >
                {[1, 2, 3].map((num) => {
                  const img = modelo[`imagem${num}`];

                  if (!img) return null;

                  return (
                    <Carousel.Item key={num}>
                      <img
                        src={
                          img instanceof File
                            ? URL.createObjectURL(img)
                            : `http://localhost:8800${img}`
                        }
                        alt={`Imagem ${num}`}
                        style={{
                          width: "100%",
                          height: "600px",
                          objectFit: "cover",
                        }}
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>
          </UploadBox>
        </LeftSide>

        {/* Lado direito */}
        <RightSide>
          <div>
            <Label>Título do modelo</Label>
            <Input
              placeholder="Digite o título"
              value={modelo.nome}
              onChange={(e) => setModelo({ ...modelo, nome: e.target.value })}
            />
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <Label>Dimensões</Label>
              <Input
                placeholder="Ex: 200x80x90cm"
                value={modelo.tamanho}
                onChange={(e) =>
                  setModelo({ ...modelo, tamanho: e.target.value })
                }
              />
            </div>
            <div style={{ flex: 1 }}>
              <Label>
                Categoria{" "}
                <FaPlusCircle
                  onClick={() => setCategoriaModalOpen(true)}
                  style={{
                    cursor: "pointer",
                    color: "#ab8d69",
                  }}
                />
              </Label>
              <Select
                value={modelo.idCategoria || ""}
                onChange={(e) =>
                  setModelo({
                    ...modelo,
                    idCategoria: e.target.value ? Number(e.target.value) : "",
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
                value={modelo.valor}
                onChange={(e) =>
                  setModelo({ ...modelo, valor: e.target.value })
                }
              />
            </div>
            <div style={{ flex: 1 }}>
              <Label>Status</Label>
              <Select
                value={modelo.status}
                onChange={(e) =>
                  setModelo({
                    ...modelo,
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
              value={modelo.descricao}
              onChange={(e) =>
                setModelo({ ...modelo, descricao: e.target.value })
              }
              placeholder="Digite a descrição"
            />
          </div>

          <Button onClick={handleSubmit}>Salvar</Button>
        </RightSide>
      </Content>
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
      <GlobalStyle />
    </PageContainer>
  );
}

export default EditarModelo;
