import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/usuarios/iniciarsesion", {
        correo: email,
        password,
      });
      console.log("Inicio de sesion exitoso", response.data);
      const { token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem(
        "usuario",
        JSON.stringify({ nombre: response.data.nombre })
      );
      alert("Inicio de sesión exitoso");
      navigate("/productos");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Error en el servidor");
      }
      console.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Iniciar Sesión
        </h2>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
