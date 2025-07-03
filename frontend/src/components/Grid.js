import React from "react";
import styled from "styled-components";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0px 5px #ccc;
  max-width: 800px;
  margin: 20px auto;
  word-break: break-all;
`;

const Thead = styled.thead``;
const Tr = styled.thead`
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-bottom: inset;
`;
const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding: 10px;
`;

const Grid = () => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th>CPF</Th>
          <Th>Telefone</Th>
          <Th>Senha</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
    </Table>
  );
};

export default Grid;
