import express from 'express';
import { criarCliente } from '../controllers/clienteController';
//import { verificarToken } from '../middleware/authMiddleware'

const router = express.Router();

router.get('/criar', criarCliente);

export default router;


