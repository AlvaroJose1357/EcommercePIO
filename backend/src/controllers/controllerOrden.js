const Orden = require("../models/modelOrden");
const Cart = require("../models/modelCart");
const { pool } = require("../config/baseDatosPg");

exports.crearOrdenDesdeCarrito = async (req, res) => {
  const { usuarioID } = req.params;
  try {
    // Verifica que el usuarioID sea válido
    if (isNaN(usuarioID)) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }

    // Valida si el usuario existe en la base de datos PostgreSQL
    const usuarioResult = await pool.query(
      "SELECT * FROM usuarios WHERE id = $1",
      [usuarioID]
    );
    if (usuarioResult.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado en PostgreSQL" });
    }

    // Busca el carrito asociado al usuario en MongoDB
    const carrito = await Cart.findOne({
      usuarioID: parseInt(usuarioID),
    }).populate("productos.producto");

    if (!carrito) {
      return res.status(404).json({
        message: "Carrito no encontrado para el usuario especificado",
      });
    }

    // Procesa los productos y calcula el total
    let total = 0;
    const productosOrden = carrito.productos.map((producto) => {
      const precio = producto.producto.precio * producto.cantidad;
      total += precio;
      return {
        producto: producto.producto._id,
        cantidad: producto.cantidad,
        precio,
      };
    });

    // Crea la nueva orden
    const nuevaOrden = new Orden({
      usuarioID: parseInt(usuarioID),
      carrito: carrito._id, // Asegúrate de usar el campo `carrito`
      productos: productosOrden,
      total,
    });

    await nuevaOrden.save();

    // Vacía el carrito después de crear la orden
    await Cart.findByIdAndUpdate(carrito._id, { productos: [] }); // Usa `carrito._id`

    res.status(201).json(nuevaOrden);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la orden en el servidor",
      error: error.message,
    });
  }
};

exports.obtenerOrden = async (req, res) => {
  const { ordenID } = req.params;
  try {
    const orden = await Orden.findById(ordenID).populate("productos.producto");
    if (!orden) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    res.status(200).json({ message: "Orden encontrada", orden });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las ordenes en el servidor",
      error: error.message,
    });
  }
};
/*
exports.obtenerOrdenbyID = async (req, res) => {
  try {
    const orden = await Orden.findById(req.params.id);
    if (!orden) {
      return res.status(404).json({ mensaje: "Orden no encontrada" });
    }
    res.status(200).json(orden);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener la orden en el servidor",
      error: error.message,
    });
  }
};

exports.actualizarOrden = async (req, res) => {
  try {
    const ordenActualizada = await Orden.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(ordenActualizada);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar la orden en el servidor",
      error: error.message,
    });
  }
};

exports.eliminarOrden = async (req, res) => {
  try {
    await Orden.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: "Orden eliminada" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar la orden en el servidor",
      error: error.message,
    });
  }
};
*/
