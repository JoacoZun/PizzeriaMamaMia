import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("userEmail");
    if (storedToken && storedEmail) {
      setToken(storedToken);
      setUserEmail(storedEmail);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", email);
        setToken(data.token);
        setUserEmail(email);
      } else {
        throw new Error(data.message || "Error de autenticación");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", email);
        setToken(data.token);
        setUserEmail(email);
      } else {
        throw new Error(data.message || "Error al registrar");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setToken(null);
    setUserEmail(null);
  };

  const getProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setUserEmail(data.email);
      } else {
        throw new Error(data.message || "Error al obtener perfil");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider value={{ token, userEmail, login, register, logout, getProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

