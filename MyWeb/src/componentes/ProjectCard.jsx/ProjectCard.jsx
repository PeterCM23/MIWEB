import React from "react";
import './ProjectCard.css'
const { VITE_API_URL } = import.meta.env;
const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <img src={`${VITE_API_URL}/${project.miniatura}`} alt={project.title} />
      <p>{project.description}</p>
      <a href={project.link}>Link</a>
    </div>
  );
};

export default ProjectCard;
