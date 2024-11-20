const express = require('express');
const router = express.Router();
const JournalController = require('../controllers/JournalController');
const upload = require('../cloudinary/multer');

// Definimos las rutas y conectamos con los controladores
router.get('/journals/:id', JournalController.getJournalsByUserId);
router.post('/journal/create', upload.none(), JournalController.createJournal);
router.put('/journal/:entryId', JournalController.deleteJournal);

router.put('/journals/:journalId/delete', JournalController.updateJournalDeleteFlag);
router.put('/journals/:journalId', JournalController.updateJournalEntry);

module.exports = router;
