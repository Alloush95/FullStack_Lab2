import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routers from './routes/tableRoute.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3000;
const passWord = process.env.PASSWORD;

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(passWord, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Connected to MongoDB Atlas');
  })
    .catch((err) => {
        console.log(err);
    });
app.use('/api',routers)


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });