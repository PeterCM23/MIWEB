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

export{
    newPost
}