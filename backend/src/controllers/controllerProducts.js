const Product = require("../models/modelProducts");

exports.crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Product(req.body);
    await nuevoProducto.save();
    // res.status(201).json({ success: true, data: nuevoProducto });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el producto en el servidor",
      error: error.message,
    });
  }
};

exports.obtenerProductos = async (req, res) => {
  try {
    // lo que hace populate es traer la información de la categoría
    const productos = await Product.find().populate("categoria");
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los productos en el servidor",
      error: error.message,
    });
  }
};

exports.obtenerProductobyID = async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el producto en el servidor",
      error: error.message,
    });
  }
};

exports.actualizarProducto = async (req, res) => {
  try {
    const productoActualizado = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(productoActualizado);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el producto en el servidor",
      error: error.message,
    });
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el producto en el servidor",
      error: error.message,
    });
  }
};
