const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageId: {
    type: String,
    required: true
  },
  entryId: {
    type: String,
    required: true,
    ref: 'journal' // Hace referencia al journal asociado (similar a la clave foránea)
  },
  filePath: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  isDeleted: {   
    type: Boolean,
    default: false
  }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
