import ValidationError from '../errores/validation_error.js'
import { newPost, getAllPosts, getPostBy, updatePost, destroyPost } from '../db/queries/postQueries.js';

// Crear post

async function createPost(req, res, next){
    try{
        const {title, description} = req.body
        if (!title) throw new ValidationError({ message: 'El campo title es obligatorio', field: 'title' });
        if (!description) throw new ValidationError({ message: 'El campo description es obligatorio', field: 'description' });

        const post = await newPost( title, description);
    if (post instanceof Error) throw post;
    res.status(200).json({
      status: 'ok',
      data: {
        
        post:{
          
          title,
          description
        }
        
      },
    });
  
    } catch (error) {
    next(error);
  }
}

async function listPosts (req, res) {
  try {
    // Llama a getAllPosts para obtener los posts
    const posts = await getAllPosts();

    // Envía los resultados como respuesta
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los posts" });
  }
};

async function showPost (req,res){
  try{
    const { postId } = req.params
    const post = await getPostBy(postId)
    if(post instanceof Error) throw post

    res.json(post)
  }catch(error){
    console.error(error)
    res.status(500).json({error:"Error al obtener el post"})
  }
}

async function editPost(req, res, next) {
  try {
    const { projectId } = req.params; // Obtener el ID del proyecto de los parámetros
    const { newTitle, newDescription } = req.body; // Obtener los nuevos datos del proyecto desde el cuerpo de la solicitud

    // Llama a la función para actualizar el proyecto
    const updatedProject = await updatePost(
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
        newTitle,
        newDescription,
      },
    });
  } catch (err) {
    next(err); // En caso de error, pasa el error al siguiente middleware
  }
}

async function deletePost (req, res, next){
  try{
    const { postId } = req.params

    const result = await destroyPost(postId)
    if(result instanceof Error){
      throw result
    }
    if (result.affectedRows === 0) {
      // Si no se eliminó ninguna fila, significa que no se encontró el post
      return res
        .status(404)
        .json({ error: "El post no se encontró o ya fue eliminado." });
    }
    res.send({
      status:"ok",
      message: "Proyecto eliminado",
    })
  }catch(err){
    next(err)
  }
}

export {
    createPost,
    listPosts,
    showPost,
    editPost,
    deletePost
}