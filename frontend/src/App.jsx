import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Produto from "./pages/Produto";
import CadastroModelos from "./pages/Modelos/CadastroModelos";
import CoresETecidos from "./pages/Cores&Tecidos";
import ListaModelos from "./pages/Modelos/ListaModelos";
import EditarModelo from "./pages/Modelos/EditarModelos";
import Perfil from "./pages/Perfil";
import Carrinho from "./pages/Carrinho";
import NavigationBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./context/AuthContext";

function AppContent() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login";
  const hideLayoutCadastro = location.pathname === "/cadastro";

  return (
    <>
      {!hideLayout && !hideLayoutCadastro && <NavigationBar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<Home />} />
        <Route path="/produto/:id" element={<Produto />} />
        <Route path="/cadastroModelos" element={<CadastroModelos />} />
        <Route path="/listaModelos" element={<ListaModelos />} />
        <Route path="/cores&tecidos" element={<CoresETecidos />} />
        <Route path="/editarModelo/:id" element={<EditarModelo />} />
      </Routes>

      <ToastContainer />

      {!hideLayout}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
