import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  getAdminPassword, // Asegúrate de tener esta función para obtener información del administrador
} from "../db/queries/adminQueries.js"; // Ajusta la ubicación de tus consultas de usuarios

import AuthError from "../errores/auth_error.js";

import { SECRET } from "../config.js"; // Reemplaza con tu secreto real

async function adminLogin(req, res, next) {
  const { password } = req.body;

  try {
    if (!password) {
      console.log("Contraseña no proporcionada");
      throw new ValidationError({
        message: "El campo password es obligatorio",
        field: "password",
      });
    }

    // Obtén la contraseña hasheada del administrador desde la base de datos
    const admin = await getAdminPassword();
    console.log("Contraseña de la base de datos:", admin);

    if (!admin) {
      console.log("Administrador no encontrado en la base de datos");
      throw new AuthError({
        message: "Administrador no encontrado",
        status: 404,
      });
    }

    // Compara la contraseña ingresada con la contraseña hasheada en la base de datos
    const validPass = await bcrypt.compare(password, admin.password);

    if (!validPass) {
      console.log("Contraseña incorrecta");
      throw new AuthError({
        message: "Contraseña incorrecta",
        status: 401,
      });
    }

    // Objeto con información que deseas agregar al token
    const tokenInfo = {
      id: admin.id,
      username: admin.username,
    };

    const token = jwt.sign(tokenInfo, SECRET, { expiresIn: "7d" });
    res.json({
      status: "ok",
      data: {
        token,
      },
    });
  } catch (error) {
    console.error("Error en adminLogin:", error);
    next(error);
  }
}


export { adminLogin };
