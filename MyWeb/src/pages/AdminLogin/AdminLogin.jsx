import axios from "axios";

import React, { useState } from "react";

const baseURL = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";
import { TOKEN_LOCAL_STORAGE_KEY } from "../../utils/constants";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post(`${baseURL}/trasteo/alohomora`,{
        password
      })

      if(response.status === 200) {
        localStorage.setItem (TOKEN_LOCAL_STORAGE_KEY, response.data.data.token)
        console.log("Login exitoso")
        navigate("/trasteo")
        window.location.reload()
      }else{
        setError('Contraseña incorrecta')
      }
    }catch(err){
      setError('Error en la solicitud de Login')
    }

  }

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
          />
        </div>
        <button type="submit">Login</button>
      </form>

     
    </div>
  );
}

export default AdminLogin;
