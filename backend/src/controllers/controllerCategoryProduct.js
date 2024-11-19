const CategoryProducts = require("../models/modelCategoryProduct");

exports.crearCategoriaProducto = async (req, res) => {
  try {
    const nuevaCategoriaProducto = new CategoryProducts(req.body);
    await nuevaCategoriaProducto.save();
    res.status(201).json(nuevaCategoriaProducto);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear la categoría de producto en el servidor",
      error: error.message,
    });
  }
};

exports.obtenerCategoriasProductos = async (req, res) => {
  try {
    const categoriasProductos = await CategoryProducts.find();
    res.status(200).json(categoriasProductos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las categorías de producto en el servidor",
      error: error.message,
    });
  }
};

// exports.obtenerCategoriaProductobyID = async (req, res) => {
//   try {
//     const categoriaProducto = await CategoryProducts.findById(req.params.id);
//     if (!categoriaProducto) {
//       return res
//         .status(404)
//         .json({ mensaje: "Categoría de producto no encontrada" });
//     }
//     res.status(200).json(categoriaProducto);
//   } catch (error) {
//     res.status(500).json({
//       mensaje: "Error al obtener la categoría de producto en el servidor",
//       error: error.message,
//     });
//   }
// };

exports.actualizarCategoriaProducto = async (req, res) => {
  try {
    const categoriaProductoActualizada =
      await CategoryProducts.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
    res.status(200).json(categoriaProductoActualizada);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar la categoría de producto en el servidor",
      error: error.message,
    });
  }
};

exports.eliminarCategoriaProducto = async (req, res) => {
  try {
    await CategoryProducts.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: "Categoría de producto eliminada" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar la categoría de producto en el servidor",
      error: error.message,
    });
  }
};
