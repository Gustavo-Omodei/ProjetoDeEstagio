import { Container, Title } from "../styles/styles";
import { toast } from "react-toastify";
import Grid from "../components/Grid";
import Form from "../components/Form";

import { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "../styles/global";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getProdutos = async () => {
    try {
      const res = await axios.get("http://localhost:8800/produtos");
      setProdutos(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error("Erro ao buscar produtos");
    }
  };

  useEffect(() => {
    getProdutos();
  }, [setProdutos]);

  return (
    <>
      <Container>
        <Title>CRUD de Produtos</Title>
        <Form
          onEdit={onEdit}
          setOnEdit={setOnEdit}
          getData={getProdutos}
          endpoint="produtos"
          fields={[
            { name: "nome", label: "Nome", placeholder: "Digite o nome" },
            { name: "valor", label: "Valor", placeholder: "Digite o valor" },
            {
              name: "tamanho",
              label: "Tamanho",
              placeholder: "Digite o tamanho",
            },
            { key: "idModelo", label: "ID do Modelo" },
          ]}
        />
        <Grid
          data={produtos}
          setData={setProdutos}
          setOnEdit={setOnEdit}
          endpoint="produtos"
          columns={[
            { key: "nomeProduto", label: "Nome" },
            { key: "valor", label: "Valor" },
            { key: "tamanho", label: "Tamanho" },
            { key: "idModelo", label: "ID do Modelo" },
          ]}
        />
        <GlobalStyle />
      </Container>
    </>
  );
}

export default Produtos;
