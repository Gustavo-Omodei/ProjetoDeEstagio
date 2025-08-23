import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
  padding: 20px 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 30px;
`;

export const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 150px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  height: 36px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  align-self: flex-end;
  height: 42px;
  padding: 0 20px;
  background-color: #2c73d2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1a5cb0;
  }
`;
