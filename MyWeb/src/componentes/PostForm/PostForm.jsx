import React, { useState } from "react";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const postData = {
      title,
      description,
    };

    try {
      const response = await fetch("/ruta-para-guardar-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        // La solicitud se completó con éxito
        const data = await response.json();
        console.log(data);
        // Puedes realizar otras acciones aquí, como mostrar un mensaje de éxito al usuario.
      } else {
        // La solicitud falló, manejar el error
        console.error("Error al guardar el post");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div>
      <h2>Crear Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Título del Post:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Contenido:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default PostForm;
