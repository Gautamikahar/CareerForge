// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/resumes");
//   },

//   filename: (req, file, cb) => {
//     cb(
//       null,
//       Date.now() +
//       path.extname(file.originalname)
//     );
//   }
// });

// const upload = multer({
//   storage
// });

// module.exports = upload;
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create uploads/resumes folder if it doesn't exist
const uploadDir = path.join(__dirname, "../uploads/resumes");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
});

module.exports = upload;