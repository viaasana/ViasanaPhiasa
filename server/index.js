import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import AuthRouter from './routes/auth.js';
import Courses from './routes/Chapter.js';
import getText from "./routes/getText.js"
import mongoose from 'mongoose';
import cors from "cors"

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@viasanaphiasa.sqhkgy4.mongodb.net/?retryWrites=true&w=majority&appName=ViasanaPhiasa`;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

connectMongoDB();




const app = express();

app.use(express.json());
app.use(cors())
app.use("/api/auth", AuthRouter);
app.use("/api/courses", Courses)
app.use("/api/getText", getText)

const PORT = 5000;

app.listen(PORT, () => console.log(`server stated on PORT: ${PORT}`));
