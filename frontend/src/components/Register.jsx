import { useState } from "react";
import api from "../api/axiosConfig";

export default function Register() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    direccion: "",
    telefono: "",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/usuarios/registro", {
        nombre: name,
        correo: email,
        password,
        direccion,
        telefono,
      });
      console.log("Usuario registrado:", response.data);
      alert("Usuario registrado correctamente");
      setDireccion(initialValues.direccion);
      setEmail(initialValues.email);
      setName(initialValues.name);
      setPassword(initialValues.password);
      setTelefono(initialValues.telefono);
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
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Registrarse</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
