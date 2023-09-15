const mysql = require("mysql2");
const Producto = require("../models/product"); // objeto

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tienda_ropa", // Nombre de la base de datos
});

// Establecer la conexión a la base de datos
connection.connect();

class ProductoRepository {
  // Método para obtener los productos
  static obtenerTodosLosProductos(callback) {
    // selecciona todos los productos de la tabla "productos"
    connection.query("SELECT * FROM productos", (error, results) => {
      if (error) throw error;

      // Mapea los resultados de la consulta a objetos de la clase Producto
      const productos = results.map(
        (row) => new Producto(row.id, row.nombre_producto, row.precio_producto, row.descripcion_producto, row.stock_producto)
      );
      // Llama a la función de devolución de llamada (callback) con la lista de productos
      callback(productos);
    });
  }

  // Método para obtener un producto por su ID
  static obtenerProductoPorId(id, callback) {
    // Realiza una consulta SQL para seleccionar un producto con el ID proporcionado
    connection.query(
      "SELECT * FROM productos WHERE id = ?",
      [id],
      (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
          // Si se encontró un producto, crea un objeto Producto con los datos y llama a la función de devolución de llamada
          const productoData = results[0];
          const producto = new Producto(
            productoData.id,
            productoData.nombre_producto,
            productoData.precio_producto,
            productoData.descripcion_producto,
            productoData.stock_producto
          );
          callback(producto);
        } else {
          // Si no se encontró un producto con el ID proporcionado, llama a la función de devolución de llamada con null
          callback(null);
        }
      }
    );
  }

  // Método para agregar un nuevo producto a la base de datos
  static agregarNuevoProducto(producto, callback) {
    // Realiza una consulta SQL para insertar un nuevo producto en la tabla 'productos'
    connection.query(
      "INSERT INTO productos (nombre_producto, descripcion_producto, precio_producto, stock_producto) VALUES (?, ?, ?, ?)",
      [
        producto.nombre,
        producto.descripcion,
        producto.precio,
        producto.stock,
      ],
      (error, results) => {
        if (error) throw error;

        // Obtiene el ID del nuevo producto insertado y llama a la función de devolución de llamada con ese ID
        const nuevoIdProducto = results.insertId;
        callback(nuevoIdProducto);
      }
    );
  }

}

module.exports = ProductoRepository;
