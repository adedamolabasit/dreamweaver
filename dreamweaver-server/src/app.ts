import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
// import dreamRouter from './routes/dream.routes';
// import ipRouter from './routes/ip.routes';
// import errorMiddleware from './middleware/error.middleware';

config(); // Load .env

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

// Routes
// app.use('/api/dreams', dreamRouter);
// app.use('/api/ip', ipRouter);

// // Error handling
// app.use(errorMiddleware);

export default app;