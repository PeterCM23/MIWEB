import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

function adminAuthMiddleware(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token de autenticación no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // Almacena la información del usuario en req
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Token de autenticación no válido" });
  }
}

export default adminAuthMiddleware;
