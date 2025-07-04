import React from "react";
import styled from "styled-components";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { Table, Tr, Thead, Tbody, Th, Td } from "../styles/styles";

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
            <Td>
              <FaEdit
                style={{
                  cursor: "pointer",
                  color: "blue",
                  alignContent: "start",
                }}
                onClick={() => handleEdit(item)}
              />
            </Td>
            <Td>
              <FaTrash
                style={{
                  cursor: "pointer",
                  color: "red",
                  alignContent: "center",
                }}
                onClick={() => handleDelete(item.id)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
