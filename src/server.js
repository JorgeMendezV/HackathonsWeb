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