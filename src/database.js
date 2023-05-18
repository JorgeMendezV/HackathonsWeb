// paquete mongoose para conectarse a una base de datos MongoDB y manejar la conexión
const mongoose = require('mongoose');

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/hackaele', {
    useNewUrlParser: true,
})
    .then(db => console.log('DB is connected')) // Si la conexión es exitosa, se muestra un mensaje de confirmación en la consola
    .catch(err => console.error(err)); // Si hay algún error durante la conexión, se muestra el error en la consola
