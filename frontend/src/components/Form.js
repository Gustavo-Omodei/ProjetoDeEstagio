import React, { useRef } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
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

const Form = ({ onEdit }) => {
  const ref = useRef();

  return (
    <FormContainer ref={ref}>
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
