/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Audiencia` table. All the data in the column will be lost.
  - You are about to drop the column `dataGeracao` on the `Audiencia` table. All the data in the column will be lost.
  - You are about to drop the column `orgaoJulgador` on the `Audiencia` table. All the data in the column will be lost.
  - You are about to drop the column `tipoAudiencia` on the `Audiencia` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Audiencia` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Pauta` table. All the data in the column will be lost.
  - You are about to drop the column `orgaoJulgador` on the `Pauta` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Pauta` table. All the data in the column will be lost.
  - Added the required column `data_geracao` to the `Audiencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgao_julgador` to the `Audiencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_audiencia` to the `Audiencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Audiencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgao_julgador` to the `Pauta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Pauta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Audiencia" DROP COLUMN "createdAt",
DROP COLUMN "dataGeracao",
DROP COLUMN "orgaoJulgador",
DROP COLUMN "tipoAudiencia",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "data_geracao" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "orgao_julgador" TEXT NOT NULL,
ADD COLUMN     "tipo_audiencia" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Pauta" DROP COLUMN "createdAt",
DROP COLUMN "orgaoJulgador",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "orgao_julgador" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
