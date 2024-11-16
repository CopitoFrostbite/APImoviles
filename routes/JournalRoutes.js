const express = require('express');
const router = express.Router();
const JournalController = require('../controllers/JournalController');
const upload = require('../cloudinary/multer');

// Definimos las rutas y conectamos con los controladores
router.get('/journals/:id', JournalController.getJournalsByUserId);
router.post('/journal/create', upload.none(), JournalController.createJournal);
router.put('/journal/:entryId', JournalController.deleteJournal);
router.put('/journal/update', JournalController.updateJournal);

module.exports = router;
