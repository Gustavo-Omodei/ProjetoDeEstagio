import styled from "styled-components";

export const FormContainer = styled.form`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  background-color: #fff;
  padding: 20px 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 30px;
  width: 50%;
`;

export const InputArea = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;
export const Select = styled.select`
  height: 36px;
  padding: 0 10px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  font-size: 14px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  height: 36px;
  padding: 0 10px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  align-self: flex-end;
  height: 42px;
  width: 200 px;
  padding: 0 20px;
  background-color: #ab8d69;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
`;
