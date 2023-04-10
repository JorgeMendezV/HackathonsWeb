// Initializations
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const multer = require('multer');
const { v4: uuid } = require('uuid');

const path = require('path');



const app = express();
require('./database');

// Settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

// Widdlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuid() + path.extname(file.originalname));
    }
}) 
app.use(multer({storage}).single('image'));

// Global variables

// start the server
const http = require('http');
const mime = require('mime-types');
const server = http.createServer(app);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});


// statics files
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use(require('./routes/index'));