import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import userRouter from './routes/userRouter.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);

app.get('/api/users', (req, res) => {
    res.json({
        success: true,
        message: 'Recruit CRM API is running'
    });
});

export default app;