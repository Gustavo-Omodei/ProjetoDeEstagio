import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { useContext, useEffect, useState } from 'react'
import { AuthContext, useAuth } from '../context/AuthContext'
import SearchBar from './SearchBar'
import api from '../api/api'

function NavigationBar() {
  const { user } = useAuth()
  const { logout } = useContext(AuthContext)
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    async function fetchProdutos() {
      console.log(user)
      try {
        const resp = await api.get('/modelos')
        setProdutos(resp.data)
      } catch (e) {
        console.error('Erro ao buscar produtos:', e)
      }
    }

    fetchProdutos()
  }, [])

  return (
    <Navbar expand="lg" bg="white" className="shadow-sm py-2">
      <Container fluid className="px-3 px-md-4">
        <Navbar.Brand as={Link} to="/">
          <img src="/assets/logo.png" alt="Logo" style={{ height: '40px' }} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex align-items-lg-center gap-lg-2">
            {user?.role === 'admin' ? (
              // Admin
              <>
                {/* Dropdown de Modelos */}
                <Dropdown>
                  <Dropdown.Toggle
                    style={{
                      backgroundColor: '#fff',
                      color: '#000',
                      fontWeight: 'bold',
                      border: 'none',
                    }}
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
                {/* Dropdown pedidos */}
                <Dropdown>
                  <Dropdown.Toggle
                    style={{
                      backgroundColor: '#fff',
                      color: '#000',
                      fontWeight: 'bold',
                      border: 'none',
                    }}
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
              </>
            ) : (
              <>
                {/* Clientes */}
                <Dropdown>
                  <Dropdown.Toggle
                    style={{
                      backgroundColor: '#fff',
                      color: '#000',
                      fontWeight: 'bold',
                      border: 'none',
                    }}
                  >
                    Categorias
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/cadastroModelos">
                      Cabeceiras
                    </Dropdown.Item>{' '}
                    <Dropdown.Item href="/cadastroModelos">Divãs</Dropdown.Item>
                    <Dropdown.Item href="/listaModelos">
                      Poltronas
                    </Dropdown.Item>
                    <Dropdown.Item href="/cores&tecidos">Sofás</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </Nav>

          <div className="my-3 my-lg-0 mx-lg-3 flex-grow-1">
            <SearchBar produtos={produtos} />
          </div>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <Link
              to="/carrinho"
              className="text-center"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div>
                <FaShoppingCart size={20} />
                <div style={{ fontSize: '14px' }}>Meu carrinho</div>
              </div>
            </Link>

            <Dropdown align="end">
              <Dropdown.Toggle
                style={{
                  backgroundColor: '#fff',
                  fontWeight: 'bold',
                  border: 'none',
                  padding: 0,
                }}
                variant="success"
                id="dropdown-user"
              >
                <img
                  src="/assets/avatar.png"
                  alt="User"
                  style={{
                    width: '35px',
                    height: '35px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              </Dropdown.Toggle>

              {user ? (
                <Dropdown.Menu className="user-dropdown-menu">
                  <Dropdown.Item as={Link} to="/perfil">
                    Minha conta
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/meusPedidos">
                    Meus pedidos
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
                </Dropdown.Menu>
              ) : (
                <Dropdown.Menu className="user-dropdown-menu">
                  <Dropdown.Item as={Link} to="/login">
                    Login
                  </Dropdown.Item>
                </Dropdown.Menu>
              )}
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
