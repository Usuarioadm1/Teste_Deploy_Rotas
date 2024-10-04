const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware para permitir o acesso ao JSON
app.use(express.json());

// Rota para buscar todos os usuários
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await prisma.usuarios.findMany();
    res.status(200).json(usuarios); // Envia os usuários como resposta
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    //res.status(500).json({ error: 'Erro ao buscar usuários' });
  } finally {
    await prisma.$disconnect(); // Desconecta o Prisma Client
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
