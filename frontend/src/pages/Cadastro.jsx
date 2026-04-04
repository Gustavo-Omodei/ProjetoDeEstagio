import { useState } from "react";
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

function Cadastro() {
  const navigate = useNavigate();
  const { signInWithPassword } = useAuth();

  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleCPFChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 11);

    value = value
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    setCPF(value);
  };

  const handleTelefoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 11);

    value = value
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");

    setTelefone(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cpfLimpo = cpf.replace(/\D/g, "");
    const telefoneLimpo = telefone.replace(/\D/g, "");

    if (!email) return toast.error("Por favor, insira seu email.");
    if (!senha) return toast.error("Por favor, insira sua senha.");

    if (!/^\d{11}$/.test(cpfLimpo)) {
      return toast.error(
        "CPF inválido. Ele deve conter exatamente 11 dígitos.",
      );
    }

    if (!/^\d{11}$/.test(telefoneLimpo)) {
      return toast.error(
        "Telefone inválido. Informe DDD + 9 + número, com 11 dígitos.",
      );
    }

    if (!/^(\d{2})(9\d{8})$/.test(telefoneLimpo)) {
      return toast.error(
        "Telefone inválido. O celular deve conter DDD e começar com 9.",
      );
    }

    if (senha !== confirmarSenha) {
      return toast.error("As senhas não coincidem.");
    }

    try {
      const r = await fetch("http://localhost:8800/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, cpf, telefone, email, senha }),
      });

      if (!r.ok) {
        const err = await r.json();
        throw new Error(err.erro || "Erro ao cadastrar");
      }

      await r.json();
      await signInWithPassword(email, senha);
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
            required
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <LoginLabel>Email</LoginLabel>
          <LoginInput
            type="email"
            required
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <LoginLabel>CPF</LoginLabel>
          <LoginInput
            type="text"
            required
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={handleCPFChange}
            maxLength={14}
          />

          <LoginLabel>Telefone</LoginLabel>
          <LoginInput
            type="text"
            required
            placeholder="Digite seu telefone"
            value={telefone}
            onChange={handleTelefoneChange}
            maxLength={15}
          />

          <LoginLabel>Senha</LoginLabel>
          <LoginInput
            required
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <LoginLabel>Confirmar senha</LoginLabel>
          <LoginInput
            type="password"
            required
            placeholder="Digite sua senha novamente"
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
