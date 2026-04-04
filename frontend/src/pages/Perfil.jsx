import { useState, useContext, useEffect } from "react";
import { AuthContext, useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GlobalStyle from "../styles/global";
import api from "../api/api";
import {
  PageContainer,
  FormContainer,
  InputArea,
  Label,
  Input,
  Button,
} from "../styles/styles";

function Perfil() {
  const { user, updateUser } = useAuth();

  const [nome, setNome] = useState(user?.nome || "");
  const [cpf, setCPF] = useState(user?.cpf || "");
  const [telefone, setTelefone] = useState(user?.telefone || "");
  const [email, setEmail] = useState(user?.email || "");

  const navigate = useNavigate();

  useEffect(() => {
    console.log("User:", user);
    if (user) {
      setNome(user.nome || "");
      setEmail(user.email || "");
      setCPF(user.cpf || "");
      setTelefone(user.telefone || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Atualizando perfil com:", { nome, email, cpf, telefone });
    console.log("User ID:", user.id);

    if (!email) return toast.error("Por favor, insira seu email.");

    const payload = {
      nome: nome,
      email: email,
      cpf: cpf,
      telefone: telefone,
    };
    try {
      const response = await api.put(`/clientes/${user.id}`, payload);

      console.log("Resposta da API:", response);
      const updatedUser = response.data.user;
      updateUser(updatedUser);

      toast.success("Perfil atualizado!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!user) {
    return (
      <PageContainer>
        <h2>Você não está logado</h2>
        <Button onClick={() => navigate("/login")}>Ir para Login</Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1>Meu Perfil</h1>

      <FormContainer onSubmit={handleSubmit}>
        <InputArea>
          <Label>Nome</Label>
          <Input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </InputArea>

        <InputArea>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputArea>

        <InputArea>
          <Label>CPF</Label>
          <Input
            type="text"
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={(e) => setCPF(e.target.value)}
          />
        </InputArea>

        <InputArea>
          <Label>Telefone</Label>
          <Input
            type="text"
            placeholder="Digite seu telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </InputArea>

        <Button type="submit">Salvar alterações</Button>
      </FormContainer>
      <GlobalStyle />
    </PageContainer>
  );
}

export default Perfil;
