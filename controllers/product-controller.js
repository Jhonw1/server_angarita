const ProductRepository = require("../repositories/productRepository");
const UserRepository = require("../repositories/userRepository");
const sendMail = require('../repositories/sendMail');
const ValidateAdmin = require('../middleware/ValidateAdmin');

// Obtiene todos los productos y los devuelve como respuesta en formato JSON
let ObtenerProds = (req, res) => {
  ProductRepository.obtenerTodosLosProductos((products) => {
    res.status(200).json(products);
  });
};

// Agrega un producto utilizando los datos proporcionados en el cuerpo de la solicitud y responde con un mensaje de éxito
let AgregarProd = (req, res) => {
  
  ValidateAdmin.njwtAuth(req,res, null)
  ProductRepository.agregarNuevoProducto(req.body, () => {
    res.status(200).json({
      message: "Producto registrado correctamente",
    });
  });
};

// Actualiza un producto utilizando los datos proporcionados en el cuerpo de la solicitud y responde con un mensaje de éxito
let ActualizarProd = (req, res) => {
  ValidateAdmin.njwtAuth(req,res, null)
  ProductRepository.updateProduct(req.body, () => {
    res.status(200).json({
      message: "Producto actualizado correctamente",
    });
  });
};

// Elimina un producto utilizando el ID proporcionado en la consulta y responde con un mensaje de éxito
let eliminarProd = (req, res) => {
  ValidateAdmin.njwtAuth(req,res, null)
  ProductRepository.eliminarProd(req.query.id, () => {
    res.status(200).json({
      message: "Producto eliminado correctamente",
    });
  });
};

// Realiza una compra de producto para un usuario y responde con un mensaje de éxito
let comprarProducto = (req, res) => {
  const usuarioId = req.body.usuarioId; // ID del usuario desde el cuerpo de la solicitud
  const productoId = req.body.productoId; // ID del producto desde el cuerpo de la solicitud
  const cantidad = req.body.cantidad; // Cantidad desde el cuerpo de la solicitud

  // Llama a UserRepository para realizar la compra
  UserRepository.comprarProducto(usuarioId, productoId, cantidad, () => {
    // Envía un correo de confirmación al usuario
    const asuntoCorreo = 'Compra realizada';
    const contenidoCorreo = 'Gracias por tu compra. Detalles de la compra: ...'; // Ajusta el contenido del correo según tus necesidades

    //sendMail.enviarCorreo(usuarioId, asuntoCorreo, contenidoCorreo);

    res.status(200).json({
      message: "Compra realizada con éxito",
    });
  });
};

module.exports = {
  ObtenerProds,
  AgregarProd,
  ActualizarProd,
  eliminarProd,
  comprarProducto
};
