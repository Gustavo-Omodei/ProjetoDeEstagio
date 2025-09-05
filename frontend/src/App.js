import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import CadastroModelos from "./pages/Modelos/CadastroModelos";
import CoresETecidos from "./pages/Cores&Tecidos";
import ListaModelos from "./pages/Modelos/ListaModelos";
import EditarModelo from "./pages/Modelos/EditarModelos";
import NavigationBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // importa o react-router-dom para navegação
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";

// importa do styles.js

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/cadastroModelos" element={<CadastroModelos />} />
        <Route path="/listaModelos" element={<ListaModelos />} />
        <Route path="/cores&tecidos" element={<CoresETecidos />} />
        <Route path="/editarModelo/:id" element={<EditarModelo />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </Router>
  );
}

export default App;
