const express = require("express");
const router = express.Router();
const cartController = require("../controllers/controllerCart");

router.post("/crear", cartController.crearCarrito);
router.get("/:usuarioID", cartController.obtenerCarritos);
// router.get("/:usuarioID/:id", cartController.obtenerCarritobyID);
router.put("/actualizar/", cartController.actualizarCarrito);
router.delete("/vaciar/:usuarioID/:id", cartController.eliminarCarrito);

module.exports = router;
