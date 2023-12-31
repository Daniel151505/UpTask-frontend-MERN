import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/clientAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [charging, setCharging] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const authenticatedUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setCharging(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clientAxios.get("/usuarios/perfil", config);
        setAuth(data);
        navigate("/projects");
      } catch (error) {
        setAuth({});
      }
      setCharging(false);
    };
    authenticatedUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        charging,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
