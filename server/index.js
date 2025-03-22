import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import postRoutes from './routes/post.js'
import dotenv from "dotenv"

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use('/posts', postRoutes);

mongoose.connect(process.env.CONNECTION_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port: http://localhost:${process.env.PORT}`);
    })
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  })