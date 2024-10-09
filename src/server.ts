// src/server.ts
import { app, prisma } from './app';
import { PORT } from './config/enviroment'







const startServer = async () => {
  try {
    await prisma.$connect(); 
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
