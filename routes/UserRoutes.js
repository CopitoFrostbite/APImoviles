const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const upload = require('../cloudinary/multer');

// Definimos las rutas y conectamos con los controladores
router.get('/user', UserController.getUser);
router.post('/user/register', upload.single('avatar'), (req, res, next) => {
    console.log("Middleware de multer ejecutado, archivo recibido:", req.file);
    next();
  }, UserController.createUser);
router.post('/user/login', UserController.loginUser);
router.put('/user/:userId/mark_deleted', UserController.markUserAsDeleted);
router.put('/user/:id', UserController.updateUserData);
router.put('/user/:id/profile_picture', upload.single('avatar'), (req, res, next) => {
  console.log("Middleware de multer ejecutado para actualizar imagen, archivo recibido:", req.file);
  next();
}, UserController.updateProfileImage);

module.exports = router;
