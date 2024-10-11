import express from 'express';
import { criarUsuario, visualizarUsuario, loginUsuario} from '../controllers/userController';
import { verificarToken } from '../middleware/authMiddleware'

const router = express.Router();

router.post('/criar', criarUsuario);
router.post('/login', loginUsuario);
router.get('/visualizar', verificarToken, visualizarUsuario);

export default router;


