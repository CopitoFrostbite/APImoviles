const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  avatar: {
    public_id: String,
    url_image: String
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
