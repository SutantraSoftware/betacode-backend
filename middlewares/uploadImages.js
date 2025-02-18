const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.country_code + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;
