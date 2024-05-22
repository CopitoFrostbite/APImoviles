const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = 'mongodb+srv://admin:kVmimSZ1CqrzspAq@poi.kmcyt8q.mongodb.net/Moviles?retryWrites=true&w=majority&appName=poi';


    await mongoose.connect(mongoURI);
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('Error al conectarse a MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
