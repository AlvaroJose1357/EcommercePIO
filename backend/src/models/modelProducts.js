const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String },
  stock: { type: Number, default: 0 },
  imagenURL: { type: String },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CategoryProduct",
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
