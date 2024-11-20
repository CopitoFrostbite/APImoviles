const { request } = require('express');
const Image = require('../models/ImageModel');
const uploadImage = require('../cloudinary/cloudinary');

const addImageToEntry = async (req, res) => {

  const { imageId, filePath, dateAdded, syncDate,entryId } = req.body; 
  const imageFile = req.file; // Archivo de la imagen subido

  try {
      if (!imageFile) {
          return res.status(400).json({ message: 'No se subió ninguna imagen' });
      }

      // Crear el registro de la imagen en la base de datos
      const newImage = new Image({
          journalId: entryId,
          imageId: imageId , 
          filePath: filePath , 
          image: {
              public_id: imageFile.filename, // ID único generado por Cloudinary
              url_image: imageFile.path      // URL completa de la imagen en Cloudinary
          },
          dateAdded: dateAdded || Date.now(), // Fecha proporcionada o la actual
          syncDate: syncDate || Date.now(),  // Fecha proporcionada o la actual
          isDeleted: false 
      });

      // Guardar en la base de datos
      await newImage.save();

      // Responder con el objeto de la imagen recién creada
      res.status(201).json({ message: 'Imágenes subidas exitosamente' });
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

  const deleteImage = async (req, res) => {
    const { imageId } = req.params; // ID único de la imagen generado por Cloudinary

    try {
        // Buscar la imagen en la base de datos usando el public_id
        const image = await Image.findOne({ 'image.public_id': imageId });

        if (!image) {
            return res.status(404).json({ message: 'Imagen no encontrada' });
        }

        // Eliminar la imagen de Cloudinary usando su public_id
        const cloudinary = require('../cloudinary/cloudinary');
        await cloudinary.uploader.destroy(image.image.public_id);

        // Eliminar el registro de la base de datos
        await Image.deleteOne({ 'image.public_id': imageId });

        res.status(200).json({ message: 'Imagen eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar imagen:', error);
        res.status(500).json({ message: 'Error al eliminar imagen', error: error.message });
    }
};
  
  module.exports = {
    addImageToEntry,
    uploadJournalImages,
    deleteImage
  };