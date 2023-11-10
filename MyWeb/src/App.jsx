import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminPanel from "./pages/AdminPanel/AdminPanel.jsx";
import Home from "./pages/Home/Home.jsx";
import Proyectos from "./pages/Proyectos/Proyectos.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Notifications from "./componentes/Notifications/Notifications.jsx";
import NavBar from "./componentes/NavBar/NavBar.jsx";
import AdminLogin from "./pages/AdminLogin/AdminLogin.jsx";

import "./App.css"






function App() {
 

  return (
     <div className="cmplt-app">
      
        <NavBar />
      <div className="content-container">
        <Notifications />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/alohomora" element={<AdminLogin />} />
        <Route path="/trasteo" element={<AdminPanel />} />
      </Routes>
    </div>
    </div>
  );
}

export default App;