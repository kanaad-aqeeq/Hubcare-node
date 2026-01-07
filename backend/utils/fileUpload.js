const path = require("path");
const multer = require("multer");
// const { IMAGEURL } = process.env;

// Configure Multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Directory where files will be uploaded
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: (req, file, cb) => {
    // Naming convention for files (e.g., using current timestamp)
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|doc|docx)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 5MB
  },
  fileFilter: fileFilter,
});

module.exports = upload;
