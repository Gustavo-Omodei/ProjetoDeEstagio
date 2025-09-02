import axios from "axios";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { Table, Tr, Thead, Tbody, Th, Td } from "./GridStyle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Grid = ({ data, setData, setOnEdit, endpoint, columns }) => {
  const [categorias, setCategorias] = useState({});
  const navigate = useNavigate();

  // Buscar categorias só uma vez
  useEffect(() => {
    axios
      .get("http://localhost:8800/categorias")
      .then((res) => {
        const map = {};
        res.data.forEach((cat) => {
          map[cat.id] = cat.nome;
        });
        setCategorias(map);
      })
      .catch((err) => {
        console.error("Erro ao carregar categorias:", err);
      });
  }, []);

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
          {/* primeira coluna (imagem) */}
          <Th></Th>
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
            {/* imagem do produto */}
            <Td>
              {item.imagem1 && (
                <img
                  src={`http://localhost:8800${item.imagem1}`} // usa a URL completa
                  alt={item.nome}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}
            </Td>

            {/* demais colunas */}
            {columns.map((col) => (
              <Td key={col.key}>
                {col.key === "idCategoria"
                  ? categorias[item[col.key]] || item[col.key] // mostra nome da categoria, senão ID
                  : item[col.key]}
              </Td>
            ))}
            <Td>
              <FaPencilAlt
                style={{ cursor: "pointer", color: "black" }}
                onClick={() => navigate(`/editarModelo/${item.id}`)}
              />
            </Td>
            <Td></Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
