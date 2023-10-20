import express from "express";

// Controllers
import * as adminControllers from "../controladores/adminControllers.js";



const router = express.Router();


// POST /trasteo/alohomora
router.post('/alohomora', adminControllers.adminLogin
)







export default router;