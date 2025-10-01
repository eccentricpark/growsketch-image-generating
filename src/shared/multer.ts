import multer from 'multer';

export const multerOption = {
  options: {
    storage: multer.diskStorage(
      {
        destination: './uploads',
        filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
      }
    )
  }
};

const storage = multer.memoryStorage();
export const memoryOption = multer({storage});