import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import Produtos from "./pages/Produtos";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // importa o react-router-dom para navegação

// importa do styles.js

function App() {
  return (
    <Router>
      <nav
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          backgroundColor: "#fff",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/clientes">Clientes</Link>
        <Link to="/produtos">Produtos</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/produtos" element={<Produtos />} />
      </Routes>
    </Router>
  );
  // const [users, setUsers] = useState([]);
  // const [onEdit, setOnEdit] = useState(null);

  // const getUsers = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:8800/clientes");
  //     setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
  //   } catch (error) {
  //     toast.error("Erro ao buscar usuários");
  //   }
  // };

  // useEffect(() => {
  //   getUsers();
  // }, [setUsers]);

  // return (
  //   <>
  //     <Container>
  //       <Title>CRUD de Clientes</Title>
  //       <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
  //       <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
  //       <ToastContainer autoClose={3000} position="bottom-left" />
  //       <GlobalStyle />
  //     </Container>
  //   </>
  // );
}

export default App;
