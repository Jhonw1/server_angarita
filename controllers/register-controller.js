const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');

// Registra un usuario
let register = (req, res) => {
  const { id, nombre, email, contrasena } = req.body;

  let valid = userRepository.agregarUsuario(id, nombre, email, contrasena);

  if (valid) {
    return res.status(201).send(
      { status: 'bad register' }
    );
  } else {
    return res.status(404).send(
      { status: 'register ok' }
    );
  }
}

// ver informacion usuario
let verPerfilUsuario = (req, res) => {
  const usuarioId = req.query.id;   //la id ingresa como parametro de consulta

  // Llama a la función de userRepository para obtener la información del usuario
  userRepository.obtenerInformacionUsuario(usuarioId, (error, usuario) => {
    if (error) {
      res.status(500).json({
        message: "Error al obtener la información del usuario",
      });
    } else if (!usuario) {
      res.status(404).json({
        message: "Usuario no encontrado",
      });
    } else {
      const { id, nombre, email } = usuario; // Extrae solo los datos relevantes del usuario
      res.status(200).json({
        message: "Información de perfil obtenida con éxito",
        usuario: { id, nombre, email }, // Devuelve la información del usuario
      });
    }
  });
};

module.exports = {
  register,
  verPerfilUsuario
}
