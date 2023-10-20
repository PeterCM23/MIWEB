import formidable from "formidable";
import {
  getAllProjectsQuery,
  newProjectQuery,
  insertFileQuery,
  getProjectByIdFromDB,
  destroyProject,
  updateProject
} from "../db/queries/projectsQueries.js"; // Importa las consultas a la base de datos relacionadas con los proyectos
import { PROJECTS_DIR } from "../config.js";

import fs from 'fs-extra'
import AdmZip from 'adm-zip' // Asegúrate de haber instalado esta biblioteca previamente

import generateRandomFileName from "../helpers/file_nameGenerator.js";
import xProjectFolder from "../middlewares/deleteProject.js";



// Obtener todos los proyectos

async function getAllProjects(req, res, next) {
  try {
    

    // Dado que la propiedad user puede no existir lo indicamos por medio de la interrogación.
    const projects = await getAllProjectsQuery();
    if (projects instanceof Error) throw projects;

    res.send({
      status: "ok",
      data: {
        projects,
      },
    });
  } catch (err) {
    next(err);
  }
}

// Crear un proyecto nuevo

async function createProjectAndUploadFile(req, res) {
  const { title, description } = req.body;
  const folderPath = `${PROJECTS_DIR}/${title}`;

  try {
    // Verifica si el directorio de destino existe, y créalo si no
    await fs.ensureDir(folderPath);

    if (req.files && req.files.projectFile) {
      const file = req.files.projectFile;

      const project = await newProjectQuery(title, description, folderPath);

      if (project instanceof Error) {
        throw project;
      }
      const projectId = project.id;
      // Mueve el archivo a la carpeta de proyectos
      await fs.move(file.tempFilePath, `${folderPath}/${file.name}`);

      // Inserta el archivo en la base de datos y obtén el ID del archivo
      const fileId = await insertFileQuery(file.name, projectId);

      res.status(200).json({
        message: "Proyecto y archivo subidos exitosamente",
        project,
        fileId,
      });
    } else {
      // Maneja el caso en el que no se proporcionó un archivo
      res.status(400).json({ error: "No se proporcionó un archivo" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Error al crear el proyecto o subir el archivo",
      details: error.message,
    });
  }
}

// Obtener el proyecto por su id

const getProjectById = async (req, res, next) => {
  try {
    const projectId = req.params.projectId;

    // Llamar a la función que obtiene el proyecto desde la base de datos
    const project = await getProjectByIdFromDB(projectId);

    if (project) {
      // Formatear la respuesta en el estilo deseado
      const formattedProject = {
        status: "ok",
        data: {
          project,
        },
      };

      res.json(formattedProject);
    } else {
      res.status(404).json({ error: "Proyecto no encontrado" });
    }
  } catch (err) {
    next(err);
  }
};

// Eliminar un proyecto

async function deleteProject(req, res) {
  const projectId = req.params.projectId;

  try {
    console.log("Intentando eliminar proyecto con ID:", projectId);

    // Utiliza la consulta para eliminar el proyecto
    const result = await destroyProject(projectId);

    console.log("Resultado de destroyProject:", result);

    if (result.success === true) {
      console.log("Proyecto eliminado con éxito");

      // Obtiene la ruta de la carpeta del proyecto del resultado
      const folderPath = result.folderPath;

      // Llama a xProjectFolder con la ruta del proyecto
      await xProjectFolder(folderPath);

      res.json({ message: "Proyecto eliminado con éxito" });
    } else {
      console.log("No se encontró el proyecto para eliminar");
      res.status(404).json({ error: "Proyecto no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar el proyecto:", error);
    res.status(500).json({ error: "Error al eliminar el proyecto" });
  }
}




// EDITAR PROYECTO

async function editProject(req, res, next) {
  try {
    const { projectId } = req.params; // Obtener el ID del proyecto de los parámetros
    const { newTitle, newDescription } = req.body; // Obtener los nuevos datos del proyecto desde el cuerpo de la solicitud

    // Llama a la función para actualizar el proyecto
    const updatedProject = await updateProject(
      projectId,
      newTitle,
      newDescription
    );

    if (updatedProject instanceof Error) {
      throw updatedProject; // Maneja el error si ocurre uno al actualizar el proyecto
    }

    res.send({
      status: "ok",
      message: "Proyecto actualizado",
      data: {
        newTitle, newDescription
      },
    });
  } catch (err) {
    next(err); // En caso de error, pasa el error al siguiente middleware
  }
}

async function downloadProject(req, res, next) {
  const projectId = req.params.projectId;

  try {
    // Utiliza la función para obtener el proyecto desde la base de datos
    const project = await getProjectByIdFromDB(projectId);

    if (!project) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }

    const folderPath = project.folderPath;

    // Obtén el nombre del archivo que deseas descargar (puedes implementar tu propia lógica aquí)
    const fileName = `${generateRandomFileName}`; // Reemplaza esto con la lógica adecuada
console.log(fileName)
    // Crea un archivo zip con el contenido de la carpeta del proyecto
    const zip = new AdmZip();
    zip.addLocalFolder(folderPath);

    // Guarda el archivo zip en una ubicación temporal
    const tempZipPath = `./temp/${generateRandomFileName()}.zip`;
    zip.writeZip(tempZipPath);

    // Descarga el archivo zip al cliente
    res.download(tempZipPath, fileName, (err) => {
      if (err) {
        console.error("Error al descargar el proyecto:", err);
        res.status(500).json({ error: "Error al descargar el proyecto" });
      }else{
        console.log("Descarga exitosa: Proyecto descargado con exito")
      }

      // Elimina el archivo temporal después de la descarga
      fs.remove(tempZipPath, (err) => {
        if (err) {
          console.error("Error al eliminar el archivo temporal:", err);
        }
      });
    });
  } catch (error) {
    console.error("Error al descargar el proyecto:", error);
    res.status(500).json({ error: "Error al descargar el proyecto" });
  }
}



export { createProjectAndUploadFile,
  getAllProjects,
  getProjectById ,
  deleteProject ,
  editProject,
  downloadProject
};