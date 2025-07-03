import React from "react";
import styled from "styled-components";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import setUsers from "../App";
import setOnEdit from "../App";

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
const Tr = styled.tr`
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-bottom: inset;
`;

const Thead = styled.thead``;

const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding: 10px;
`;
const Td = styled.td`
  padding-top: 10px;
  text-align: center;
  width: auto;
`;

const Tbody = styled.tbody``;

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:8800/clientes/${id}`)
      .then(({ data }) => {
        const newArray = users.filter((item) => item.id !== id);

        setUsers(newArray);
        toast.success("Usuário deletado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao deletar usuário:", error);
        setOnEdit(null);
      });
  };

  const handleEdit = (item) => {
    setOnEdit(item);
  };

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
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td>{item.nome}</Td>
            <Td>{item.email}</Td>
            <Td>{item.cpf}</Td>
            <Td>{item.telefone}</Td>
            <Td>{item.senha}</Td>
            <Td>
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td>
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
