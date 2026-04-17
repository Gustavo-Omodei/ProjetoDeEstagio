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
import Checkout from "./pages/Pedidos/Checkout";
import Pagamento from "./pages/Pagamento";
import NavigationBar from "./components/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from "./routes/PrivateRoute";
import TodosPedidos from "./pages/Pedidos/TodosPedidos";
import Pedidos_Usuario from "./pages/Pedidos/Pedidos_Usuario";
import Unauthorized from "./pages/Unauthorized";
import Pedido from "./pages/Pedidos/Pedido";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppContent() {
  const location = useLocation();
  const { loading } = useAuth();

  if (loading) {
    return <div>Carregando aplicação...</div>;
  }

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/cadastro" ||
    location.pathname === "/unauthorized";

  return (
    <>
      {!hideLayout && <NavigationBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/produto/:id" element={<Produto />} />
        <Route path="/unauthorized" element={<Unauthorized />} />{" "}
        <Route element={<PrivateRoute allowedRoles={["admin", "cliente"]} />}>
          <Route path="/pagamento" element={<Pagamento />} />
          <Route path="/pedido/:id" element={<Pedido />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/meusPedidos" element={<Pedidos_Usuario />} />
        </Route>
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
