const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  usuarioID: { type: String, required: true },
  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      cantidad: { type: Number, required: true },
    },
  ],
  fechaActualizacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Cart", CartSchema);
