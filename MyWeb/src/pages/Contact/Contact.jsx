import React, { useState } from "react";
import './ContactForm.css';
const { VITE_API_URL } = import.meta.env;
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
      const response = await fetch(`${VITE_API_URL}/contact`, {
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
      <div className="horizont">
      <p>¡Gracias por visitar mi página web! Espero que hayas disfrutado explorando todo lo que tengo para ofrecer. Tu interés es muy valioso para mí.
<br /><br />
Estoy disponible y emocionado para trabajar en proyectos colaborativos, ya sea como asalariado o como profesional autónomo. Mi experiencia y dedicación me permiten abordar desafíos con creatividad y compromiso. Si tienes algún proyecto en mente o necesitas ayuda en alguna iniciativa, estaré encantado de escucharte y discutir cómo puedo contribuir a su éxito.
<br /><br />
No dudes en completar el formulario a continuación para ponerte en contacto conmigo. Estoy ansioso por conocer más sobre tus necesidades y explorar las posibles oportunidades de colaboración. ¡Gracias de nuevo y espero saber de ti pronto!</p>
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

      
      </div>
    </div>
  );
};

export default ContactForm;
