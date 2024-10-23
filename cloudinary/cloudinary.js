const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // Cargar variables de entorno

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

module.exports = async function uploadImage(Path) {
    try {
        const result = await cloudinary.uploader.upload(Path, { folder: 'replit' });
        console.log('Imagen subida correctamente:', result);
        return result;
    } catch (error) {
        console.error('Error al subir la imagen a Cloudinary:', error);
        throw error; // Maneja el error apropiadamente
    }
};