import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import Modelos from "./pages/Modelos/Modelos";
import NavigationBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // importa o react-router-dom para navegação
import { ToastContainer } from "react-toastify";

// importa do styles.js

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/modelos" element={<Modelos />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
