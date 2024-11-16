const { request } = require('express');
const Journal = require('../models/JournalModel');
const uploadImage = require('../cloudinary/cloudinary');

// Eliminación lógica del Journal
const deleteJournal = async (req, res) => {
  const { entryId } = req.params;

  try {
    // Verificar que el entryId está presente
    if (!entryId) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    // Buscar y actualizar el journal que coincide con el entryId para marcarlo como eliminado
    const journal = await Journal.findOneAndUpdate(
      { entryId: entryId },
      { isDeleted: true },
      { new: true } // Devuelve el documento actualizado
    );

    // Verificar si se encontró y actualizó el journal
    if (!journal) {
      return res.status(404).json({ message: 'Journal no encontrado' });
    }

    res.status(200).json({ message: 'Journal eliminado correctamente (eliminación lógica)', journal });
  } catch (error) {
    console.error("Error al eliminar el Journal:", error);
    res.status(500).json({ message: 'Error al intentar eliminar el Journal', error: error.message });
  }
};

// Obtener journals del usuario que no estén eliminados
const getJournalsByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar journals que correspondan al userId especificado y que no estén eliminados
    const journals = await Journal.find({ userId: id, isDeleted: false });

    // Verificar si se encontraron journals para el usuario
    if (!journals || journals.length === 0) {
      return res.status(404).json({ message: 'No se encontraron journals para el usuario especificado' });
    }

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
    if (!journalId || !userId || !title || !content || !mood || !date) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    const newJournal = new Journal({
      journalId,
      userId,
      title,
      content,
      mood,
      date,
      isEdited: false,
      isDraft: false,
      isDeleted: false // Inicializar con isDeleted en false
    });

    await newJournal.save();

    const transformedJournal = {
      journalId: newJournal.journalId,
      userId: newJournal.userId,
      title: newJournal.title,
      content: newJournal.content,
      mood: newJournal.mood,
      date: newJournal.date,
      isEdited: newJournal.isEdited,
      isDraft: newJournal.isDraft,
      isDeleted: newJournal.isDeleted
    };

    res.status(201).json({ message: 'Journal creado con éxito', journal: transformedJournal });
  } catch (error) {
    console.error("Error al crear el journal:", error);
    res.status(500).json({ message: 'Error al intentar crear el journal', error: error.message });
  }
};

const updateJournal = async (req, res) => {
  const { userId, entryId, title, content, isEdited } = req.body;

  try {
    if (!userId || !entryId || !title || !content) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    const journal = await Journal.findOneAndUpdate(
      { userId: userId, entryId: entryId },
      { title: title, content: content, isEdited: true },
      { new: true }
    );

    if (!journal) {
      return res.status(404).json({ message: 'Journal no encontrado o no autorizado' });
    }

    res.status(200).json(journal);
  } catch (error) {
    console.error("Error al actualizar el Journal:", error);
    res.status(500).json({ message: 'Error al intentar actualizar el Journal', error: error });
  }
};

module.exports = { getJournalsByUserId, createJournal, deleteJournal, updateJournal };