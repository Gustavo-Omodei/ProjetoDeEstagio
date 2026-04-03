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
import TabelaFrete from "./pages/tabelaFrete";
import Pedido from "./pages/Pedidos";
import Pagamento from "./pages/Pagamento";
import NavigationBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";

function AppContent() {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/cadastro";

  return (
    <>
      {!hideLayout && <NavigationBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/produto/:id" element={<Produto />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastroModelos" element={<CadastroModelos />} />
          <Route path="/listaModelos" element={<ListaModelos />} />
          <Route path="/cores&tecidos" element={<CoresETecidos />} />
          <Route path="/tabelaFrete" element={<TabelaFrete />} />
          <Route path="/editarModelo/:id" element={<EditarModelo />} />
          <Route path="/pagamento" element={<Pagamento />} />
          <Route path="/pedido/:id" element={<Pedido />} />
        </Route>
      </Routes>
      <ToastContainer />
      <Footer></Footer>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
