import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { ResponseError } from "../error/responses-error.js";

// Buat __dirname manual (karena ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Tentukan penyimpanan file menggunakan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "..", "public", "images"));
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = Date.now() + fileExtension;
    cb(null, fileName);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(
        new ResponseError(400, "Only image files (jpg, png, jpeg) are allowed!")
      );
    }
  },
});

export default upload;
