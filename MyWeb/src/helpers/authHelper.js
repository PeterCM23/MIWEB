// authHelpers.js

import jwt_decode from "jwt-decode";
import { SECRET } from "../config";

const isAuthenticated = () => {
  const token = localStorage.getItem("Authorization");
  console.log("Token:", token);

  if (token) {
    try {
      const decodedToken = jwt_decode(token, SECRET);
      console.log("Token Decodificado:", decodedToken);
      return true;
    } catch (error) {
      console.error("Error al verificar el token:", error);
    }
  }
  return false;
};



 export {isAuthenticated}