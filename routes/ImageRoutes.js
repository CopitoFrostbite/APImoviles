const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/ImageController');
const upload = require('../cloudinary/multer');

// Definimos las rutas y conectamos con los controladores
//router.get('/user', UserController.getUser);

// Ruta para subir una sola imagen
router.post('/journals/:journalId/image', upload.single('image'), ImageController.addImageToEntry);
// Ruta para subir múltiples imágenes
router.post('/journals/:journalId/images', upload.array('images', 10), ImageController.uploadJournalImages);

module.exports = router;
