const express = require('express');
const productController = require('../controllers/product-controller');
const router = express.Router()

// Ruta para actualizar un producto. Requiere autenticación JWT de administrador.
router.post('/', productController.ActualizarProd);


module.exports = router; 