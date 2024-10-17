import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { criarCliente } from '../controllers/clienteController';
import { nextTick } from 'process';
//import { verificarToken } from '../middleware/authMiddleware'

const router = express.Router();

router.post('/criar',criarCliente);


export default router;

