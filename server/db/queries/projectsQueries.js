import { title } from "process";
import getPool from "../pool.js";



// Obtener todas las Entradas

async function getAllProjectsQuery() {
  let connection;

  try {
    connection = await getPool();

    const [projects] = await connection.query(
      `SELECT * FROM projects;        
      `,
      []
    );

    return projects;
  } catch (error) {
    return error;
  } finally {
    if (connection) connection.release();
  }
}

// Crear Proyecto

// La función newProjectQuery recibe el título, descripción 
async function newProjectQuery(title, description, folderPath) {
  let connection;

  try {
    connection = await getPool();
    console.log(title,description)
    // Insertar el proyecto en la tabla de proyectos
    const [result] = await connection.query(
      "INSERT INTO projects (title, description, folderPath) VALUES (?, ?, ?)",
      [title, description, folderPath]
    );

    // Obtener el ID del proyecto recién creado
    const projectId = result.insertId;

    // Consultar y obtener los detalles del proyecto insertado
    const [projectDetails] = await connection.query(
      "SELECT * FROM projects WHERE id = ?",
      [projectId]
    );

    if (projectDetails.length === 0) {
      throw new Error("No se pudo recuperar la información del proyecto después de la inserción.");
    }

    // Devolver los detalles del proyecto creado
    return projectDetails[0];
  } catch (error) {
    return error;
  } finally {
    if (connection) connection.release();
  }
}
async function insertFileQuery(filename, projectId) {
  let connection;
  try {
    connection = await getPool();

    const [result] = await connection.query(
      "INSERT INTO files (filename, project_id) VALUES (?, ?)",
      [filename, projectId]
    );

    const fileId = result.insertId;
    return fileId;
  } catch (error) {
    return error;
  } finally {
    if (connection) connection.release();
  }
}

async function getProjectByIdFromDB(projectId) {
  let connection;
  try {
    connection = await getPool();

    console.log("Conexión a la base de datos exitosa");

    const [result] = await connection.query(
      `
      SELECT p.*, f.filename
      FROM projects p
      LEFT JOIN files f ON p.id = f.project_id
      WHERE p.id = ?
    `,
      [projectId]
    );
      console.log(result)
    if (result.length === 0) {
      console.log("No se encontraron proyectos con ID:", projectId);
      return null;
    }

    console.log("Proyecto encontrado:", result[0]);

    return result[0];
  } catch (error) {
    console.error("Error al obtener el proyecto:", error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}





async function updateProject(projectId, newTitle, newDescription) {
  let connection;
  try {
    connection = await getPool();
    const modifiedAt = new Date();
    const sql = `
      UPDATE projects
      SET title = ?, description = ?, modifiedAt = ?
      WHERE id = ?
    `;
    const values = [newTitle, newDescription, modifiedAt, projectId];

    const savedData = await connection.query(sql, values);
    // Aquí puedes manejar el resultado si es necesario

    return savedData; // Puedes retornar el resultado si lo necesitas
  } catch (error) {
    console.error("Error al actualizar el proyecto:", error);
    throw error; // Puedes lanzar el error para que se maneje en un nivel superior
  } finally {
    if (connection) {
      connection.release(); // Asegúrate de liberar la conexión en caso de error o éxito.
    }
  }
}




async function destroyProject(projectId) {
  let connection;
  try {
    connection = await getPool();

    // Inicia una transacción
    await connection.beginTransaction();

    // Obtiene la ruta de la carpeta del proyecto antes de eliminarlo
    const [result] = await connection.query(
      "SELECT folderPath FROM projects WHERE id = ?",
      [projectId]
    );
    const folderPath = result[0] ? result[0].folderPath : null;

    // Borra los archivos asociados al proyecto
    await connection.query("DELETE FROM files WHERE project_id = ?", [
      projectId,
    ]);

    // Borra el proyecto
    await connection.query("DELETE FROM projects WHERE id = ?", [projectId]);

    // Confirma la transacción
    await connection.commit();

    return { success: true, folderPath }; // Devuelve true y la ruta de la carpeta
  } catch (error) {
    // En caso de error, realiza un rollback
    if (connection) {
      await connection.rollback();
    }
    throw error;
  } finally {
    // Libera la conexión
    if (connection) {
      connection.release();
    }
  }
}



  


export {
  newProjectQuery,
  getAllProjectsQuery,
  insertFileQuery,
  getProjectByIdFromDB,
  destroyProject,
  updateProject,
};