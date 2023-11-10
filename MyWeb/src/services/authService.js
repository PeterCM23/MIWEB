
import { getToken } from "../utils/getToken";
const baseURL = import.meta.env.VITE_API_URL;
// Importamos la función que retorna el token.


// Registro de usuario.


// Login de usuario.
export const signInService = async ( password) => {
  const res = await fetch(`${baseURL}/trasteo/alohomora`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      
      password,
    }),
  });

  const body = await res.json();

  return body;
};

// Obtener el perfil privado de un usuario.
export const getPrivateProfile = async () => {
    const token = getToken();

    const res = await fetch(`${baseURL}/trasteo`, {
        headers: {
            Authorization: token,
        },
    });

    const body = await res.json();

    return body;
};



