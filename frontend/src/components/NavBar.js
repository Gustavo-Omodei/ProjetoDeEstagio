import { Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";

function NavigationBar() {
  return (
    <Navbar expand="lg" bg="white" className="shadow-sm py-2">
      <Container>
        {/* ESQUERDA: Logo + Menus */}
        <div className="d-flex align-items-center justify-content-start">
          <Navbar.Brand as={Link} to="/">
            <img src="/assets/logo.png" alt="Logo" style={{ height: "40px" }} />
          </Navbar.Brand>
          <Nav className="ms-3">
            {/* <Nav.Link as={Link} to="/">
              Poltronas
            </Nav.Link> */}
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
            <Nav.Link as={Link} to="/clientes">
              Clientes
            </Nav.Link>
          </Nav>
        </div>

        {/* CENTRO: Barra de pesquisa */}
        <div className="flex-grow-1 d-flex justify-content-center">
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
        </div>

        {/* DIREITA: Favoritos, Carrinho, Avatar */}
        <div className="d-flex align-items-center gap-4">
          <div className="text-center">
            <FaHeart size={20} />
            <div style={{ fontSize: "12px" }}>Favoritos</div>
          </div>
          <div className="text-center">
            <FaShoppingCart size={20} />
            <div style={{ fontSize: "12px" }}>Meu carrinho</div>
          </div>
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
        </div>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
