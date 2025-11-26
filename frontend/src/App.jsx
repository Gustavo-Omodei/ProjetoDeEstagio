import Home from "./pages/Home";
import Login from "./pages/Login";
import Clientes from "./pages/Clientes";
import Produto from "./pages/Produto";
import CadastroModelos from "./pages/Modelos/CadastroModelos";
import CoresETecidos from "./pages/Cores&Tecidos";
import ListaModelos from "./pages/Modelos/ListaModelos";
import EditarModelo from "./pages/Modelos/EditarModelos";
import NavigationBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"; // importa o react-router-dom para navegação
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";

// importa do styles.js
function AppContent() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login";

  return (
    <>
      {!hideLayout && <NavigationBar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/produto/:id" element={<Produto />} />
        <Route path="/cadastroModelos" element={<CadastroModelos />} />
        <Route path="/listaModelos" element={<ListaModelos />} />
        <Route path="/cores&tecidos" element={<CoresETecidos />} />
        <Route path="/editarModelo/:id" element={<EditarModelo />} />
      </Routes>

      <ToastContainer />

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
