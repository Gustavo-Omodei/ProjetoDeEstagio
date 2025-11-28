import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GlobalStyle from "../styles/global";
import {
  PageContainer,
  FormContainer,
  InputArea,
  Label,
  Input,
  Button,
} from "../styles/styles";

function Perfil() {
  const { user } = useContext(AuthContext);

  const [nome, setNome] = useState(user?.nome || "");
  const [cpf, setCPF] = useState(user?.cpf || "");
  const [telefone, setTelefone] = useState(user?.telefone || "");
  const [email, setEmail] = useState(user?.email || "");

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setNome(user.nome || "");
      setEmail(user.email || "");
      setCPF(user.cpf || "");
      setTelefone(user.telefone || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Por favor, insira seu email.");

    try {
      const r = await fetch(`http://localhost:8800/clientes/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, cpf, telefone, email }),
      });

      if (!r.ok) {
        const err = await r.json();
        throw new Error(err.erro || "Erro ao atualizar perfil");
      }

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
