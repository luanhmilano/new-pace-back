/*
  Warnings:

  - Added the required column `turno` to the `Audiencia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Audiencia" ADD COLUMN     "turno" TEXT NOT NULL;
