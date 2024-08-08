import express from 'express';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // For parsing application/json

// MongoDB URI
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

let gfs;
mongoose.connection.once('open', () => {
  gfs = new GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
  console.log('GridFSBucket set up');
});

// Upload endpoint
app.post('/upload', async (req, res) => {
  const { filePath } = req.body;

  if (!filePath) {
    return res.status(400).send({ error: 'File path is required' });
  }

  const filename = path.basename(filePath);

  try {
    const readStream = fs.createReadStream(filePath);
    const uploadStream = gfs.openUploadStream(filename);
    
    readStream.pipe(uploadStream);

    uploadStream.on('finish', () => {
      res.status(201).send({ file: { filename, id: uploadStream.id } });
    });

    uploadStream.on('error', (err) => {
      res.status(500).send({ error: err.message });
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get file endpoint
app.get('/file/:filename', (req, res) => {
  gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({ err: 'No files exist' });
    }

    gfs.openDownloadStreamByName(req.params.filename).pipe(res);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});