import getPool from "../pool.js";

async function getAdminPassword() {
  let connection;

  try {
    connection = await getPool();

    // Realiza una consulta para obtener la contraseña hasheada del administrador
    const [admin] = await connection.query(
      "SELECT id, username, password FROM admins LIMIT 1"
    );

    if (admin[0] && admin[0].password) {
      // Elimina cualquier carácter de nueva línea o espacio en blanco al final de la contraseña
      const cleanedPassword = admin[0].password.replace(/\s/g, "");

      return {
        id: admin[0].id,
        username: admin[0].username,
        password: cleanedPassword,
      };
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

async function getAdminProfile({id}) {
  let connection;
console.log(id)
  try {
    connection = await getPool();

    // Realiza una consulta para obtener el perfil del administrador
    const [admin] = await connection.query(
      "SELECT * FROM admins WHERE id = ?",
      [id]
    );

    if (admin.length > 0) {
      // La consulta debe devolver un solo registro si el ID es único
      return admin[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error en getAdminProfile:", error);
    throw error; // Lanza la excepción en lugar de retornar el error
  } finally {
    if (connection) connection.release();
  }
}


export{getAdminPassword,
getAdminProfile
}
