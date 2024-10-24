const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
   journalId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  mood: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  isDraft: {
    type: Boolean,
    default: true
  }
});

const Journal = mongoose.model('journal', journalSchema);

module.exports = Journal;
