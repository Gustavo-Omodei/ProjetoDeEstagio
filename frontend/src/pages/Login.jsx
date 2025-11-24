import { useState, useContext } from "react";
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

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Por favor, insira seu email.");
    if (!senha) return toast.error("Por favor, insira sua senha.");

    try {
      await login(email, senha);
      navigate("/");
    } catch (error) {
      toast.error(error.message); // ← mostra o erro certo
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
        <LoginTitle>Acesse sua conta</LoginTitle>

        <form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
          onSubmit={handleSubmit}
        >
          <LoginLabel>Email</LoginLabel>
          <LoginInput
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <LoginLabel>Senha</LoginLabel>
          <LoginInput
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <LoginButton type="submit">Entrar</LoginButton>
        </form>

        <SecondaryButton>Criar conta</SecondaryButton>
      </LoginCard>
    </LoginBackground>
  );
}

export default Login;
