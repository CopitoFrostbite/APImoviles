const { request } = require('express');
const User = require('../models/UserModel');

  
  const createUser = async (req, res) => {
    const { username, name, lastname, email, password } = req.body;
  
    try {
      if (!email || !password || !username || !name || !lastname) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
      }
      console.log("Iniciando creación de usuario...");
      const avatar = req.file;
      console.log("Archivo recibido:", avatar); 
  
      if (!avatar) {
        return res.status(400).json({ message: 'No se subió ningún archivo' });
      }
  
      
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
      console.error("Error al crear el usuario:", error); 
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
  
      // Devolver una respuesta
      res.status(200).json(transformedUser);
      console.log("Response Object:", { message: 'Inicio de sesión exitoso', user: transformedUser });
  
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      res.status(500).json({ message: 'Error al intentar iniciar sesión', error: error });
    }
  };

  const markUserAsDeleted = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        user.isDeleted = true;  
        await user.save();

        res.status(200).json({ message: 'Usuario marcado como eliminado', userId: user._id.toString() });
    } catch (error) {
        console.error("Error al marcar usuario como eliminado:", error);
        res.status(500).json({ message: 'Error al intentar eliminar usuario', error: error.message });
    }
};

  const updateUserData = async (req, res) => {
    const { id } = req.params;
    const { username, name, lastname } = req.body;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Actualizar los datos del usuario
      user.username = username || user.username;
      user.name = name || user.name;
      user.lastname = lastname || user.lastname;
      
  
      await user.save();
  
      // Estructura de respuesta para actualizar la base de datos local
      const updatedUser = {
        userId: user._id.toString(),
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        profilePicture: user.avatar?.url_image
      };
  
      // Log para visibilidad de la respuesta
      console.log("Datos de usuario actualizados, respuesta API:", updatedUser);
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error al actualizar datos del usuario:", error);
      res.status(500).json({ message: 'Error al actualizar datos del usuario', error: error.message });
    }
  };
  
  const updateProfileImage = async (req, res) => {
    const { id } = req.params;
    const avatar = req.file;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      if (!avatar) {
        return res.status(400).json({ message: 'No se subió ninguna imagen' });
      }
  
      // Actualizar la imagen de perfil
      user.avatar = {
        public_id: avatar.filename,
        url_image: avatar.path
      };
  
      await user.save();
  
      // Estructura de respuesta para actualizar la base de datos local
      const updatedUser = {
        userId: user._id.toString(),
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        profilePicture: user.avatar.url_image
      };
  
      // Log para visibilidad de la respuesta
      console.log("Imagen de perfil actualizada, respuesta API:", updatedUser);
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error al actualizar imagen de perfil:", error);
      res.status(500).json({ message: 'Error al actualizar imagen de perfil', error: error.message });
    }
  };
  

  
  module.exports = {    
    loginUser,
    createUser,    
    updateUserData,
    updateProfileImage,
    markUserAsDeleted
  };
  