const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hackathons = require('../API/hackathons');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('../API/hackathons', hackathons);

mongoose.connect(
    'mongodb://192.168.100.41/hackaele'
    , { useNewUrlParser: true },
    (err, res) => {
        err && console.log("Error conectando a la bd");

        app.listen(4000, () => {
            console.log("El servidor correindo en 192.168.100.41:4000");

        });
    }
);