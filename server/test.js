import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import crypto from 'crypto';
import path from 'path';


const app = express();

// Mongo URI
const mongoURI = 'your_mongodb_uri_here';

// Create Mongo connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Init gfs
let gfs;
conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

// Upload video endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
