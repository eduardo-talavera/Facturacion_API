import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import facturaRoutes from './routes/factura.routes';
import authRoutes from './routes/auth.routes';
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';

dotenv.config();

connectDB();

const app = express();

app.use(cors(corsConfig))

app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/facturas', facturaRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
