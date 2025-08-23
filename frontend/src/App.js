import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import Produtos from "./pages/Produtos";
import NavigationBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // importa o react-router-dom para navegação

// importa do styles.js

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/produtos" element={<Produtos />} />
      </Routes>
    </Router>
  );
}

export default App;
