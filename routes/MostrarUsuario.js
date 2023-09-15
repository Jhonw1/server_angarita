const express = require('express');
const registerController = require('../controllers/register-controller');
const router = express.Router()

// Ruta para mostrar el perfil de usuario.
router.get('/', registerController.verPerfilUsuario);


module.exports = router; 