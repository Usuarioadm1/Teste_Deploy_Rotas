import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis do .env para process.env

export const PORT = process.env.PORT || 3000; // Exemplo de uso
export const DATABASE_URL = process.env.DATABASE_URL;
export const SECRET_KEY = process.env.SECRET_KEY ;
  