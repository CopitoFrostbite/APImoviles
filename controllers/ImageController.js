const { request } = require('express');
const Image = require('../models/ImageModel');
const uploadImage = require('../cloudinary/cloudinary');

const addImageToEntry = async (req, res) => {
    const { entryId } = req.params;
    const imageFile = req.file; 
  
    try {
      if (!imageFile) {
        return res.status(400).json({ message: 'No se subió ninguna imagen' });
      }
  
      // Crear el registro de la imagen en la base de datos
      const newImage = new Image({
        imageId: imageFile.filename, // Este es el public_id generado por Cloudinary
        journalId: entryId,
        filePath: imageFile.path, // Ruta completa en Cloudinary
        cloudUrl: imageFile.path, // URL de la imagen en Cloudinary
        isDeleted: false
      });
  
      await newImage.save();
  
      res.status(201).json(newImage);
    } catch (error) {
      console.error('Error al agregar imagen a la entrada:', error);
      res.status(500).json({ message: 'Error al agregar imagen', error: error.message });
    }
  };
  
  // Subir múltiples imágenes a un journal
  const uploadJournalImages = async (req, res) => {
    const { journalId } = req.params;
    const imageFiles = req.files; // Usamos req.files porque pueden ser múltiples archivos
  
    try {
      if (!imageFiles || imageFiles.length === 0) {
        return res.status(400).json({ message: 'No se subieron imágenes' });
      }
  
      // Crear los registros en la base de datos
      const imageRecords = imageFiles.map(file => ({
        imageId: file.filename, // public_id generado por Cloudinary
        journalId,
        filePath: file.path, // Ruta completa en Cloudinary
        cloudUrl: file.path, // URL de la imagen en Cloudinary
        isDeleted: false
      }));
  
      await Image.insertMany(imageRecords);
  
      res.status(201).json({ message: 'Imágenes subidas exitosamente', images: imageRecords });
    } catch (error) {
      console.error('Error al subir imágenes:', error);
      res.status(500).json({ message: 'Error al subir imágenes', error: error.message });
    }
  };
  
  module.exports = {
    addImageToEntry,
    uploadJournalImages
  };