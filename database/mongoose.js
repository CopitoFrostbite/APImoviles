const mongoose = require('mongoose');
require('dotenv').config(); 

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    await mongoose.connect(mongoURI, {});
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('Error al conectarse a MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;