import crypto from 'crypto';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

/**
 * O multer adiciona inputs de formulários
 *   -> 'req.body' mostra informações textuais
 *   -> 'req.file' mostra informações das imagens enviadas
 *
 * As imagens são salvas automaticamente em src/public/images e seu nome no banco de dados
 */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const imageDirectory = path.resolve('src/public/images');
    if (!fs.existsSync(imageDirectory)) {
      fs.mkdirSync(imageDirectory);
    }
    cb(null, imageDirectory);
  },
  filename: (req, file, cb) => {
    // Nome da imagem: random UUID + file extension
    const randomID = crypto.randomBytes(16).toString('hex');
    const extension = path.extname(file.originalname);
    cb(null, randomID + extension);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Filtra para aceitar apenas imagens
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return cb(null, false);
    }
    cb(null, true);
  },
});

const uploadImages = upload.array('images', 5); // Até 5 imagens

export default uploadImages;
