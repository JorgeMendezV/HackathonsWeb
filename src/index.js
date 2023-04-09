// Initializations
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const multer = require('multer');
const ejs = require('ejs');
const { v4: uuidv4 } = require('uuid');

const app = express();
require('./database');

// start the server
const http = require('http');
const path = require('path');
const mime = require('mime-types');
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

// Settings

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// Widdlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
// guardara las imagenes en una ruta predeterminada, aunque no exista.

// cambiando parametros a multer ocupando uuid para nombre de imagenes unicas
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/img/uploads'),
    filename:(req, file, cb, filename) =>{
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

//ID generado por Multer
app.use(multer({ storage: storage }).single('image'));



// Global variables

// Routes
app.use(require('./routes/index'))

// statics files
