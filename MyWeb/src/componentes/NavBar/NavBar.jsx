import React, { useState, useEffect, useRef } from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";



const NavBar = () => {
  
const [isNavBarVisible, setIsNavBarVisible] = useState(false);
  const navBarRef = useRef(null);

  const toggleNavBar = () => {
    setIsNavBarVisible(!isNavBarVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navBarRef.current && !navBarRef.current.contains(event.target)) {
        setIsNavBarVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navBarStyle = {
    display: isNavBarVisible ? "block" : "none",
  };
  return (
    <div ref={navBarRef}>
      <div className="navBarActivator" onClick={toggleNavBar}>
        <button>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <div className="navbar" style={navBarStyle}>
        <div className="navbar-logo">
          <img src="" alt="DrZPuerco" />
          <p>Pedro Cruz</p>
        </div>
        <ul className="navbar-list">
          <li className="navbar-item">
            <a href="/">Home</a>
          </li>
          <li className="navbar-item">
            <a href="/Proyectos">Proyectos</a>
          </li>
          <li className="navbar-item">
            <a href="/Contacto">Contacto</a>
          </li>
          <li className="navbar-item">
            <a href="/alohomora">Trasteo</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
