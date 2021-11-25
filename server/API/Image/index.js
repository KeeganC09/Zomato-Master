//Libraries
import express from 'express';
import AWS from 'aws-sdk';
import multer from 'multer';

//Database Model
import { ImageModel } from '../../database/allModels';

const Router = express.Router();

//Multer Config
const storage = multer.memoryStorage();
const upload = multer({ storage });

//Utility Function
import { s3Upload } from '../../Utils/s3';

/**
 * Route        /
 * Des          Uploads given image to s3 bucket and saves file link to mongoDB
 * Params       none
 * Access       Public
 * Method       POST
 */

Router.post('/', upload.single("file"), async (req, res) => {
    try {
        const file = req.file;

        //S3 Bucket Options
        const bucketOptions = {
            Bucket: "zomato-master-keegan",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read", // Access Control List
        }

        const uploadImage = await s3Upload(bucketOptions);

        const saveImageToDatabase = await ImageModel.create({
            images: [{ location: uploadImage.Location }],
        });

        return res.status(200).json(saveImageToDatabase);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

export default Router;