const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatars',
    format: async (req, file) => 'png', // You can specify the format here
    public_id: (req, file) => file.originalname,
  },
});

const upload = multer({ storage });

module.exports = upload;
