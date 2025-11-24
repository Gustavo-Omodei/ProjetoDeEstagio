import { Container, Title } from "../styles/styles";
import { toast, ToastContainer } from "react-toastify";
import Form from "../components/Form";
import Grid from "../components/Grid";
import { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "../styles/global";

function Clientes() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800/clientes");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error("Erro ao buscar usuários");
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Container>
        <Title>CRUD de Clientes</Title>
        <Form
          onEdit={onEdit}
          setOnEdit={setOnEdit}
          getData={getUsers}
          endpoint="clientes"
          fields={[
            { name: "nome", label: "Nome", placeholder: "Digite o nome" },
            { name: "email", label: "Email", placeholder: "Digite o email" },
            { name: "cpf", label: "CPF", placeholder: "Digite o CPF" },
            {
              name: "telefone",
              label: "Telefone",
              placeholder: "Digite o telefone",
            },
            {
              name: "senha",
              label: "Senha",
              placeholder: "Digite a senha",
              type: "password",
            },
          ]}
        />
        <ToastContainer autoClose={3000} position="bottom-left" />
        <GlobalStyle />
      </Container>
    </>
  );
}

export default Clientes;
