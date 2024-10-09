import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis do .env para process.env

export const PORT = process.env.PORT || 3000; // Exemplo de uso
export const DB_URL = process.env.DB_URL; // Exemplo de URL do banco de dados
