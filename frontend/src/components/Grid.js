import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { Table, Tr, Thead, Tbody, Th, Td } from "../styles/styles";

const Grid = ({ data, setData, setOnEdit, endpoint, columns }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/${endpoint}/${id}`);
      const newArray = data.filter((item) => item.id !== id);
      setData(newArray);
      toast.success("Item deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar item:", error);
      setOnEdit(null);
    }
  };

  return (
    <Table>
      <Thead>
        <Tr>
          {columns.map((col) => (
            <Th key={col.key}>{col.label}</Th>
          ))}
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item, i) => (
          <Tr key={i}>
            {columns.map((col) => (
              <Td key={col.key}>{item[col.key]}</Td>
            ))}
            <Td>
              <FaEdit>
                style={{ cursor: "pointer", color: "blue" }}
                onClick{() => setOnEdit(item)}
              </FaEdit>
            </Td>
            <Td>
              <FaTrash
                style={{ cursor: "pointer", color: "red" }}
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
