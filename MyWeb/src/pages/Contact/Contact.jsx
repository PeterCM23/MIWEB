import React, { useState } from "react";
import './ContactForm.css';
const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/ruta-al-controlador", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status === "ok") {
        setMessage(result.message);
      } else {
        setMessage("Error al enviar el mensaje.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error al enviar el mensaje.");
    }
  };

  return (
    <div className="contact-content">
      <h1>Contacto</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="mensaje">Mensaje:</label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleInputChange}
          required
        ></textarea>

        <button type="submit">Enviar Mensaje</button>
      </form>

      <div>{message}</div>
    </div>
  );
};

export default ContactForm;
