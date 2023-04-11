const { Router } = require('express');
const path = require('path');
const router = Router();
const { unlink } = require('fs-extra');

const Image = require('../models/Image');

router.get('/', async (req, res) => {
    const images = await Image.find();
    console.log(" ???? carga las imagenes ???" + images)
    res.render('index', { images });
});

router.get('/upload', (req, res) => {
    res.render('upload');
});

// evento o peticion post

router.post('/upload', async (req, res) => {
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimeType = req.file.mimeType;
    image.size = req.file.size;

    // esto es una operacion asincrona, por lo que se puede ocupar
    // varias opciones para handleldiar esto. Usaremos async
    // en lugar de utilizar promesas.
    await image.save();

    // redireccionar vista inicial
    res.redirect('/')

    console.log(req.file);
    //res.send('uploaded');
});

// consulta asincrona
router.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    console.log('Mostrando imagen seleccionada por id ' + image);
    res.render('cards', { image });
});

const fs = require('fs').promises;

router.get('/image/:id/delete', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findByIdAndDelete(id);
    if (image) {
        const imagePath = path.join(__dirname, '../public', image.path);
        console.log('Ruta de imagen: ' + imagePath);
        try {
            await fs.access(imagePath);
            await fs.unlink(imagePath);
            console.log('Imagen eliminada con éxito');
        } catch (error) {
            console.error(`Error al eliminar la imagen: ${error}`);
        }
    }
    res.redirect('/')
});

module.exports = router;