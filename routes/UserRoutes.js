const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const upload = require('../cloudinary/multer');

// Definimos las rutas y conectamos con los controsladores
router.get('/user', UserController.getUser);
router.post('/user/register', UserController.createUser);
router.get('/user/:id', UserController.getUserById);

module.exports = router;
