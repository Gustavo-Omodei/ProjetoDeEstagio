import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ModalGeral from "../../components/Modal";
import GlobalStyle from "../../styles/global";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlusCircle } from "react-icons/fa";
import ImageUploader from "../../components/ImageUploader";
import Carousel from "react-bootstrap/Carousel";
import {
  PageContainer,
  Title,
  Content,
  LeftSide,
  UploadBox,
  Thumbnails,
  RightSide,
  Label,
  Input,
  Select,
  TextArea,
  Button,
} from "../../styles/styles";

function CadastroModelos() {
  const [onEdit, setOnEdit] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriaModalOpen, setCategoriaModalOpen] = useState(false);

  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome) {
      return toast.error("Preencha o título do modelo!");
    }
    if (!formData.descricao) {
      return toast.error("Preencha a descrição do modelo!");
    }
    const dimensaoRegex = /^\d+x\d+x\d+$/;
    if (!dimensaoRegex.test(formData.tamanho)) {
      return toast.error("Informe a dimensão no formato LxAxP (ex: 30x60x90)!");
    }
    if (!formData.idCategoria) {
      return toast.error("Selecione uma categoria!");
    }
    if (!formData.peso) {
      return toast.error("Preencha o peso do modelo!");
    }
    if (!formData.valor) {
      return toast.error("Preencha o preço do modelo!");
    }
    if (isNaN(formData.valor) || Number(formData.valor) <= 0) {
      return toast.error("O preço deve ser um número válido maior que 0!");
    }
    if (!formData.status) {
      return toast.error("Selecione um status!");
    }
    if (!formData.imagem1 || !formData.imagem2 || !formData.imagem3) {
      return toast.error("Faça o upload de pelo menos 3 imagens do modelo!");
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      await axios.post(`http://localhost:8800/modelos`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Modelo cadastrado com sucesso!");

      setFormData({
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
    } catch (error) {
      toast.error(`Erro na criação do modelo`);
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
              <ImageUploader
                key={num}
                num={num}
                modelo={formData}
                setModelo={setFormData}
              />
            ))}
          </Thumbnails>

          <UploadBox>
            <Carousel
              data-bs-theme="dark"
              style={{ width: "100%", height: "100%" }}
            >
              {[1, 2, 3].map((num) =>
                formData[`imagem${num}`] ? (
                  <Carousel.Item key={num}>
                    <img
                      src={URL.createObjectURL(formData[`imagem${num}`])}
                      alt={`Preview ${num}`}
                      style={{
                        width: "100%",
                        height: "600px",
                        objectFit: "cover",
                      }}
                    />
                  </Carousel.Item>
                ) : null
              )}
            </Carousel>
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
              <Label>Peso</Label>
              <Input
                placeholder="Kg"
                value={formData.peso}
                onChange={(e) =>
                  setFormData({ ...formData, peso: e.target.value })
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
        <ModalGeral
          open={categoriaModalOpen}
          onClose={() => setCategoriaModalOpen(false)}
          title="Cadastrar categoria"
          endpoint={"categorias"}
          getData={getCategorias}
          setOnEdit={setOnEdit}
          item={null}
          fields={[
            { name: "nome", label: "Nome categoria" },
            { name: "descricao", label: "Descrição" },
          ]}
        ></ModalGeral>
      </Content>
      <GlobalStyle />
    </PageContainer>
  );
}

export default CadastroModelos;
