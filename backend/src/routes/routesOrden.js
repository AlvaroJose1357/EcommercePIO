const express = require("express");
const router = express.Router();
const ordenController = require("../controllers/controllerOrden");

router.post("/:usuarioID/crear", ordenController.crearOrdenDesdeCarrito);
router.get("/:usuarioID/orden/:ordenID", ordenController.obtenerOrden);
// router.get("/:id", ordenController.obtenerOrdenbyID);
// router.put("/:id", ordenController.actualizarOrden);
// router.delete("/:id", ordenController.eliminarOrden);

module.exports = router;
