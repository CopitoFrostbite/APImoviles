const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/ImageController');
const upload = require('../cloudinary/multer');

// Definimos las rutas y conectamos con los controladores

// Ruta para subir una sola imagen
router.post('/entries/:entryId/images', upload.single('image'), ImageController.addImageToEntry);
router.delete('/image/:imageId', ImageController.deleteImage);
router.put('/image/:imageId/delete', ImageController.markImageAsDeleted);

module.exports = router;
