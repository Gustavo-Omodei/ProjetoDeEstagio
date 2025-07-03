import GlobalStyle from "./styles/global";
import { toast, ToastContainer } from "react-toastify";
import Form from "./components/Form";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import Grid from "./components/Grid";

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
  return (
    <>
      <Container>
        <Title>Projeto de Estágio</Title>
        <Form />
        <Grid />
        <ToastContainer autoClose={3000} position="bottom-left" />
        <GlobalStyle />
      </Container>
    </>
  );
}

export default App;
