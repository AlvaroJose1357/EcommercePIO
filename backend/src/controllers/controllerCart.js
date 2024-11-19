const Cart = require("../models/modelCart");
const Product = require("../models/modelProducts");

exports.crearCarrito = async (req, res) => {
  const { usuarioID, productos } = req.body;
  try {
    const productosIds = productos.map((p) => p.producto);
    const productosValidos = await Product.find({
      _id: { $in: productosIds },
    });
    if (productosValidos.length !== productosIds.length) {
      return res
        .status(400)
        .json({ message: "Uno o más productos no son válidos" });
    }
    const nuevoCarrito = new Cart(usuarioID, productos);
    await nuevoCarrito.save();
    res
      .status(201)
      .json({ message: "Carrito creado exitosamente", carrito: nuevoCarrito });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el carrito en el servidor",
      error: error.message,
    });
  }
};

exports.obtenerCarritos = async (req, res) => {
  const { usuarioID } = req.params;
  try {
    const carritos = await Cart.findOne({
      usuario: usuarioID,
    }).populate("productos.producto");
    if (!carritos) {
      return res.status(404).json({ message: "Carritos no encontrados" });
    }
    res.status(200).json(carritos);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los carritos en el servidor",
      error: error.message,
    });
  }
};

// exports.obtenerCarritobyID = async (req, res) => {
//   try {
//     const carrito = await Cart.findById(req.params.id);
//     if (!carrito) {
//       return res.status(404).json({ mensaje: "Carrito no encontrado" });
//     }
//     res.status(200).json(carrito);
//   } catch (error) {
//     res.status(500).json({
//       mensaje: "Error al obtener el carrito en el servidor",
//       error: error.message,
//     });
//   }
// };

exports.actualizarCarrito = async (req, res) => {
  const { usuarioID, productos } = req.body;
  try {
    const productosIds = productos.map((p) => p.producto);
    const productosValidos = await Product.find({
      _id: { $in: productosIds },
    });
    if (productosValidos.length !== productosIds.length) {
      return res
        .status(400)
        .json({ message: "Uno o más productos no son válidos" });
    }
    const carritoActualizado = await Cart.findByIdAndUpdate(
      { usuarioID },
      { productos },
      { new: true }
    );
    if (!carritoActualizado) {
      return res.status(404).json({ mensaje: "Carrito no encontrado" });
    }
    res
      .status(200)
      .json({ message: "Carrito actualizado", carrito: carritoActualizado });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el carrito en el servidor",
      error: error.message,
    });
  }
};

exports.eliminarCarrito = async (req, res) => {
  const { usuarioID } = req.params;
  try {
    const carritoEliminado = await Cart.findOneAndUpdate(
      { usuarioID },
      { productos: [] },
      { new: true }
    );
    if (!carritoEliminado) {
      return res.status(404).json({ mensaje: "Carrito no encontrado" });
    }
    res
      .status(200)
      .json({ message: "Carrito eliminado", carrito: carritoEliminado });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el carrito en el servidor",
      error: error.message,
    });
  }
};
