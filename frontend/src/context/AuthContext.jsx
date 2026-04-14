import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } catch {
        logout();
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  async function signInWithPassword(email, senha) {
    const response = await api.post("/clientes/login", {
      email,
      senha,
    });

    const { user, token } = response.data;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    api.defaults.headers.Authorization = `Bearer ${token}`;

    console.log(user);
    setUser(user);
    setToken(token);
  }

  const logout = () => {
    setUser(null);
    setToken(null);
    api.defaults.headers.Authorization = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));

    setToken(token);
  };

  const value = {
    user,
    token,
    loading,
    signInWithPassword,
    logout,
    updateUser,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
