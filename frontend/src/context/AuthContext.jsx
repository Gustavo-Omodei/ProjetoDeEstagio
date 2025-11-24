import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, senha) => {
    try {
      const response = await axios.post(
        "http://localhost:8800/clientes/login",
        {
          email,
          senha,
        }
      );

      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      if (err.response) {
        const status = err.response.status;

        if (status === 404) {
          throw new Error("Usuário não encontrado.");
        }
        if (status === 401) {
          throw new Error("Senha incorreta.");
        }
      }

      throw new Error("Erro ao fazer login.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
}
