import React, { useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FormContainer,
  InputArea,
  Label,
  Input,
  Button,
} from "../styles/styles";

const Form = ({ onEdit, setOnEdit, getUsers }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.cpf.value = onEdit.cpf;
      user.telefone.value = onEdit.telefone;
      user.senha.value = onEdit.senha;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.email.value ||
      !user.cpf.value ||
      !user.telefone.value ||
      !user.senha.value
    ) {
      toast.error("Preencha todos os campos!");
      return;
    }

    if (onEdit) {
      await axios
        .put(`http://localhost:8800/clientes/${onEdit.id}`, {
          nome: user.nome.value,
          email: user.email.value,
          cpf: user.cpf.value,
          telefone: user.telefone.value,
          senha: user.senha.value,
        })
        .then(({ data }) => toast.success("Usuário editado com sucesso!", data))
        .catch((data) => {
          console.error("Erro ao atualizar usuário:", data);
          toast.error("Erro ao atualizar usuário");
        });
    } else {
      await axios
        .post("http://localhost:8800/clientes", {
          nome: user.nome.value,
          email: user.email.value,
          cpf: user.cpf.value,
          telefone: user.telefone.value,
          senha: user.senha.value,
        })
        .then(({ data }) => toast.success("Usuário criado com sucesso!", data))
        .catch((data) => {
          console.error("Erro ao criar usuário:", data);
          toast.error("Erro ao criar usuário");
        });
    }

    user.nome.value = "";
    user.email.value = "";
    user.cpf.value = "";
    user.telefone.value = "";
    user.senha.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
        <Label>Email</Label>
        <Input name="email" />
        <Label>CPF</Label>
        <Input name="cpf" />
        <Label>Telefone</Label>
        <Input name="telefone" />
        <Label>Senha</Label>
        <Input name="senha" type="password" />
      </InputArea>
      <Button type="submit">Salvar</Button>
    </FormContainer>
  );
};
export default Form;
