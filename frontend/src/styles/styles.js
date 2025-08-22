import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

export const Table = styled.table`
  width: 100%;
  max-width: 900px;
  background-color: #fff;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
`;

export const Thead = styled.thead`
  background-color: #2c73d2;
  color: white;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
`;

export const Th = styled.th`
  padding: 12px;
  text-align: left;
`;

export const Td = styled.td`
  padding: 12px;
  text-align: left;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: start;
`;

export const IconButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transition: transform 0.2s;
  }

  &:hover svg {
    transform: scale(1.2);
  }
`;
