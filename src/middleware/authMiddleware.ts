import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { SECRET_KEY } from '../config/environment';
import { decode } from 'punycode';

export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  const tokenheader = req.headers['authorization'];
  const token = req.body

  if (!token) {
    res.status(401).json({ error: 'Acesso negado. Nenhum token fornecido.' });
    return;
  }

  if (!tokenheader) {
    res.status(401).json({ error: 'Acesso negado. Nenhum token fornecido.' });
    return;
  }

  try {    
    const decoded = jwt.verify(tokenheader, SECRET_KEY as string);
    next(); 
  } catch (error) {
    res.status(403).json({ error: 'Token inválido ou expirado.' });
    return;
  }
};
