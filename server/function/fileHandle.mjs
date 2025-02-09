import mongoose from "mongoose"
import dotenv from "dotenv"
import { PassThrough } from 'stream';
dotenv.config()

let gfs

mongoose.connection.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
    console.log('GridFSBucket set up');
});


async function upload(file) {
    const { originalname: fileName, buffer } = file;  // Assuming the file object has an `originalname` (file name) and `buffer` (file content)
    return new Promise((resolve, reject) => {
        try {
            const uploadStream = gfs.openUploadStream(fileName);
            const bufferStream = new PassThrough();  // Create a stream from the buffer

            bufferStream.end(buffer);
            bufferStream.pipe(uploadStream);

            uploadStream.on('finish', () => {
                resolve({ success: true, file: { fileName, id: uploadStream.id } });
            });

            uploadStream.on('error', (err) => {
                reject({ success: false, message: 'from uploadFile func', err: err.message });
            });
        } catch (error) {
            console.log(error)
            reject({ success: false, message: 'from uploadFile func', err: error.message });
        }
    });

}

async function deleteFile(fileId, res) {

    try {
        return new Promise(async () => {
            const objectId = new mongoose.Types.ObjectId(fileId)
            await gfs.delete(objectId)
        })
    } catch (error) {
        console.log("can't delete this file ", error)
    }
}

async function getFile(type, fileId, req, res) {
    try {
        if (type == "test") {

            const files = await gfs.find({ _id: new mongoose.Types.ObjectId(fileId) }).toArray();
            if (!files || files.length === 0) {
                return res.status(404).json({ err: "File not found" });
            }

            const file = files[0];
            const range = req.headers.range;

            if (!range) {
                return res.status(416).send('Range not provided');
            }

            const fileSize = file.length;
            const CHUNK_SIZE = file.chunkSize;
            const start = Number(range.replace(/\D/g, ''));
            const end = Math.min(start + CHUNK_SIZE , fileSize);

            const contentLength = end - start;



            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': contentLength,
                'Content-Type': "video/mp4",
            });

            const downloadStream = gfs.openDownloadStream(file._id, { start, end });
            downloadStream.pipe(res);
        } else {
            const files = await gfs.find({ _id: new mongoose.Types.ObjectId(fileId) }).toArray();
            if (!files || files.length == 0)
                return res.status(404).json({ err: "File not found" });
            const file = files[0]
            res.set('Content-Type', file.contentType||type);
            const downloadStream = gfs.openDownloadStream(file._id);
            downloadStream.pipe(res);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ err: error.message });
    }
}


export { upload, deleteFile, getFile }