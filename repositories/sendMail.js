const nodemailer = require('nodemailer');
const mysql = require("mysql2");
const express = require('express')
// Configuración del transportador de correo electrónico
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Servicio de correo electrónico que estás utilizando (puedes cambiarlo)
  auth: {
    user: 'jhonwilmar638@gmail.com', // Tu dirección de correo electrónico de Gmail
    pass: '12345678910', // Tu contraseña de Gmail
  },
});

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: "localhost", // direccion de servidor
  user: "root",
  password: "",
  database: "tienda_ropa",
});

// Establecer la conexión a la base de datos
db.connect();


// Función para enviar un correo electrónico al usuario
 const  enviarCorreo = (usuarioId, asunto, contenido)=>  {
  // Consulta la dirección de correo electrónico del usuario en la base de datos
  const query = 'SELECT email FROM usuarios WHERE id = ?';

  db.query(query, [usuarioId], (err, result) => {
    if (err || result.length === 0) {
      // Maneja errores al obtener la dirección de correo electrónico del usuario
      console.error('Error al obtener la dirección de correo electrónico del usuario: ' + err.message);
    } else {
      // Obtiene la dirección de correo electrónico del resultado de la consulta
      const emailUsuario = result[0].email;

      // Configura las opciones para el correo electrónico
      const opcionesCorreo = {
        from: 'tu_correo@gmail.com', // Tu dirección de correo electrónico (remitente)
        to: emailUsuario, // La dirección de correo electrónico del usuario (destinatario)
        subject: asunto, // El asunto del correo
        text: contenido, // El contenido del correo en formato de texto plano
      };
//message
      // Envía el correo electrónico utilizando el transportador
      transporter.sendMail(opcionesCorreo, (error, info) => {
        if (error) {
          // Maneja errores al enviar el correo electrónico
          console.error('Error al enviar el correo electrónico: ' + error.message);
        } else {
          // Registro de éxito al enviar el correo electrónico
          console.log('Correo electrónico enviado con éxito: ' + info.response);
        }
      });
    }
  });
}
module.exports =  {enviarCorreo}
