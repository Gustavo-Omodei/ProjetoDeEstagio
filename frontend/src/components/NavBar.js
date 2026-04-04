import { Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import SearchBar from "./SearchBar";
import api from "../api/api";

function NavigationBar() {
  const { user, logout } = useContext(AuthContext);
  const [produtos, setProdutos] = useState([]);
  useEffect(() => {
    async function fetchProdutos() {
      try {
        const resp = await api.get("/modelos");
        setProdutos(resp.data);
        console.log("Produtos carregados:", resp);
      } catch (e) {
        console.error("Erro ao buscar produtos:", e);
      }
    }

    fetchProdutos();
  }, []);

  return (
    <Navbar expand="lg" bg="white" className="shadow-sm py-2">
      <Container>
        <div className="d-flex align-items-center justify-content-start">
          <Navbar.Brand as={Link} to="/">
            <img src="/assets/logo.png" alt="Logo" style={{ height: "40px" }} />
          </Navbar.Brand>
          <Nav className="ms-3">
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  backgroundColor: "#ffff",
                  color: "#000",
                  fontWeight: "bold",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 12px",
                }}
                variant="success"
                id="dropdown-basic"
              >
                Modelos
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/cadastroModelos">
                  Cadastrar modelos
                </Dropdown.Item>
                <Dropdown.Item href="/listaModelos">
                  Lista de modelos
                </Dropdown.Item>
                <Dropdown.Item href="/cores&tecidos">
                  Cores e tecidos
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  backgroundColor: "#ffff",
                  color: "#000",
                  fontWeight: "bold",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 12px",
                }}
                variant="success"
                id="dropdown-basic"
              >
                Pedidos
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/todosPedidos">
                  Lista de pedidos
                </Dropdown.Item>
                <Dropdown.Item href="/tabelaFrete">
                  Tabela de frete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>

        {/* <div className="flex-grow-1 d-flex justify-content-center">
          <div
            className="d-flex align-items-center px-3"
            style={{
              background: "transparent",
              borderRadius: "20px",
              width: "60%",
              border: "1px solid #8C8C8C",
            }}
          >
            <FaSearch style={{ color: "#8C8C8C", marginRight: "8px" }} />
            <input
              type="text"
              placeholder="Pesquisar..."
              style={{
                border: "none",
                backgroundColor: "transparent",
                color: "#8C8C8C",
                outline: "none",
                width: "100%",
                height: "30px",
              }}
            />
          </div>
        </div> */}
        <SearchBar produtos={produtos}></SearchBar>

        <div className="d-flex align-items-center gap-4">
          <Link
            to={"/carrinho"}
            className="text-center"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div>
              <FaShoppingCart size={20} />
              <div style={{ fontSize: "12px" }}>Meu carrinho</div>
            </div>
          </Link>
          <Dropdown>
            <Dropdown.Toggle
              style={{
                backgroundColor: "#ffff",
                fontWeight: "bold",
                border: "none",
                alignItems: "center",
              }}
              variant="success"
              id="dropdown-basic"
            >
              <img
                src="/assets/avatar.png"
                alt="User"
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/perfil">Minha conta</Dropdown.Item>
              <Dropdown.Item href="/meusPedidos">Meus pedidos</Dropdown.Item>
              <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
