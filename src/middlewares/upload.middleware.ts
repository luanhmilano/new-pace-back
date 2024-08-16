import multer from 'multer';
import path from 'path';

// Certifique-se de que o diretório 'uploads' existe
const uploadDirectory = path.join(__dirname, '../uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
