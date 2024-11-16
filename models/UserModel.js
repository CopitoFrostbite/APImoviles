const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isDeleted: {   
    type: Boolean,
    default: false
  },
  avatar: {
    public_id: { type: String, required: true },
    url_image: { type: String, required: true }
  }
});



const User = mongoose.model('user', userSchema);

module.exports = User;
  