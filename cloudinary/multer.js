const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatars',
    format: async (req, file) => {
      const format = file.mimetype ? file.mimetype.split('/')[1] : 'jpg'; // Por defecto a jpg si no se encuentra el MIME
      return format;
    }, 
    public_id: (req, file) => file.originalname,
  },
});

const upload = multer({ storage });

module.exports = upload;
