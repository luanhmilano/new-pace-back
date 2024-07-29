/*
  Warnings:

  - Added the required column `dataGeracao` to the `Audiencia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Audiencia" ADD COLUMN     "dataGeracao" TIMESTAMP(3) NOT NULL;
