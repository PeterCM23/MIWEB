import ValidationError from '../errores/validation_error.js'
import { newPost } from '../db/queries/postQueries.js';

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

export {
    createPost
}