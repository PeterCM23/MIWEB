import getPool from "../pool.js";

async function saveMessageInDB(nombre, email, telefono, mensaje) {
  let connection;

  try {
    connection = await getPool();

    const query = `
      INSERT INTO contact_form (nombre, email, telefono, mensaje, createdAt)
      VALUES (?, ?, ?, ?, ?)
    `;

    // Ejecuta la consulta para guardar el mensaje en la base de datos
    const [result] = await connection.query(query, [
      nombre,
      email,
      telefono,
      mensaje,
      new Date(),
    ]);

    if (result.affectedRows === 1) {
      return result;
    } else {
      throw new Error("Error al guardar el mensaje");
    }
  } catch (error) {
    return error;
  } finally {
    if (connection) connection.release();
  }
}

export{
    saveMessageInDB
}