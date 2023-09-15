const express = require('express');
const bodyParser = require('body-parser');
const validarToken = require('./routes/ObtenerAutenticacion'); 
const AgregarP = require('./routes/AgregarP'); 
const ActualizarProducto = require('./routes/ActualizarProducto'); 
const EliminarProducto = require('./routes/EliminarProducto');
const comprarProducto = require('./routes/comprarProducto'); 
const MostrarUsuario = require('./routes/MostrarUsuario'); 

const Registrarse = require('./routes/Registrarse'); 
const auth = require('./routes/ObtenerJwt'); 
const productos = require('./routes/ListaProductos'); 

const signingKey = require('./config/keys'); 
const cookieParser = require('cookie-parser'); 

const app = express()
  .use(bodyParser.json())
  .use(cookieParser(signingKey.SIGNING_KEY_COOKIE));

let port = 10101; 


app.use('/comprarProducto', comprarProducto); 
app.use('/MostrarUsuario', MostrarUsuario); 
app.use('/Registrarse', Registrarse); 
app.use('/EliminarProducto', EliminarProducto);
app.use('/ActualizarProducto', ActualizarProducto); 
app.use('/auth', auth); 
app.use('/productos', productos); 
app.use('/readToken', validarToken);
app.use('/AgregarP', AgregarP);


app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
