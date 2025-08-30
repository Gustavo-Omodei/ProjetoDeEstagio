import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  height: 100%;
  width: 100%;
  gap: 20px;
`;

export const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fff;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #ab8d69;
    box-shadow: 0 0 4px rgba(171, 141, 105, 0.4);
  }
`;

export const Button = styled.button`
  align-self: center;
  height: 42px;
  width: 50%;
  padding: 0 20px;
  background-color: #ab8d69;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #8e7554;
  }
`;
