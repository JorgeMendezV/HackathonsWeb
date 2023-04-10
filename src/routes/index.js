const { Router } = require('express');
const router = Router();

const Image = require('../models/image')


router.get('/', async(req, res) => {
    const images = await Image.find();
    res.render('index', {images});
    console.log("carga las imagenes"+images)
});

router.get('/upload', (req, res) => {
    res.render('upload');
});

// evento o peticion post

router.post('/upload', async (req, res) => {
    const image =new Image();
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

    //console.log(req.file);
    //res.send('uploaded');
});

router.get('/image/:id', (req, res) => {
    res.send('Profile image');
});

router.get('/image/:id/delete', (req, res) => {
    res.send('Image deleted');
});

module.exports = router;