import { useState, useEffect } from "react";

import "./Home.css"; // Asegúrate de importar tu archivo CSS
import Portada from '../../assets/images/Portada.png'
import ImagenUno from '../../assets/images/imagen-1.png'
import ProjectCard from "../../componentes/ProjectCard.jsx/ProjectCard";
import Cabeza from './imagen-home.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
const { VITE_API_URL } = import.meta.env;
const Home = () => {
    const [projects, setProjects] = useState([]);
    

    // Función para seleccionar proyectos aleatorios
    const selectRandomProjects = (projects, count) => {
      const shuffledProjects = projects.sort(() => 0.5 - Math.random());
      return shuffledProjects.slice(0, count);
    };

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
          console.log("Datos recibidos:", data);
          setProjects(data.projects);
         
        })
        .catch((error) => {
          console.error("Error al obtener proyectos:", error);
         
        });
    }, []);

    // Selecciona 3 proyectos aleatorios
    const randomProjects = selectRandomProjects(projects, 3);

  return (
    <div>
      <div className="portada">
        <section className="portada-text">
          <h1>Pedro Cruz</h1>
          <p>DESARROLLADOR FULLSTACK</p>
        </section>
        <img src={Portada} alt="portada-img" />
      </div>

      <div className="home-content">
        <section id="about-me" className="planet-section">
          <h2 className="section-title">SOBRE MI</h2>
          <div className="aboutme-content">
            <p>
              Soy un apasionado de la programación en constante búsqueda de
              nuevos desafíos. Mi viaje en el mundo del desarrollo es una
              búsqueda constante de aprendizaje y crecimiento. Actualmente busco
              oportunidades que puedan ayudarme en este viaje. Si necesitas
              ayuda con tu proyecto, <a href="/contacto">contactame</a>.
            </p>
            <img src={ImagenUno} alt="imagen-1" />
          </div>
        </section>

        <section id="skills" className="planet-section">
          <h2 className="section-title">MIS HABILIDADES</h2>
          <div className="skills-content">
            <div className="skills-image">
              <img src={Cabeza} alt="Imagen de habilidades" />
            </div>
            <ul>
              <li>
                <h4>Desarrollo Web FrontEnd</h4>
                <p>
                  Diseño y desarrollo de la interfaz de usuario de sitios web
                  atractivos y funcionales. Utilizo tecnologías como HTML, CSS y
                  JavaScript para crear experiencias de usuario excepcionales.
                </p>
              </li>
              <li>
                <h4>Programacion BackEnd con Node.js</h4>
                <p>
                  Creación de servidores y aplicaciones robustas utilizando
                  Node.js y Express. Implemento lógica empresarial, gestión de
                  bases de datos y autenticación para garantizar un
                  funcionamiento eficiente.
                </p>
              </li>
              <li>
                <h4>Gestion de Bases de Datos con MySQL</h4>
                <p>
                  Experiencia en la administración de bases de datos para
                  respaldar aplicaciones web. Diseño de esquemas de bases de
                  datos eficientes, optimización de consultas y gestión de datos
                  para garantizar un rendimiento óptimo de las aplicaciones.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section id="featured-projects" className="planet-section">
          <h2 className="section-title">PROYECTOS DESTACADOS</h2>
          <div className="featured-projects">
            {Array.isArray(randomProjects) && randomProjects.length > 0 ? (
              randomProjects.map((project) => (
                <ProjectCard key={project.id} project={project} /> // Renderiza cada proyecto en una tarjeta
              ))
            ) : (
              <p>No hay proyectos destacados disponibles en este momento.</p>
            )}
          </div>
        </section>

        <section id="work-experience" className="planet-section">
          <h2 className="section-title">EXPERIENCIA LABORAL</h2>
          <ul>
            <li>
              <h2>2020-2021</h2>
              <h3>CEBU by La Bodeguilla</h3>
              <h4>Camarero Barra y Terraza</h4>
              <p>
                Servir en barra y terraza con excelencia, proporcionando un
                servicio de calidad y una experiencia memorable a los clientes.
                Ofrecer una atención detallada al cliente, escuchando sus
                necesidades y asegurándome de que sus expectativas se cumplan o
                superen.
              </p>
            </li>
            <li>
              <h2>2019-2020</h2>
              <h3>Impermeabilizaciones Roberto Fernandez</h3>
              <h4>Albañil tejados y cubiertas</h4>
              <p>
                Profesional de impermeabilización de cubiertas con experiencia
                en aplicar revestimientos impermeabilizantes, reparar
                superficies y realizar inspecciones detalladas. Habilidad para
                evaluar el estado de las cubiertas y proporcionar soluciones
                efectivas. Comprometido con la satisfacción del cliente y la
                calidad del trabajo.
              </p>
            </li>
            <li>
              <h2>2015 - 2017</h2>
              <h3>APPCO Group</h3>
              <h4>Comercial</h4>
              <p>
                Experiencia en identificar oportunidades de mercado, establecer
                relaciones sólidas con los clientes y cerrar acuerdos exitosos.
              </p>
            </li>
          </ul>
        </section>

        <section id="certifications" className="planet-section">
          <h2 className="section-title">CERTIFICACIONES</h2>
          <ul>
            <li>
              <h4> Desarrollador Web FullStack </h4>
              <h3>HACK A BOSS</h3>
              <p>
                En Hack a Boss, adquirí habilidades como desarrollador web Full
                Stack, dominando tecnologías esenciales como Node.js y Express
                para el backend, además de crear un frontend atractivo con
                React.
              </p>
            </li>
            <li>
              <h4> Marketing Directo </h4>
              <h3>APPCO GROUP</h3>
              <p>
                En APPCO Group, adquirí habilidades clave en Marketing Directo,
                lo que me permitió comprender y aplicar estrategias de marketing
                efectivas.
              </p>
            </li>
            <li>
              <h4> Trader Profesional </h4>
              <h3>IBT Sevilla</h3>
              <p>
                IBT Sevilla me brindó un profundo entendimiento de los mercados
                financieros y estrategias de trading, ademas de la oportunidad
                de ponerlas en practica.
              </p>
            </li>
          </ul>
        </section>

        {/* <section id="testimonials" className="planet-section">
          <h2 className="section-title">TESTIMONIOS</h2>
          {/* Testimonios de tus clientes o colaboradores 
        </section> */}

        <section className="Contactame">
          <a href="/contacto" className="contact-button">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </section>
      </div>
    </div>
  );
};

export default Home;
