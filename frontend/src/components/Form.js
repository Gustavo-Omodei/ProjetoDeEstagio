import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0px 5px #ccc;
  border-radius: 5px;
`;
const InputArea = styled.div`
  flex-direction: column;
`;
const Label = styled.label`
  padding: 5px;
`;

const Input = styled.input`
  width: 120px;
  height: 40px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  margin-right: 10px;
`;

const Button = styled.button`
  background-color: #2c73d2;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 42px;
`;

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
        .then(({ data }) => toast.success(data))
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
        .then(({ data }) => toast.success(data))
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
