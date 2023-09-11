import cloudinary from 'cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import * as dotenv from 'dotenv';
dotenv.config();
// import multer from 'multer';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinaryV2,
    allowedFormats: ['jpg', 'png'],
    params: {
        folder: "Fabric"
    }
});

import multer from 'multer';

const uploadCloud = multer({ storage });

export default uploadCloud;