import express from 'express';
import cors from 'cors'; 
import { PrismaClient } from '@prisma/client'; 
import usuarioRoutes from './routes/userRoutes';
import clientesRoutes from './routes/clienteRoute';

const app = express();

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json()); 


app.use('/usuario', usuarioRoutes);
app.use('/cliente', clientesRoutes);
  
export { app, prisma };

