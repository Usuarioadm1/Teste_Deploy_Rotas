import express from 'express';
import { criarUsuario, visualizarUsuario, loginUsuario } from '../controllers/userController';

const router = express.Router();

router.post('/criar', criarUsuario);
router.post('/login', loginUsuario);
router.get('/visualizar', visualizarUsuario);


export default router;


