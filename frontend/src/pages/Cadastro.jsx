import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import {
  LoginLabel,
  LoginInput,
  LoginBackground,
  LoginCard,
  LoginTitle,
  LoginButton,
  SecondaryButton,
} from "../styles/styles";
import { useNavigate } from "react-router-dom";

function Cadastro() {
  const navigate = useNavigate();
  const { token, login } = useContext(AuthContext);
  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Por favor, insira seu email.");
    if (!senha) return toast.error("Por favor, insira sua senha.");

    try {
      const r = await fetch("http://localhost:8800/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, cpf, telefone, email, senha }),
      });

      if (!r.ok) {
        const err = await r.json();
        throw new Error(err.erro || "Erro ao fazer login");
      }

      const data = await r.json();

      login(data.user, data.token);

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <LoginBackground>
      <img
        src={"../assets/Logo.png"}
        alt="Logo"
        style={{
          position: "absolute",
          top: "25px",
          left: "35px",
          width: "180px",
          objectFit: "contain",
        }}
      />
      <LoginCard>
        <LoginTitle>Crie sua conta</LoginTitle>

        <form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
          onSubmit={handleSubmit}
        >
          <LoginLabel>Nome</LoginLabel>
          <LoginInput
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <LoginLabel>Email</LoginLabel>
          <LoginInput
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <LoginLabel>CPF</LoginLabel>
          <LoginInput
            type="text"
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={(e) => setCPF(e.target.value)}
          />
          <LoginLabel>Telefone</LoginLabel>
          <LoginInput
            type="text"
            placeholder="Digite seu telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
          <LoginLabel>Senha</LoginLabel>
          <LoginInput
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <LoginLabel>Confirmar senha</LoginLabel>
          <LoginInput
            type="password"
            placeholder="Digite sua senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />

          <LoginButton type="submit">Criar conta</LoginButton>
        </form>

        <SecondaryButton onClick={() => navigate("/login")}>
          Já tem uma conta? Entrar
        </SecondaryButton>
      </LoginCard>
    </LoginBackground>
  );
}

export default Cadastro;
