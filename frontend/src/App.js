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
}

export default App;
