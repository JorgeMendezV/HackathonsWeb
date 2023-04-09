const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hackathons = require('../API/hackathons');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('../API/hackathons', hackathons);

// Si no conecta se debe verificar si el servidor acepta en su bindIp sea la IP del servidor.
// el puerto siempre sera 27017
mongoose.connect('mongodb://192.168.100.41:27017/hackaele'
    , { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.log('Error al conectar a MongoDB:', err));

    const http = require('http');
    const fs = require('fs');
    const path = require('path');
    
    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use(express.static(path.join(__dirname, '..', 'node_modules')));

    const server = http.createServer((req, res) => {
      // Obtén la ruta del archivo solicitado
      const filePath = path.join(__dirname, '..', 'public', 'index.html');
    
      // Verifica si el archivo solicitado existe
      fs.exists(filePath, exists => {
        if (exists) {
          // Lee el archivo y envía su contenido como respuesta
          fs.readFile(filePath, (err, data) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end(`Error interno del servidor: ${err}`);
            } else {
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(data);
            }
          });
        } else {
          // Si el archivo no existe, envía un error 404
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Archivo no encontrado');
        }
      });
    });
    
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`Servidor ejecutándose en http://localhost:${port}`);
    });

    // se asegura que los archivos puedo utilizar el path public
