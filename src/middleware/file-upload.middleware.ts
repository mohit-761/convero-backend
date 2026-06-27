import multer from 'multer';
import { join, extname } from 'path';
import { randomBytes } from 'crypto';
import fs from 'fs';
import { Request } from 'express';
import { ApiError } from '../utils/ApiError';

let filePath = join(__dirname, '../', '../', 'uploads');
type CbType = (error: Error | null, name: string) => void;

// check file path exists or not
if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, {
        recursive: true
    });
}

let storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: CbType) => {
        cb(null, filePath);
    },

    filename: (req: Request, file: Express.Multer.File, cb: CbType) => {
        let filename = `${randomBytes(10).toString('hex')}${extname(file.originalname)}`;
        cb(null, filename);
    }
});

let fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    let allowedMimeTypes = ['image/jpg', 'image/svg', 'image/jpeg', 'image/png'];
    if(allowedMimeTypes.includes(file.mimetype)){
        cb(null, true);
    } else {
        cb(new ApiError(400, "Only JPG, JPEG, PNG and SVG images are allowed."));
    }
}

export let fileUpload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 10 * 1024 * 1024 }})


