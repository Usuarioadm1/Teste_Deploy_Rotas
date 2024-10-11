import jwt from 'jsonwebtoken';
import bcrypt  from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { SECRET_KEY} from '../config/enviroment';

const prisma = new PrismaClient();

// Função para criar um novo usuário
export const criarUsuario = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, contatos } = req.body;


    const senhaHash = await bcrypt.hash(senha, 10);

    // Criação do usuário e dos contatos
    const novoUsuario = await prisma.usuarios.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        contatos: {
          create: contatos, 
        },
      },
    });

    res.status(201).json(
      {
        "mensagem":"Usuario cadastrado com sucesso, dados recebidos: ",
        "dados":novoUsuario
      }
    )
      
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar o usuário", details: error });
  }
};


// Função para login do usuário
export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    // Verificar se o usuário existe
    const usuario = await prisma.usuarios.findUnique({
      where: { email }
    });
    
    if (!usuario) {
        res.status(404).json({ error: "Usuário não encontrado" });
        return
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
       res.status(401).json({ error: "Credenciais inválidas" });
       return
    }

    if (!SECRET_KEY) {
      res.status(404).json({ error: "Key não encontrada" });
      return 
      
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET_KEY, {
      expiresIn: '1h',
    });


    res.status(200).json({ mensagem: "Login bem-sucedido", token });
  } catch (error) {
    res.status(400).json({ error: "Erro ao fazer login", details: error });
  }
};


export const visualizarUsuario = async (req: Request, res: Response) => {
  try {
    const usuarios = await prisma.usuarios.findMany();
    res.status(200).json(usuarios); 
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  } finally {
    await prisma.$disconnect();
  }
}


