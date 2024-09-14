const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');


const productos = require('./modules/productos/routes');
const users = require('./modules/users/routes');
const auth = require('./modules/auth/routes');
const error = require('./red/errors');

const app = express();
app.use(cors());
// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Configuración
app.set('port', config.app.port);

// Rutas

app.use('/api/productos', productos);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

module.exports = app;