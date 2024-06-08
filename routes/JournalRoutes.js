const express = require('express');
const router = express.Router();
const JournalController = require('../controllers/JournalController');
const upload = require('../cloudinary/multer');

// Definimos las rutas y conectamos con los controsladores
router.get('/journals', JournalController.getJournalsByUserId);
router.post('/journal/create', JournalController.createJournal);
router.delete('/journal/delete', JournalController.deleteJournal);
router.put('/journal/update', JournalController.updateJournal);

module.exports = router;
