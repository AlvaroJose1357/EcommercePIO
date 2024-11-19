const express = require("express");
const router = express.Router();
const userController = require("../controllers/controllerUser");
const middlewareAuth = require("../middleware/middlewareAuth");

router.post("/registro", userController.registrarUsuario); // Ruta para registrar un usuario
router.post("/iniciarsesion", userController.iniciarSesion); // Ruta para iniciar sesión
router.get("/perfil", middlewareAuth, userController.obtenerPerfilUsuario); // Ruta para obtener el perfil de un usuario
router.put("/perfil", middlewareAuth, userController.actualizarPerfilUsuario);
// router.get("/", userController.obtenerUsuarios); // Ruta para obtener todos los usuarios
// router.get("/:id", userController.obtenerUsuariobyID); // Ruta para obtener un usuario por ID
// router.put("/:id", userController.actualizarUsuarios); // Ruta para actualizar un usuario
// router.delete("/:id", userController.eliminarUsuarios); // Ruta para eliminar un usuario

module.exports = router;
