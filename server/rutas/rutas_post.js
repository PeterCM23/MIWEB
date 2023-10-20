import express from "express";

import adminAuthMiddleware from "../middlewares/admin_auth_middleware.js";

import * as postController from '../controladores/postContollers.js'

const router = express.Router()

//Rutas
 //Crear Post
 router.post('/', adminAuthMiddleware, postController.createPost)





export default router