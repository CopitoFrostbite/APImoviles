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
  // Obtener el userId desde los parámetros de la ruta
  const { id } = req.params;  // Cambio de req.body a req.params

  try {
    // Buscar journals que correspondan al userId especificado
    const journals = await Journal.find({ userId: id });

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
  console.log("Datos recibidos:", req.body);
  const { journalId, userId, title, content, mood, date } = req.body;

  try {
      // Verificar que los datos requeridos estén presentes
      if ( !journalId || !userId || !title || !content || !mood || !date) {
          return res.status(400).json({ message: 'Faltan datos requeridos' });
      }

      console.log("Iniciando creación de Journal...");

      // Crear un nuevo journal
      const newJournal = new Journal({
          journalId,
          userId,
          title,
          content,
          mood,
          date,
          isEdited: false,
          isDraft: false  // Asumimos que es un journal completo y no un borrador
      });

      // Guardar el nuevo journal en la base de datos
      await newJournal.save();

      // Preparar la respuesta transformada
      const transformedJournal = {
          journalId: newJournal.journalId,
          userId: newJournal.userId,
          title: newJournal.title,
          content: newJournal.content,
          mood: newJournal.mood,
          date: newJournal.date,
          isEdited: newJournal.isEdited,
          isDraft: newJournal.isDraft
      };

      res.status(201).json({ message: 'Journal creado con éxito', journal: transformedJournal });
  } catch (error) {
      console.error("Error al crear el journal:", error); // Log más detallado del error
      res.status(500).json({ message: 'Error al intentar crear el journal', error: error.message });
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
  