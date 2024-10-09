import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Função para criar um novo usuário
export const criarUsuario = async (req: Request, res: Response) => {
  try {
    const { nome, email, idade, contatos } = req.body;

    // Criação do usuário e dos contatos
    const novoUsuario = await prisma.usuarios.create({
      data: {
        nome,
        email,
        idade,
        contatos: {
          create: contatos, // Cria contatos relacionados ao usuário
        },
      },
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar o usuário", details: error });
  }
};
