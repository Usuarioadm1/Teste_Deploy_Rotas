import express from 'express';
import { PrismaClient } from '@prisma/client'; 
import cors from 'cors'; 
import usuarioRoutes from './routes/userRoute';

const app = express();

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json()); 


  app.use('/api', usuarioRoutes);

  app.get('/usuarios', async (req, res) => {
    try {
      const usuarios = await prisma.usuarios.findMany();
      res.status(200).json(usuarios); 
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      await prisma.$disconnect();
    }
  });
  
export { app, prisma };
