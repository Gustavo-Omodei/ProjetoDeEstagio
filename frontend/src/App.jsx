// App.js
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
import Pedido from "./pages/Pedidos/Pedido";
import Pagamento from "./pages/Pagamento";
import NavigationBar from "./components/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from "./routes/PrivateRoute";
import TodosPedidos from "./pages/Pedidos/TodosPedidos";
import Pedidos_Usuario from "./pages/Pedidos/Pedidos_Usuario";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Importe useAuth

function AppContent() {
  const location = useLocation();
  const { loading } = useAuth(); // Obtenha o estado de loading do AuthContext

  // Se o AuthContext ainda estiver carregando, mostre um loading global
  if (loading) {
    return <div>Carregando aplicação...</div>;
  }

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/cadastro" ||
    location.pathname === "/unauthorized"; // Adicione a página de não autorizado

  return (
    <>
      {!hideLayout && <NavigationBar />}
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/produto/:id" element={<Produto />} />
        <Route
          path="/unauthorized"
          element={<div>Acesso Não Autorizado</div>}
        />{" "}
        {/* Página de acesso negado */}
        {/* Rotas privadas (acessíveis por cliente e admin) */}
        <Route element={<PrivateRoute allowedRoles={["admin", "cliente"]} />}>
          <Route path="/pagamento" element={<Pagamento />} />
          <Route path="/pedido/:id" element={<Pedido />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/meusPedidos" element={<Pedidos_Usuario />} />
        </Route>
        {/* Rotas de admin (acessíveis apenas por admin) */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/cadastroModelos" element={<CadastroModelos />} />
          <Route path="/listaModelos" element={<ListaModelos />} />
          <Route path="/cores&tecidos" element={<CoresETecidos />} />
          <Route path="/tabelaFrete" element={<TabelaFrete />} />
          <Route path="/todosPedidos" element={<TodosPedidos />} />
          <Route path="/editarModelo/:id" element={<EditarModelo />} />
        </Route>
      </Routes>
      <ToastContainer />
      {!hideLayout && <Footer />}{" "}
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
