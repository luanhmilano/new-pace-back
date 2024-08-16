/*
  Warnings:

  - You are about to drop the column `contestacao` on the `Audiencia` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Audiencia" DROP COLUMN "contestacao",
ADD COLUMN     "tipo_contest" TEXT;
