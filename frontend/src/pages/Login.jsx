import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
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
  const [error, setError] = useState("");
  const { signInWithPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      await signInWithPassword(email, senha);
      toast.success("Login realizado com sucesso!");
      navigate("/");
    } catch (err) {
      setError("Falha no login. Verifique suas credenciais.");
      toast.error("Falha no login. Verifique suas credenciais.");
    }
  }

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
          onSubmit={handleLogin}
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

        <SecondaryButton onClick={() => navigate("/cadastro")}>
          Criar conta
        </SecondaryButton>
      </LoginCard>
    </LoginBackground>
  );
}

export default Login;
