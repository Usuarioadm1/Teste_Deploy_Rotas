import express from 'express';
import { criarUsuario } from '../controllers/userController';

const router = express.Router();

// Rota para criar um novo usuário
router.post('/usuarios', criarUsuario);

export default router;
