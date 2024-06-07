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
      if (!email || !password || !username || !name || !lastname) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }
      if (req.files?.File) {
        const result = await uploadImage(req.files.File.tempFilePath);
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
  
        await newUser.save();
  
        res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
      } else {
        res.status(400).json({ message: 'No se subió ningún archivo' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al intentar crear el usuario', error: error });
    }
  }

  const getUserById = async (req, res) => {
    console.log('Function: getProductById');
    res.send('getProductById');
  };
  
  module.exports = { getUser, createUser, getUserById };
  