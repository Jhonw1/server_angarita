const bcrypt = require('bcryptjs');  // Importa la biblioteca para el hash de contraseñas
const signingKey = require('../config/keys');  // Importa la clave de firma (signing key)
const generateToken = require('../helpers/generator-token');  // Importa la función para generar tokens JWT

// Función para autenticación
let auth = (req, res) => {
  let email = req.body.email;  // Obtiene el correo electrónico desde la solicitud
  let password = req.body.password;  // Obtiene la contraseña desde la solicitud
  let rol = req.body.rol;  // Obtiene el rol desde la solicitud
  console.log("Email", email);  // Imprime el correo electrónico en la consola
  console.log("Password", password);  // Imprime la contraseña en la consola

  // Genera un token JWT con información de correo electrónico y rol, con una fecha de vencimiento
  let token = generateToken(
    { email: email, rol: rol }, signingKey.SIGNING_KEY_TOKEN,
    new Date().getTime() + (100 * 60 * 1000)  // El token expirará en 100 minutos
  );

  // Configuración de la cookie para el token de actualización
  let cookieConfig = {
    domain: 'localhost',
    path: '/refresh', 
    secure: false,  
    expires: new Date(Date.now() + 300000),
    httpOnly: true, 
    signed: true 
  }

  return res.status(200).cookie('refresh_token', email, cookieConfig)
    .json({
      status: 'Successful authentication', token: token
    });
}

module.exports = {
  auth
}
