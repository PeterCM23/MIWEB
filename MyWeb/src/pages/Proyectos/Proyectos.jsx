import React from "react";
import ProjectList from "../../componentes/ProjectList/ProjectList";
import './Proyectos.css'

const Proyectos = () => {
  return (
    <div className="prjcts-content">
      <h1>{"< Proyectos />"}</h1>
      <ProjectList className="prjcts-list"/>
    </div>
  );
};

export default Proyectos;
