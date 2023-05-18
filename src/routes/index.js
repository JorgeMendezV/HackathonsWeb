const { Router } = require('express');
const path = require('path');
const router = Router();
const { unlink } = require('fs-extra');
const { upload } = require('./index'); // Importa el middleware upload desde index.js


const Image = require('../models/Image');

// GET - MAIN PAGE - redirecciona a la pagina principal de las view
// se hace una peticio asyncrona para cargar las imagenes
router.get('/', async (req, res) => {
    const images = await Image.find();
    // revisando si las imagenes cargan
    // console.log(" ???? carga las imagenes ???" + images)
    // se hace un render al inicio
    res.render('index', { images });
});


// INSERT - SECCION DE INSERCION DE DATOS
// Redirecciona a la pagina de upload
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


// READ - CONSULTA LOS DATOS EXISTENTES EN LA BASE DE DATOS
// consulta asincrona
router.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    console.log('Mostrando imagen seleccionada por id ' + image);
    res.render('cards', { image });
});



// DELETE - REALIZA LA ELIMINACION SEGUN EL ID DE LOS JSON
// Modulo fs File System importado
const fs = require('fs').promises;
router.get('/image/:id/delete', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findByIdAndDelete(id);
    if (image) {
        // Crear una constante para el path de la imagen
        const imagePath = path.join(__dirname, '../public', image.path);
        //console.log('Ruta de imagen: ' + imagePath);
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

// UPDATE - Accediendo a la vista update.ejs
router.get('/image/:id/update', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    res.render('update', { image });
  });
  
  router.post('/image/:id/update', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
  
    try {
      const image = await Image.findById(id);
  
      // Verificar si se ha enviado un nuevo archivo de imagen
      if (req.file) {
        // Eliminar la imagen anterior si existe
        if (image.path) {
          const imagePath = path.join(__dirname, '../public', image.path);
          await fs.unlink(imagePath);
          console.log('Imagen anterior eliminada con éxito');
        }
  
        // Actualizar la información del nuevo archivo de imagen
        image.filename = req.file.filename;
        image.path = '/img/uploads/' + req.file.filename;
        image.originalname = req.file.originalname;
        image.mimeType = req.file.mimetype;
        image.size = req.file.size;
      }
  
      // Actualizar los campos de la imagen
      image.title = title;
      image.description = description;
  
      await image.save();
      console.log('Datos de imagen actualizados con éxito');
    } catch (error) {
      console.error(`Error al actualizar los datos de la imagen: ${error}`);
    }
  
    res.redirect('/');
  });
  
  


// Modulos exportados
module.exports = router;