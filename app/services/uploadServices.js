import cloudinary from 'cloudinary';
import multer from 'multer';
import path from 'path'
import { config } from 'dotenv';

config();

cloudinary.config({
    cloud_name:  process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// Multer config
export const multerConfig = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);  
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
})

export const cloudinaryConfig = async(file) => {
    try {
      const data = await cloudinary.v2.uploader.upload(file);
      return data;
    } catch (error) {
      return error;
    }
  };

  export const processUpload = async (upload) => {
    const { imagePath } = await upload;
    const file = await cloudinaryConfig(imagePath);
    return file;
  };





