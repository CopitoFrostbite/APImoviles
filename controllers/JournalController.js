const { request } = require('express');
const Journal = require('../models/JournalModel');
const uploadImage = require('../cloudinary/cloudinary')

const deleteJournal = async (req, res) => {
  const { userId, entryId } = req.body;

  try {
    // Verificar que los datos requeridos están presentes
    if (!userId || !entryId) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    // Buscar y eliminar el journal que coincide con el userId y entryId
    const journal = await Journal.findOneAndDelete({ userId: userId, entryId: entryId });

    // Verificar si se encontró y eliminó el journal
    if (!journal) {
      return res.status(404).json({ message: 'Journal no encontrado o no autorizado' });
    }

    res.status(200).json({ message: 'Journal eliminado correctamente' });
  } catch (error) {
    console.error("Error al eliminar el Journal:", error);
    res.status(500).json({ message: 'Error al intentar eliminar el Journal', error: error });
  }
};

const getJournalsByUserId = async (req, res) => {
  const { userId } = req.body;
  
  try {
    // Buscar journals que correspondan al userId especificado
    const journals = await Journal.find({ userId: userId });
    
    // Verificar si se encontraron journals para el usuario
    if (!journals || journals.length === 0) {
      return res.status(404).json({ message: 'No se encontraron journals para el usuario especificado' });
    }
    
    // Si se encontraron journals, enviarlos como respuesta
    res.status(200).json(journals);
  } catch (error) {
    console.error("Error al buscar los Journals:", error);
    res.status(500).json({ message: 'Error al intentar buscar los Journals', error: error });
  }
};
  
  const createJournal = async (req, res) => {
    const { entryId, userId, title, content} = req.body;
    
    try {
      // Verificar que todos los datos requeridos están presentes
      if (!entryId || !userId || !title || !content) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
      }

      // Crear un nuevo Journal
      const newJournal = new Journal({
        entryId: entryId,
        userId: userId,
        title: title,
        content: content,
        isEdited: 0,
      });
  
      // Guardar el nuevo usuario en la base de datos
      await newJournal.save();

      res.status(201).json(newJournal);
    } catch (error) {
      console.error("Error al crear el Journal:", error);
      res.status(500).json({ message: 'Error al intentar crear el Journal', error: error });
      
    }
  };

  const updateJournal = async (req, res) => {
    const { userId, entryId, title, content, isEdited } = req.body;
  
    try {
      // Verificar que los datos requeridos están presentes
      if (!userId || !entryId || !title || !content) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
      }
  
      // Buscar y actualizar el journal que coincide con el userId y entryId
      const journal = await Journal.findOneAndUpdate(
        { userId: userId, entryId: entryId },
        { title: title, content: content, isEdited: true },
        { new: true } // Para devolver el documento actualizado
      );
  
      // Verificar si se encontró y actualizó el journal
      if (!journal) {
        return res.status(404).json({ message: 'Journal no encontrado o no autorizado' });
      }
  
      res.status(200).json(journal);
    } catch (error) {
      console.error("Error al actualizar el Journal:", error);
      res.status(500).json({ message: 'Error al intentar actualizar el Journal', error: error });
    }
  };
  
  module.exports = { getJournalsByUserId, createJournal, deleteJournal , updateJournal };
  