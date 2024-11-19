const Orden = require("../models/modelOrden");
const Cart = require("../models/modelCart");

exports.crearOrdenDesdeCarrito = async (req, res) => {
  const { usuarioID } = req.params;
  try {
    const carrito = await Cart.findOne({ usuarioID: usuarioID }).populate(
      "productos.producto"
    );
    if (!carrito) {
      return res.status(404).json({ mensaje: "Carrito no encontrado" });
    }
    let total = 0;
    const productosOrden = carrito.productos.map((producto) => {
      const precio = producto.producto.precio * producto.cantidad;
      total += precio;
      return {
        producto: producto.producto,
        cantidad: producto.cantidad,
        precio: precio,
      };
    });
    const nuevaOrden = new Orden({
      usuarioID: usuarioID,
      carritoID: carrito._id,
      productos: productosOrden,
      total: total,
    });
    await nuevaOrden.save();
    await Cart.findByIdAndUpdate({ usuarioID: usuarioID }, { productos: [] });
    res.status(201).json(nuevaOrden);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear la orden en el servidor",
      error: error.message,
    });
  }
};

exports.obtenerOrden = async (req, res) => {
  const { usuarioID, ordenID } = req.params;
  try {
    const ordenes = await Orden.findOne({
      _id: ordenID,
      usuarioID: usuarioID,
    }).populate("productos.producto");
    if (!ordenes) {
      return res.status(404).json({ mensaje: "Ordenes no encontradas" });
    }
    res.status(200).json(ordenes);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las ordenes en el servidor",
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
