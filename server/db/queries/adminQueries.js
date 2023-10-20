import getPool from "../pool.js";

async function getAdminPassword() {
  let connection;

  try {
    connection = await getPool();

    // Realiza una consulta para obtener la contraseña hasheada del administrador
    const [admin] = await connection.query(
      "SELECT password FROM admins LIMIT 1"
    );

    if (admin[0] && admin[0].password) {
      // Elimina cualquier carácter de nueva línea o espacio en blanco al final de la contraseña
      const cleanedPassword = admin[0].password.replace(/\s/g, "");

      return { password: cleanedPassword };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error en getAdminPassword:", error);
    return error;
  } finally {
    if (connection) connection.release();
  }
}

export{getAdminPassword}
