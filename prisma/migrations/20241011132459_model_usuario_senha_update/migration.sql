/*
  Warnings:

  - You are about to drop the column `idade` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "idade",
ADD COLUMN     "senha" TEXT;
