import GlobalStyle from "./styles/global";
import { toast, ToastContainer } from "react-toastify";
import Form from "./components/Form";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import Grid from "./components/Grid";
import { useState, useEffect } from "react";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
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
        <Title>Projeto de Estágio</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
        <ToastContainer autoClose={3000} position="bottom-left" />
        <GlobalStyle />
      </Container>
    </>
  );
}

export default App;
