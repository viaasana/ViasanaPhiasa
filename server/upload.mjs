import mongoose from "mongoose"
import path from "path"
import dotenv from "dotenv"
import * as fs from "fs"
dotenv.config()


let gfs;
mongoose.connection.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
    console.log('GridFSBucket set up');
})


async function upload(filePath) {
    const fileName = path.basename(filePath)
    return new Promise((resolve, reject) => {
        try {
            const readStream = fs.createReadStream(filePath);
            const uploadStream = gfs.openUploadStream(fileName);

            readStream.pipe(uploadStream);

            uploadStream.on('finish', () => {
                resolve({ success: true, file: { fileName, id: uploadStream.id } });
            });

            uploadStream.on('error', (err) => {
                reject({ success: false, message: 'from uploadFile func', err: err.message });
            });
        } catch (error) {
            reject({ success: false, message: 'from uploadFile func', err: error.message });
        }
    });
}

export default upload