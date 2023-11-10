// Importamos los prop-types.
import PropTypes from "prop-types";

// Importamos la función que crea un contexto y los hooks.
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Importamos los servicios.
import {
  signInService,
  getPrivateProfile
} from "../services/authService";

// Importamos las constantes.
import { TOKEN_LOCAL_STORAGE_KEY } from "../utils/constants";

// Importamos la función que retorna el token.
import { getToken } from "../utils/getToken";

// Creamos el contexto de autenticación.
export const AuthContext = createContext(null);

// Creamos el componente provider del contexto.
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [authAdmin, setauthAdmin] = useState(null);
  const [authToken, setAuthToken] = useState(getToken());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Función que retorna los datos del usuario.
    const fetchAdmin = async () => {
      try {
        setLoading(true);

        const body = await getPrivateProfile();
console.log(body.admin)
        if (body.status === "error") {
          throw new Error(body.message);
        }
        setauthAdmin(body.admin);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Si existe token buscamos los datos del usuario.
    if (authToken) fetchAdmin();
  }, [authToken]);

  

  // Función que logea a un usuario retornando un token.
  const authLogin = async (username, password) => {
    try {
      setLoading(true);

      const body = await signInService(username, password);

      if (body.status === "error") {
        throw new Error(body.message);
      }

      // Almacenamos el token en el localStorage. Dado que la variable token es un string no es
      // necesario usar JSON.stringify.
      localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, body.data.token);

      // Indicamos que el usuario está autorizado.
      setAuthToken(body.data.token);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función de logout.
  const authLogout = () => {
    // Eliminamos el token del localStorage.
    localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);

    // Establecemos el usuario a null y isAuthenticated a false.
    setauthAdmin(null);
    setAuthToken(null);
  };

  

  return (
    <AuthContext.Provider
      value={{
        authAdmin,
        isAuthenticated: authToken,
        authLogin,
        authLogout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
