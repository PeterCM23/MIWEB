import getPool from '../pool.js'


async function newPost ( title, description){
    let connection 
    
    try{
        connection = await getPool()

        const post = await connection.query(
            'INSERT INTO posts (title,  description, createdAt) VALUES(?, ?, ?)',
      [title, description,  new Date()]
        )
        return post
    }catch (error){
        return error
    }finally{
        if(connection) connection.release()
    }

}

const getAllPosts = async () => {
  let connection;

  try {
    connection = await getPool();

    // Realiza la consulta para obtener todos los posts
    const [rows] = await connection.query(
      "SELECT id, title, description, createdAt FROM posts"
    );

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

async function getPostBy (postId){
    let connection
    
    try{
        connection = await getPool()

        const [rows] = await connection.query(
          `SELECT id, title, description, createdAt FROM posts WHERE id = ?`,
          [postId]
        );

        return rows
    }catch(error){
        console.error(error)
        throw error
    }finally{
        if (connection) connection.release()
    }
}

async function updatePost(postId, newTitle, newDescription) {
  let connection;
  try {
    connection = await getPool();
    const modifiedAt = new Date();
    const sql = `
      UPDATE posts
      SET title = ?, description = ?, modifiedAt = ?
      WHERE id = ?
    `;
    const values = [newTitle, newDescription, modifiedAt, postId];

    const savedData = await connection.query(sql, values);
    // Aquí puedes manejar el resultado si es necesario

    return savedData; // Puedes retornar el resultado si lo necesitas
  } catch (error) {
    console.error("Error al actualizar el Post:", error);
    throw error; // Puedes lanzar el error para que se maneje en un nivel superior
  } finally {
    if (connection) {
      connection.release(); // Asegúrate de liberar la conexión en caso de error o éxito.
    }
  }
}

async function destroyPost (postId){
    let connection
    try{
        connection = await getPool()
        const [result] = await connection.query(
        'DELETE FROM posts WHERE id = ?', [postId] )
            
        return result
    }catch (error){
        throw error
    }finally{
        if (connection) connection.release()
    }
}

export{
    newPost,
    getAllPosts,
    getPostBy,
    updatePost,
    destroyPost
}