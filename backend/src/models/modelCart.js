const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
