import express from "express";

// Controllers
import * as adminControllers from "../controladores/adminControllers.js";
import adminAuthMiddleware from "../middlewares/admin_auth_middleware.js";



const router = express.Router();


// POST /trasteo/alohomora
router.post('/alohomora', adminControllers.adminLogin
)

// Obtener perfil privado Admin
router.get('/', adminAuthMiddleware ,adminControllers.getAdminProfileController)






export default router;