import express from "express";

import adminAuthMiddleware from "../middlewares/admin_auth_middleware.js";

import * as postController from '../controladores/postContollers.js'

const router = express.Router()

//Rutas
 //Crear Post
 router.post('/', adminAuthMiddleware, postController.createPost)

//Obtener todos los post
router.get('/', postController.listPosts)

//Obtener post por su id
router.get('/:postId', postController.showPost)

//Editar un post
router.put('/:postId', adminAuthMiddleware, postController.editPost)

//Delete post
router.delete('/:postId', adminAuthMiddleware, postController.deletePost)

export default router