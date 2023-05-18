// Importación de los módulos y paquetes necesarios
const express = require('express'); // Framework web de Node.js
const mongoose = require('mongoose'); // ODM para MongoDB
const morgan = require('morgan'); // Middleware para el registro de solicitudes HTTP en la consola
const multer = require('multer'); // Middleware para el manejo de carga de archivos
const { v4: uuid } = require('uuid'); // Generación de identificadores únicos
const { format } = require('timeago.js'); // Formateo de fechas en formato legible
const path = require('path'); // Funciones para manejar rutas de archivos

const app = express(); // Creación de una instancia de la aplicación Express


// Global variables
// Configuración para mostrar una fecha más legible para las fechas de las hackathones
app.use((req, res, next) => {
    app.locals.format = format;
    next();
});

// Creación del servidor HTTP y tipos de datos estaticos
const http = require('http');
const mime = require('mime-types');
const server = http.createServer(app);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

// Configuración
app.set('views', path.join(__dirname, 'views')); // Configuración de la carpeta de vistas
app.set('view engine', 'ejs'); // Configuración del motor de vistas EJS
app.set('port', process.env.PORT || 3000); // Configuración del puerto del servidor

// Un middleware en el contexto de una aplicación web 
//es una función o conjunto de funciones que se ejecutan 
//antes de que lleguen a su destino final las solicitudes del cliente y las respuestas del servidor.
// Middlewares
app.use(morgan('dev')); // Middleware para el registro de solicitudes HTTP en la consola
app.use(express.urlencoded({ extended: false })); // Middleware para el análisis de datos de formulario
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'), // Directorio de destino para subir imágenes
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuid() + path.extname(file.originalname)); // Generación de un nombre único para el archivo de imagen
    }
});
app.use(multer({ storage }).single('image')); // Middleware para el manejo de carga de archivos de imagen con Multer

// Rutas
app.use(require('./routes/index')); // Middleware para las rutas de la aplicación
require('./database'); // Importación y ejecución de la configuración de la base de datos

// Archivos estáticos
app.use(express.static(path.join(__dirname, '/public'))); // Middleware para servir archivos estáticos desde la carpeta 'public'
