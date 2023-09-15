const mysql = require("mysql2");
const Usuario = require("../models/user"); 

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tienda_ropa", 
});

// Establece la conexión a la base de datos
db.connect();

class userRespository {
  // Método para agregar un nuevo usuario a la base de datos
  static agregarUsuario(id, nombre, email, contrasena) {
    // Consulta SQL para insertar un nuevo usuario en la tabla 'usuarios'
    const query =
      "INSERT INTO usuarios (id, nombre, email, contrasena) VALUES (?, ?, ?, ?)";
    db.query(query, [id, nombre, email, contrasena], (err, result) => {
      if (err) {
        // Maneja errores al registrar el usuario
        console.error("Error al registrar el usuario: " + err.message);
        return false;
      } else {
        // Registro de éxito al registrar el usuario
        console.log("Usuario registrado con éxito");
        return true;
      }
    });
  }

  // Método para registrar una compra de un producto por un usuario
  static comprarProducto(idUsuario, idProducto, cantidad, callback) {
    // Consulta SQL para registrar una compra en la tabla 'compras'
    const query =
      "INSERT INTO compras (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)";
    db.query(query, [idUsuario, idProducto, cantidad], (err, result) => {
      if (err) {
        // Maneja errores al registrar la compra
        console.error("Error al registrar la compra: " + err.message);
        callback();
        return false;
      } else {
        // Registro de éxito al registrar la compra
        console.log("Compra realizada con éxito");
        callback();
        return true;
      }
    });
  }

  // Método para obtener la información de un usuario por su ID
  static obtenerInformacionUsuario(idUsuario, callback) {
    // Consulta SQL para seleccionar un usuario por su ID
    const query = 'SELECT * FROM usuarios WHERE id = ?';
    db.query(query, [idUsuario], (err, result) => {
      if (err) {
        // Maneja errores al obtener la información del usuario
        console.error('Error al obtener la información del usuario: ' + err.message);
        callback(err, null);
      } else if (result.length === 0) {
        // Si no se encuentra ningún usuario con el ID especificado
        callback(null, null);
      } else {
        // Si se encuentra un usuario, devuelve sus datos
        const usuario = result[0]; // Suponiendo que el resultado es un solo usuario
        callback(null, usuario);
      }
    });
  }
}

module.exports = userRespository;
