const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
   userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isEdited: {
    type: Boolean,
    default: false
  }
});

const Journal = mongoose.model('journal', journalSchema);

module.exports = Journal;
