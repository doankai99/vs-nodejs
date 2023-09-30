import express from 'express';
import mongoose from 'mongoose';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import multer from "multer";
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import routes from './router/index.js';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT;

const isBrowser = typeof window !== 'undefined';

const firebaseApp = isBrowser ? initializeApp(firebaseConfig) : null;
const analytics = isBrowser ? getAnalytics(firebaseApp) : null;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Chỉnh sửa URL của trang web của bạn nếu cần thiết
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const mongodbUri = process.env.MONGO_DB;

mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
});

app.post('/', (req, res) =>{
    res.send('hello world everyone');
})

routes(app);

app.listen(port, () => {
    console.log("server is running in port", port);
} )
