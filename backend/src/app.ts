// src/app.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import productRoutes from './routes/productRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Mount the routes
app.use('/api', productRoutes);

export default app;