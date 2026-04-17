import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
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
  const navigate = useNavigate();

  const [enderecoAberto, setEnderecoAberto] = useState(null);
  const [nome, setNome] = useState("");
  const [mostrarEnderecos, setMostrarEnderecos] = useState(false);
  const [mostrarNovoEndereco, setMostrarNovoEndereco] = useState(false);
  const [cpf, setCPF] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [enderecos, setEnderecos] = useState([]);

  const [novoEndereco, setNovoEndereco] = useState({
    cep: "",
    rua: "",
    bairro: "",
    numero: "",
    complemento: "",
    cidade: "",
    estado: "",
    pais: "",
  });

  const onlyNumbers = (value) => value.replace(/\D/g, "");

  const formatCPF = (value) => {
    const numbers = onlyNumbers(value).slice(0, 11);

    return numbers
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  };

  const formatTelefone = (value) => {
    const numbers = onlyNumbers(value).slice(0, 11);

    if (numbers.length <= 10) {
      return numbers
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return numbers
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  };

  const formatCEP = (value) => {
    const numbers = onlyNumbers(value).slice(0, 8);
    return numbers.replace(/^(\d{5})(\d)/, "$1-$2");
  };

  const normalizeEmail = (value) => value.trim().toLowerCase();

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const isValidCPF = (value) => {
    const cpfLimpo = onlyNumbers(value);

    if (cpfLimpo.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpfLimpo)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += Number(cpfLimpo.charAt(i)) * (10 - i);
    }

    let resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== Number(cpfLimpo.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += Number(cpfLimpo.charAt(i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== Number(cpfLimpo.charAt(10))) return false;

    return true;
  };

  const isValidTelefone = (value) => {
    const telefoneLimpo = onlyNumbers(value);
    return telefoneLimpo.length === 10 || telefoneLimpo.length === 11;
  };

  const isValidCEP = (value) => {
    return onlyNumbers(value).length === 8;
  };

  const carregarEnderecos = useCallback(async () => {
    if (!user) return;

    try {
      const response = await api.get(`/clientes/${user.id}/enderecos`);
      setEnderecos(response.data.Enderecos || []);
    } catch (e) {
      console.log("Erro:", e.response?.data || e.message);
      setEnderecos([]);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    setNome(user.nome || "");
    setEmail(user.email || "");
    setCPF(user.cpf ? formatCPF(user.cpf) : "");
    setTelefone(user.telefone ? formatTelefone(user.telefone) : "");
  }, [user]);

  useEffect(() => {
    carregarEnderecos();
  }, [carregarEnderecos]);

  function handleEnderecoChange(index, field, value) {
    let newValue = value;

    if (field === "cep") {
      newValue = formatCEP(value);
    }

    if (field === "numero") {
      newValue = onlyNumbers(value).slice(0, 10);
    }

    setEnderecos((prev) =>
      prev.map((endereco, i) =>
        i === index ? { ...endereco, [field]: newValue } : endereco,
      ),
    );
  }

  function handleNovoEnderecoChange(field, value) {
    let newValue = value;

    if (field === "cep") {
      newValue = formatCEP(value);
    }

    if (field === "numero") {
      newValue = onlyNumbers(value).slice(0, 10);
    }

    setNovoEndereco((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  }

  async function salvarEndereco(index) {
    try {
      const endereco = enderecos[index];

      if (!endereco.rua?.trim()) {
        return toast.error("Informe a rua do endereço.");
      }

      if (!endereco.bairro?.trim()) {
        return toast.error("Informe o bairro do endereço.");
      }

      if (!endereco.numero?.trim()) {
        return toast.error("Informe o número do endereço.");
      }

      if (!endereco.cidade?.trim()) {
        return toast.error("Informe a cidade do endereço.");
      }

      if (!endereco.estado?.trim()) {
        return toast.error("Informe o estado do endereço.");
      }

      if (endereco.cep && !isValidCEP(endereco.cep)) {
        return toast.error("CEP inválido.");
      }

      await api.put(`/enderecos/${endereco.id}`, {
        ...endereco,
        cep: onlyNumbers(endereco.cep || ""),
      });

      await carregarEnderecos();

      toast.success(`Endereço ${index + 1} atualizado com sucesso`);
    } catch (error) {
      toast.error("Erro ao salvar endereço");
      console.log(error.response?.data || error.message);
    }
  }

  async function cadastrarNovoEndereco() {
    try {
      if (!novoEndereco.rua.trim()) {
        return toast.error("Informe a rua.");
      }

      if (!novoEndereco.bairro.trim()) {
        return toast.error("Informe o bairro.");
      }

      if (!novoEndereco.numero.trim()) {
        return toast.error("Informe o número.");
      }

      if (!novoEndereco.cidade.trim()) {
        return toast.error("Informe a cidade.");
      }

      if (!novoEndereco.estado.trim()) {
        return toast.error("Informe o estado.");
      }

      if (novoEndereco.cep && !isValidCEP(novoEndereco.cep)) {
        return toast.error("CEP inválido.");
      }

      await api.post(`/clientes/endereco`, {
        idCliente: user.id,
        cep: onlyNumbers(novoEndereco.cep),
        rua: novoEndereco.rua.trim(),
        bairro: novoEndereco.bairro.trim(),
        numero: novoEndereco.numero.trim(),
        complemento: novoEndereco.complemento.trim(),
        cidade: novoEndereco.cidade.trim(),
        estado: novoEndereco.estado.trim(),
        pais: novoEndereco.pais.trim(),
      });

      await carregarEnderecos();

      setNovoEndereco({
        cep: "",
        rua: "",
        bairro: "",
        numero: "",
        complemento: "",
        cidade: "",
        estado: "",
        pais: "",
      });

      setMostrarNovoEndereco(false);
      toast.success("Endereço cadastrado com sucesso");
    } catch (error) {
      toast.error("Erro ao cadastrar endereço");
      console.log(error.response?.data || error.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailNormalizado = normalizeEmail(email);

    if (!nome.trim()) {
      return toast.error("Por favor, insira seu nome.");
    }

    if (!emailNormalizado) {
      return toast.error("Por favor, insira seu email.");
    }

    if (!isValidEmail(emailNormalizado)) {
      return toast.error("Email inválido.");
    }

    if (cpf && !isValidCPF(cpf)) {
      return toast.error("CPF inválido.");
    }

    if (telefone && !isValidTelefone(telefone)) {
      return toast.error("Telefone inválido.");
    }

    const payload = {
      nome: nome.trim(),
      email: emailNormalizado,
      cpf: onlyNumbers(cpf),
      telefone: onlyNumbers(telefone),
    };

    try {
      const response = await api.put(`/clientes/${user.id}`, payload);

      const updatedUser = response.data.user || response.data;
      updateUser(updatedUser);

      toast.success("Perfil atualizado!");
    } catch (error) {
      toast.error("Erro ao atualizar perfil");
      console.log(error.response?.data || error.message);
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
            onBlur={() => setEmail((prev) => normalizeEmail(prev))}
          />
        </InputArea>

        <InputArea>
          <Label>CPF</Label>
          <Input
            type="text"
            placeholder="Digite seu CPF"
            value={cpf}
            maxLength={14}
            onChange={(e) => setCPF(formatCPF(e.target.value))}
          />
        </InputArea>

        <InputArea>
          <Label>Telefone</Label>
          <Input
            type="text"
            placeholder="Digite seu telefone"
            value={telefone}
            maxLength={15}
            onChange={(e) => setTelefone(formatTelefone(e.target.value))}
          />
        </InputArea>

        <Button type="submit">Salvar alterações</Button>
      </FormContainer>

      <div style={{ marginTop: 30 }}>
        <div
          onClick={() => setMostrarEnderecos(!mostrarEnderecos)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            padding: "14px 16px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            background: "#f8f8f8",
            marginBottom: 12,
          }}
        >
          <h2 style={{ margin: 0, fontSize: "20px" }}>Meus endereços</h2>
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>
            {mostrarEnderecos ? "−" : "+"}
          </span>
        </div>

        {mostrarEnderecos && (
          <>
            <Button
              type="button"
              onClick={() => setMostrarNovoEndereco(!mostrarNovoEndereco)}
              style={{ marginBottom: 16 }}
            >
              {mostrarNovoEndereco
                ? "Cancelar novo endereço"
                : "Adicionar novo endereço"}
            </Button>

            {mostrarNovoEndereco && (
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "16px",
                  background: "#fafafa",
                }}
              >
                <div style={{ marginBottom: 10 }}>
                  <strong>Novo endereço</strong>
                </div>

                <InputArea>
                  <Label>CEP</Label>
                  <Input
                    type="text"
                    value={novoEndereco.cep}
                    maxLength={9}
                    onChange={(e) =>
                      handleNovoEnderecoChange("cep", e.target.value)
                    }
                  />
                </InputArea>

                <InputArea>
                  <Label>Rua</Label>
                  <Input
                    type="text"
                    value={novoEndereco.rua}
                    onChange={(e) =>
                      handleNovoEnderecoChange("rua", e.target.value)
                    }
                  />
                </InputArea>

                <InputArea>
                  <Label>Bairro</Label>
                  <Input
                    type="text"
                    value={novoEndereco.bairro}
                    onChange={(e) =>
                      handleNovoEnderecoChange("bairro", e.target.value)
                    }
                  />
                </InputArea>

                <InputArea>
                  <Label>Número</Label>
                  <Input
                    type="text"
                    value={novoEndereco.numero}
                    onChange={(e) =>
                      handleNovoEnderecoChange("numero", e.target.value)
                    }
                  />
                </InputArea>

                <InputArea>
                  <Label>Complemento</Label>
                  <Input
                    type="text"
                    value={novoEndereco.complemento}
                    onChange={(e) =>
                      handleNovoEnderecoChange("complemento", e.target.value)
                    }
                  />
                </InputArea>

                <InputArea>
                  <Label>Cidade</Label>
                  <Input
                    type="text"
                    value={novoEndereco.cidade}
                    onChange={(e) =>
                      handleNovoEnderecoChange("cidade", e.target.value)
                    }
                  />
                </InputArea>

                <InputArea>
                  <Label>Estado</Label>
                  <Input
                    type="text"
                    value={novoEndereco.estado}
                    maxLength={2}
                    onChange={(e) =>
                      handleNovoEnderecoChange(
                        "estado",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                </InputArea>

                <InputArea>
                  <Label>País</Label>
                  <Input
                    type="text"
                    value={novoEndereco.pais}
                    onChange={(e) =>
                      handleNovoEnderecoChange("pais", e.target.value)
                    }
                  />
                </InputArea>

                <Button
                  type="button"
                  onClick={cadastrarNovoEndereco}
                  style={{ marginTop: 10 }}
                >
                  Cadastrar endereço
                </Button>
              </div>
            )}

            {enderecos.length === 0 ? (
              <p>Nenhum endereço cadastrado.</p>
            ) : (
              enderecos.map((endereco, index) => {
                const aberto = enderecoAberto === index;

                return (
                  <div
                    key={endereco.id || index}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      marginBottom: "16px",
                      overflow: "hidden",
                      background: "#fff",
                    }}
                  >
                    <div
                      onClick={() => setEnderecoAberto(aberto ? null : index)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "16px",
                        cursor: "pointer",
                        background: "#fafafa",
                      }}
                    >
                      <div>
                        <strong>Endereço {index + 1}</strong>
                        <div
                          style={{
                            fontSize: "14px",
                            color: "#666",
                            marginTop: 4,
                          }}
                        >
                          {endereco.rua || "Rua não informada"},{" "}
                          {endereco.numero || "s/n"} -{" "}
                          {endereco.bairro || "Sem bairro"}
                        </div>
                      </div>

                      <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                        {aberto ? "−" : "+"}
                      </span>
                    </div>

                    {aberto && (
                      <div style={{ padding: "16px" }}>
                        <InputArea>
                          <Label>CEP</Label>
                          <Input
                            type="text"
                            value={formatCEP(endereco.cep || "")}
                            maxLength={9}
                            onChange={(e) =>
                              handleEnderecoChange(index, "cep", e.target.value)
                            }
                          />
                        </InputArea>

                        <InputArea>
                          <Label>Rua</Label>
                          <Input
                            type="text"
                            value={endereco.rua || ""}
                            onChange={(e) =>
                              handleEnderecoChange(index, "rua", e.target.value)
                            }
                          />
                        </InputArea>

                        <InputArea>
                          <Label>Bairro</Label>
                          <Input
                            type="text"
                            value={endereco.bairro || ""}
                            onChange={(e) =>
                              handleEnderecoChange(
                                index,
                                "bairro",
                                e.target.value,
                              )
                            }
                          />
                        </InputArea>

                        <InputArea>
                          <Label>Número</Label>
                          <Input
                            type="text"
                            value={endereco.numero || ""}
                            onChange={(e) =>
                              handleEnderecoChange(
                                index,
                                "numero",
                                e.target.value,
                              )
                            }
                          />
                        </InputArea>

                        <InputArea>
                          <Label>Complemento</Label>
                          <Input
                            type="text"
                            value={endereco.complemento || ""}
                            onChange={(e) =>
                              handleEnderecoChange(
                                index,
                                "complemento",
                                e.target.value,
                              )
                            }
                          />
                        </InputArea>

                        <InputArea>
                          <Label>Cidade</Label>
                          <Input
                            type="text"
                            value={endereco.cidade || ""}
                            onChange={(e) =>
                              handleEnderecoChange(
                                index,
                                "cidade",
                                e.target.value,
                              )
                            }
                          />
                        </InputArea>

                        <InputArea>
                          <Label>Estado</Label>
                          <Input
                            type="text"
                            value={endereco.estado || ""}
                            maxLength={2}
                            onChange={(e) =>
                              handleEnderecoChange(
                                index,
                                "estado",
                                e.target.value.toUpperCase(),
                              )
                            }
                          />
                        </InputArea>

                        <InputArea>
                          <Label>País</Label>
                          <Input
                            type="text"
                            value={endereco.pais || ""}
                            onChange={(e) =>
                              handleEnderecoChange(
                                index,
                                "pais",
                                e.target.value,
                              )
                            }
                          />
                        </InputArea>

                        <Button
                          type="button"
                          onClick={() => salvarEndereco(index)}
                          style={{ width: "100%", marginTop: 10 }}
                        >
                          Salvar endereço
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </>
        )}
      </div>

      <GlobalStyle />
    </PageContainer>
  );
}

export default Perfil;
