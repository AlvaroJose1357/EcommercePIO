const moongose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await moongose.connect(process.env.MONGO_URL);
    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("Error de conexión a la base de datos");
    process.exit(1);
  }
};

module.exports = connectDB;
