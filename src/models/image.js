const { Schema, model } = require('mongoose');

// Definición del esquema de la imagen
const imageSchema = new Schema({
    title: { type: String }, // Título de la imagen (tipo String)
    description: { type: String }, // Descripción de la imagen (tipo String)
    filename: { type: String }, // Nombre del archivo de la imagen (tipo String)
    path: { type: String }, // Ruta del archivo de la imagen (tipo String)
    originalname: { type: String }, // Nombre original del archivo de la imagen (tipo String)
    mimeType: { type: String }, // Tipo de contenido MIME de la imagen (tipo String)
    size: { type: Number }, // Tamaño del archivo de la imagen (tipo Number)
    created_at: { type: Date, default: Date.now() } // Fecha de creación de la imagen (tipo Date, valor por defecto: fecha actual)
});

// Exportación del modelo 'Image' basado en el esquema definido anteriormente
module.exports = model('Image', imageSchema);
