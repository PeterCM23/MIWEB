import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  getAdminPassword, getAdminProfile, // Asegúrate de tener esta función para obtener información del administrador
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
console.log(tokenInfo)
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

async function getAdminProfileController(req, res, next) {
  try {
    console.log(req.user.id)
    if (req.user && req.user.id) {
      // Solo si req.user y req.user.id están definidos, procede con la consulta
      const admin = await getAdminProfile({ id:req.user.id });
      console.log("Perfil Admin Obtenido",admin)
      if (admin) {
        // Si se encontró el perfil del administrador, envía la respuesta con los datos
        res.json({
          status: "ok",
          admin,
        });
      } else {
        // Si no se encontró el perfil, devuelve una respuesta indicando que no se encontró el administrador
        res.status(404).json({
          status: "error",
          message: "Administrador no encontrado",
        });
      }
    } else {
      // Si req.user o req.user.id no están definidos, maneja el error apropiadamente
      res.status(400).json({
        status: "error",
        message: "Requisitos de autenticación insuficientes",
      });
    }
  } catch (error) {
    console.error("Error en getAdminProfileController:", error);
    next(error);
  }
}


export { adminLogin,
getAdminProfileController };
