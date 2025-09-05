import axios from "axios";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { Table, Tr, Thead, Tbody, Th, Td } from "../styles/styles";
import { useEffect, useState } from "react";

const Grid = ({
  data,
  setData,
  setOnEdit,
  endpoint,
  columns,
  tipo,
  handleEditar,
}) => {
  const [categorias, setCategorias] = useState({});

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
                  src={`http://localhost:8800${item.imagem1}`}
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

            {columns.map((col) => (
              <Td key={col.key}>
                {col.key === "idCategoria" ? (
                  categorias[item[col.key]] || item[col.key]
                ) : col.key === "codigoHex" ? (
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        backgroundColor: item[col.key],
                      }}
                    />
                    <span>{item[col.key]}</span>
                  </div>
                ) : (
                  item[col.key]
                )}
              </Td>
            ))}

            {/* Ícone de editar */}
            <Td>
              <FaPencilAlt
                style={{ cursor: "pointer", color: "black" }}
                onClick={() => handleEditar(tipo, item)}
              />
            </Td>
            <Td></Td>
            {/* Ícone de deletar */}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
