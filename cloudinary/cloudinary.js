const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name : 'dviqzyd9q',
    api_key: '227196671689717',
    api_secret :'QmvQ9APUSbGAZwobCjnk3Akb_9g',
    secure: true
})

module.exports = async function uploadImage(filePath){
    return await cloudinary.uploader.upload(filePath, {folder : 'replit'})
}
