const { request } = require('express');
const User = require('../models/UserModel');
const uploadImage = require('../cloudinary/cloudinary')

const getUser = async (req, res) => {
    console.log('Function: getAllProducts');
    res.send('getAllProducts');
  };
  
  
  const createUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (req.files?.File) {
        const result = await uploadImage(req.files.File.tempFilePath);
        const newUser = new User({
          email: email,
          password: password,
          avatar: {
              public_id: result.public_id,
              url_image: result.secure_url
          }
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
    };
    } catch (error) {
      res.json({ message: 'error al intentar crear el usuario', error: error });
    }


}

  const getUserById = async (req, res) => {
    console.log('Function: getProductById');
    res.send('getProductById');
  };
  
  module.exports = { getUser, createUser, getUserById };
  