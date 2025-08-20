import GlobalStyle from "./styles/global";
import { toast, ToastContainer } from "react-toastify";
import Form from "./components/Form";
import Grid from "./components/Grid";
import { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

// importa do styles.js
import { Container, Title } from "./styles/styles";

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
        <Title>CRUD de Clientes</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
        <ToastContainer autoClose={3000} position="bottom-left" />
        <GlobalStyle />
      </Container>
    </>
  );
}

export default App;
