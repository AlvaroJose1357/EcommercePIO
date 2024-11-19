const { pool } = require("../config/baseDatosPg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registrarUsuario = async (req, res) => {
  const { nombre, correo, password, direccion, telefono, rol } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO usuarios (nombre, correo, password, direccion, telefono, rol) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [nombre, correo, hashedPassword, direccion, telefono, rol || "cliente"]
    );
    res.status(201).json({
      message: "Usuario creado exitosamente",
      usuario: newUser.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el Usuario en el servidor",
      error: error.message,
    });
  }
};

exports.iniciarSesion = async (req, res) => {
  const { correo, password } = req.body;
  try {
    const resultado = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [correo]
    );
    const usuario = resultado.rows[0];
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const passwordCorrect = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrect) {
      return res.status(404).json({ message: "Contraseña incorrecta" });
    }
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    res.status(500).json({
      message: "Error al iniciar sesión en el servidor",
      error: error.message,
    });
  }
};

exports.obtenerPerfilUsuario = async (req, res) => {
  const userId = req.user.id;
  try {
    const resultado = await pool.query(
      "SELECT id, nombre, correo, direccion, telefono, rol, fecha_creacion FROM usuarios WHERE id = $1",
      [userId]
    );
    if (resultado.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ usuario: resultado.rows[0] });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el perfil del Usuario en el servidor",
      error: error.message,
    });
  }
};

// Actualizar perfil de usuario
exports.actualizarPerfilUsuario = async (req, res) => {
  const userId = req.user.id;
  const { nombre, correo, direccion, telefono, rol } = req.body;
  try {
    const resultado = await pool.query(
      "UPDATE usuarios SET nombre = $1, correo = $2, direccion = $3, telefono = $4, rol = $5 WHERE id = $6 RETURNING *",
      [nombre, correo, direccion, telefono, rol, userId]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    return res
      .status(200)
      .json({ mensaje: "Perfil actualizado", usuario: resultado.rows[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al actualizar el perfil", error: error.message });
  }
};

// exports.obtenerUsuarios = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error al obtener los Usuarios en el servidor",
//       error: error.message,
//     });
//   }
// };

// exports.obtenerUsuariobyID = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "Usuario no encontrado" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error al obtener el Usuario en el servidor",
//       error: error.message,
//     });
//   }
// };

// exports.actualizarUsuarios = async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error al actualizar el Usuario en el servidor",
//       error: error.message,
//     });
//   }
// };

// exports.eliminarUsuarios = async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error al eliminar el Usuario en el servidor",
//       error: error.message,
//     });
//   }
// };
