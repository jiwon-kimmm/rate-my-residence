import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import multer from 'multer';

import { userRouter } from './routes/users.js';
import { reviewsRouter } from './routes/reviews.js';
import { schoolRouter } from './routes/school.js';

import dotenv from 'dotenv';
dotenv.config();
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS;

const app = express();

app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
upload.single('avatar');

app.use("/auth", userRouter);
app.use("/reviews", reviewsRouter);
app.use("/school", schoolRouter);



mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@ratemyresidence.64kj3xu.mongodb.net/ratemyresidence?retryWrites=true&w=majority`,
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }
);

app.listen(3001, () => console.log("Residence server started!"));