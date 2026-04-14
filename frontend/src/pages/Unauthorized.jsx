import axios from "axios";
import { PageContainer, Layout, Button, Title } from "../styles/styles";
import { AuthContext } from "../context/AuthContext";
import { useState, useContext } from "react";
import GlobalStyle from "../styles/global";
import api from "../api/api";

export default function Unauthorized() {
  const [arquivo, setArquivo] = useState(null);

  return (
    <PageContainer>
      <Title> Acesso não autorizado</Title>

      <GlobalStyle></GlobalStyle>
    </PageContainer>
  );
}
