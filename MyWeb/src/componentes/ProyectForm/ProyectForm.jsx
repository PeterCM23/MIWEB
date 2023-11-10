import React, { useState } from "react";
import {getToken} from '../../utils/getToken.js'
const { VITE_API_URL } = import.meta.env;
const ProjectForm = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [miniatura, setMiniatura] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto FormData para enviar los datos del proyecto y el archivo al servidor
    const formData = new FormData();
    formData.append("title", projectTitle);
    formData.append("description", projectDescription);
    formData.append("projectFile", selectedFile);
    formData.append("miniatura", miniatura); // Cambiado a un campo de tipo archivo
    formData.append("link", link);
    // Agrega console.log para depuración
    console.log("Datos del formulario:", {
      title: projectTitle,
      description: projectDescription,
      projectFile: selectedFile,
      miniatura,
      link,
    });
    try {
      
      const token = getToken()

      const response = await fetch(`${VITE_API_URL}/proyectos/upload`, {
        method: "POST", // Método POST en mayúsculas
        body: formData,
        headers: {
          Authorization: token,
          // No es necesario especificar el Content-Type, ya que FormData se encargará de ello
        },
      });

      if (response.ok) {
        // La solicitud se completó con éxito
        const data = await response.json();
        console.log(data);
        // Puedes realizar otras acciones aquí, como mostrar un mensaje de éxito al usuario.
      } else {
        // La solicitud falló, manejar el error
        console.error("Error al guardar el proyecto");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleMiniaturaChange = (e) => {
    const miniaturaFile = e.target.files[0];
    setMiniatura(miniaturaFile);
  };

  return (
    <div>
      <h2>Crear Proyecto</h2>
      <form onSubmit={handleSubmit}>
        <label>Título del Proyecto:</label>
        <input
          type="text"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
        />
        <label>Descripción:</label>
        <textarea
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
        <label>Miniatura:</label>
        <input type="file" onChange={handleMiniaturaChange} />
        <label>Enlace:</label>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <label>Seleccionar Archivo:</label>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default ProjectForm;
