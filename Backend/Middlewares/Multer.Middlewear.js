import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from "../Utils/Cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'CSIR-CEERI',
    },
});

const upload = multer({ storage });

export default upload