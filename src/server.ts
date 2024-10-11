// src/server.ts
import { app, prisma } from './app';
import { PORT } from './config/environment'

const startServer = async () => {
  try {
    await prisma.$connect(); 
    app.listen(PORT, () => {
      //console.log(`http://localhost:${PORT}`);
        console.log("O servidor esta rodando")
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
