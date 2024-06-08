const { request } = require('express');
const User = require('../models/UserModel');
const uploadImage = require('../cloudinary/cloudinary')

const getUser = async (req, res) => {
    console.log('Function: getAllProducts');
    res.send('getAllProducts');
  };
  
  
  const createUser = async (req, res) => {
    const { username, name, lastname, email, password } = req.body;
    
    try {
      // Verificar que todos los datos requeridos están presentes
      if (!email || !password || !username || !name || !lastname) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
      }
  
      // Verificar si se subió un archivo
      if (!req.files || !req.files.avatar) {
        return res.status(400).json({ message: 'No se subió ningún archivo' });
      }
  
      // Obtener el archivo
      const avatar = req.files.avatar;
  
      // Subir la imagen (aquí debes reemplazar 'uploadImage' con tu propia lógica de subida)
      const result = await uploadImage(avatar.tempFilePath);
  
      // Crear un nuevo usuario
      const newUser = new User({
        username: username,
        name: name,
        lastname: lastname,
        email: email,
        password: password,
        avatar: {
          public_id: result.public_id,
          url_image: result.secure_url
        }
      });
  
      // Guardar el nuevo usuario en la base de datos
      await newUser.save();

      const transformedUser = {
        userId: newUser._id,
        username: newUser.username,
        name: newUser.name,
        lastname: newUser.lastname,
        email: newUser.email,
        password: newUser.password,
        profilePicture: newUser.avatar.url_image
      };
      const response = { message: 'Usuario creado con éxito', user: transformedUser };
      res.status(201).json(response);
      console.log("Response Object:", response);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      res.status(500).json({ message: 'Error al intentar crear el usuario', error: error });
      
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
  