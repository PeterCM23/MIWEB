import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { PORT, PROJECTS_DIR, TEMP_DIR, UPLOADS_DIR, VIDEO_DIR } from './config.js'
import fileUpload from 'express-fileupload'
import rutasProyectos from './rutas/rutas_proyectos.js'
import rutasTrasteo from './rutas/rutas_trasteo.js'
import rutasPost from './rutas/rutas_post.js'
import rutasContacto from './rutas/rutas_contacto.js'
const app = express()

const port = PORT

app.use(cors())

app.use(express.json())

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: TEMP_DIR, 
}))

app.use(morgan("dev"))

app.use("/images", express.static(UPLOADS_DIR))
app.use("/video", express.static(VIDEO_DIR))
app.use("/projects", express.static(PROJECTS_DIR))

app.use("/proyectos", rutasProyectos )
app.use("/post", rutasPost)
app.use("/contact", rutasContacto)
app.use("/trasteo", rutasTrasteo )

app.get('/',(req, res)=>{
    res.send('Server Funcionando')
})

app.listen(port, ()=>{
    console.log(`Servidor funcionando en el puerto ${port}`)
})