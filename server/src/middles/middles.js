const multer = require('multer');
const path = require('path');

exports.storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/uploadedAvatars');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});
