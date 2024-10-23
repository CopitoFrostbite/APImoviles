const { request } = require('express');
const User = require('../models/UserModel');


const getUser = async (req, res) => {
    console.log('Function: getAllUsers');
    res.send('getAllUsers');
  };
  
  
  const createUser = async (req, res) => {
    const { username, name, lastname, email, password } = req.body;
  
    try {
      if (!email || !password || !username || !name || !lastname) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
      }
      console.log("Iniciando creación de usuario...");
      const avatar = req.file;
      console.log("Archivo recibido:", avatar); // Verifica si se recibe el archivo
  
      if (!avatar) {
        return res.status(400).json({ message: 'No se subió ningún archivo' });
      }
  
      // Los detalles de la imagen subida están disponibles en req.file
      const newUser = new User({
        username,
        name,
        lastname,
        email,
        password,
        avatar: {
          public_id: avatar.filename,  // Este es el public_id generado por Cloudinary
          url_image: avatar.path       // Esta es la URL de la imagen subida
        }
      });
  
      // Guardar el nuevo usuario en la base de datos
      await newUser.save();
  
      // Preparar la respuesta transformada
      const transformedUser = {
        userId: newUser._id,
        username: newUser.username,
        name: newUser.name,
        lastname: newUser.lastname,
        email: newUser.email,
        profilePicture: newUser.avatar.url_image
      };
  
      res.status(201).json({ message: 'Usuario creado con éxito', user: transformedUser });
    } catch (error) {
      console.error("Error al crear el usuario:", error); // Log más detallado del error
      res.status(500).json({ message: 'Error al intentar crear el usuario', error: error.message });
    }
  };

  const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Verificar que todos los datos requeridos están presentes
      if (!email || !password) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
      }
  
      // Buscar el usuario en la base de datos
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
      }
  
      // Verificar la contraseña sin bcrypt
      if (user.password !== password) {
        return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
      }
  
      // Transformar el objeto de usuario
      const transformedUser = {
        userId: user._id.toString(),
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        profilePicture: user.avatar.url_image
      };
  
      // Devolver una respuesta adecuada
      res.status(200).json(transformedUser);
      console.log("Response Object:", { message: 'Inicio de sesión exitoso', user: transformedUser });
  
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      res.status(500).json({ message: 'Error al intentar iniciar sesión', error: error });
    }
  };
  

  const getUserById = async (req, res) => {
    console.log('Function: getProductById');
    res.send('getProductById');
  };
  
  module.exports = { getUser,loginUser, createUser, getUserById };
  