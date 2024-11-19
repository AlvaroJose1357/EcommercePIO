const mongoose = require("mongoose");

const OrdenSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  carrito: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },
  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      cantidad: { type: Number, required: true },
      precio: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  estado: {
    type: String,
    enum: ["pendiente", "enviado", "entregado", "cancelado"],
    default: "pendiente",
  },
  fechaCreacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Orden", OrdenSchema);
