const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fetchUsers() {
  const usuarios = await prisma.usuarios.findMany();
  console.log("Usuário: ", usuarios)

}

fetchUsers()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
