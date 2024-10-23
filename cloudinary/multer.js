const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');
const { v4: uuidv4 } = require('uuid');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatars',
    format: async (req, file) => {
      const format = file.mimetype ? file.mimetype.split('/')[1] : 'jpg'; // Por defecto a jpg si no se encuentra el MIME
      return format;
    }, 
    public_id: (req, file) => {
      return `user_avatar_${uuidv4()}`;  // Generar un ID único en lugar de usar el nombre original del archivo
    },
  },
});

const upload = multer({limits: { fileSize: 50 * 1024 * 1024 }, storage });

module.exports = upload;
