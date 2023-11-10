import React, { useState, useEffect } from "react";
import ProjectCard from '../ProjectCard.jsx/ProjectCard.jsx'
import '../ProjectCard.jsx/ProjectCard.css'
import './ProjectList.css'
const { VITE_API_URL } = import.meta.env;

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Realizar una solicitud GET al servidor para obtener los proyectos
    fetch(`${VITE_API_URL}/proyectos`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo obtener los proyectos");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Datos recibidos:", data); // Agregado: muestra los datos recibidos
        setProjects(data.projects); // Establece los proyectos en el estado
        setLoading(false); // Cambia el estado de loading a falso
      })
      .catch((error) => {
        console.error("Error al obtener proyectos:", error);
        setError(error);
        setLoading(false); // Cambia el estado de loading a falso en caso de error
      });
  }, []); // El segundo argumento [] asegura que esta llamada se realice solo una vez, equivalente a componentDidMount en una clase

  console.log("Estado de proyectos:", projects); // Agregado: muestra el estado de proyectos

  if (loading) {
    return <div>Cargando proyectos...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

    return (
    <div className="prjcts-list">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );

};

export default ProjectList;
