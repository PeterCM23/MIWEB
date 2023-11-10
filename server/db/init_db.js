import mysql from "mysql2/promise.js";
import getPool from "./pool.js";

const init = async () => {
  let connection;

  try {
    connection = await getPool();

    console.log("---- Iniciando modificación de la base de datos ----");
    console.log("Borrando tablas");

    // Borra todas las tablas existentes, si las hay
    await connection.query("DROP TABLE IF EXISTS files"); // Agrega esta línea
    await connection.query("DROP TABLE IF EXISTS posts");
    await connection.query("DROP TABLE IF EXISTS projects");
    await connection.query("DROP TABLE IF EXISTS contact_form");

    console.log("Tablas borradas\n");

    console.log("Creando nuevas tablas\n");
    // Projects
    console.log("- Creando tabla projects");
    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects(
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        folderPath VARCHAR(255) UNIQUE NOT NULL,
        link VARCHAR(255),
        miniatura VARCHAR(255),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log("- Tabla projects creada\n");

    // Admins
    console.log("- Creando tabla admins");
    await connection.query(`
      CREATE TABLE IF NOT EXISTS admins(
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("- Tabla admins creada\n");

    // Agregar la tabla posts
    console.log("- Creando tabla posts");
    await connection.query(`
      CREATE TABLE IF NOT EXISTS posts(
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log("- Tabla posts creada\n");

    // Files
    console.log("- Creando tabla files");
    await connection.query(`
      CREATE TABLE IF NOT EXISTS files(
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        project_id INT UNSIGNED,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id)
      )
    `);
    console.log("- Tabla files creada\n");

    // Agregar la tabla de formulario de contacto
    console.log("- Creando tabla de formulario de contacto");
    await connection.query(`
  CREATE TABLE IF NOT EXISTS contact_form(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    mensaje TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
    console.log("- Tabla de formulario de contacto creada\n");
    // Agrega aquí más tablas si es necesario

    console.log("Tablas creadas");

    console.log("-------------- db Lista --------------");
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

init();
