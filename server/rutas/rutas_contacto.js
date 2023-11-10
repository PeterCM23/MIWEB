import express from 'express'

//Controllers 

import * as contactControllers from '../controladores/contactControllers.js'

const router = express.Router()

// Enviar formulario
router.post('/', contactControllers.sendMessage)

export default router