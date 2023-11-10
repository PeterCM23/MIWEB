import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import PostForm from "../../componentes/PostForm/PostForm";
import ProjectForm from "../../componentes/ProyectForm/ProyectForm";

const AdminPanel = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Si no está autenticado, redirige al usuario a la página de inicio
      navigate("/"); // Cambia la ruta según tus necesidades
    }
  }, [isAuthenticated, navigate]); // Agrega las dependencias

  return (
    <div>
      <h1>Admin Panel</h1>
      <PostForm />
      <ProjectForm />
    </div>
  );
};

export default AdminPanel;
