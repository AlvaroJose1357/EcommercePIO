const jwt = require("jsonwebtoken");

const middlewareAuth = () => {
  const token = req.header["authorization"]?.split("")[1];
  if (!token) {
    return res
      .status(403)
      .json({ message: "Acceso denegado, Se requiere token de autenticacion" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res
        .status(401)
        .json({ message: "Token no valido", error: error.message });
    }
    req.user = decoded;
    next();
  });
};

module.exports = middlewareAuth;

// exports.verifyToken = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ message: "Acceso denegado" });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: "Token no válido" });
//   }
// };

// exports.verifyAdmin = (req, res, next) => {
//   this.verifyToken(req, res, () => {
//     if (req.user.role === "admin") next();
//     else res.status(403).json({ message: "Permiso denegado" });
//   });
// };
