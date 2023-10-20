import express from "express";
import * as projectController from "../controladores/projectsController.js";
import adminAuthMiddleware from "../middlewares/admin_auth_middleware.js";


const router = express.Router();
// RUTAS PRIVADAS

// Ruta para cargar un nuevo proyecto [x]
router.post("/upload", adminAuthMiddleware, async (req, res) => {
  console.log("Solicitud recibida para cargar proyecto:", req.body); // Agrega este log
  console.log("Archivos recibidos:", req.files); // Agrega este log
  projectController.createProjectAndUploadFile(req, res);
});

// // Ruta para eliminar un proyecto [x]
router.delete("/:projectId", adminAuthMiddleware, projectController.deleteProject);

// // Ruta para editar un proyecto existente[x]
router.put("/:projectId", adminAuthMiddleware, projectController.editProject);

// RUTAS PUBLICAS

// Ruta para listar todos los proyectos[x]
router.get("/", projectController.getAllProjects);

// // Ruta para ver detalles de un proyecto específico[x]
router.get("/:projectId", projectController.getProjectById);

// // Ruta para descargar proyectos[x]
router.get("/download/:projectId", projectController.downloadProject)


export default router;
