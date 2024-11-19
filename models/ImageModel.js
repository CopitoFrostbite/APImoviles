const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageId: { type: String, required: true, unique: true }, 
  journalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Journal', required: true },
  filePath: { type: String, required: true }, 
  cloudUrl: { type: String, default: null }, 
  dateAdded: { type: Date, default: Date.now }, 
  isEdited: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  syncDate: { type: Date, default: null }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
