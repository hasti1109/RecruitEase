const path = require('path')
const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,"files")
  },
  filename : (req,file,cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    // Accept only PDFs
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only .pdf format allowed!'));
    }
  }
});

module.exports.upload = upload