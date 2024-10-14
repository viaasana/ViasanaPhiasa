import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import AuthRouter from './routes/auth.js';
import Courses from './routes/Chapter.js';
import mongoose from 'mongoose';
import cors from "cors"


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@viasanaphiasa.sqhkgy4.mongodb.net/?retryWrites=true&w=majority&appName=ViasanaPhiasa`;

const connectMongoDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        

        console.log('MongoDB connected');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1); // Exit the process if the connection fails
    }
};

// Start the server after MongoDB connection and GridFS are set up
const startServer = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());

    // Define routes
    app.use('/api/auth', AuthRouter);
    app.use('/api/courses', Courses);

    const PORT = 5000;

    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`);
    });
};

// Connect to MongoDB, then start the server
connectMongoDB().then(startServer);

