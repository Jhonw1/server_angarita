const express = require('express');
const productController = require('../controllers/product-controller');
const router = express.Router();

// Ruta para obtener la lista de productos.
router.get('/', productController.ObtenerProds);


module.exports = router; 