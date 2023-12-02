import React, { useState } from "react";
import './ContactForm.css'
const { VITE_API_URL } = import.meta.env;
const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      nombre: name,
      email,
      telefono: phoneNumber,
      mensaje: message,
    };

    try {
      const response = await fetch(`${VITE_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Puedes realizar otras acciones aquí, como mostrar un mensaje de éxito al usuario.
      } else {
        // Manejo de errores: Muestra un mensaje de error al usuario o toma otra acción.
        console.error("Error al enviar el formulario");
      }
    } catch (error) {
      // Manejo de errores de red: Muestra un mensaje de error al usuario o toma otra acción.
      console.error("Error de red:", error);
    }
  };

  return (
    <div>
      <h2>Contacto</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Mensaje:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ContactForm;
