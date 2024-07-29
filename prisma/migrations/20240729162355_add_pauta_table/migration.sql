-- AlterTable
ALTER TABLE "Audiencia" ADD COLUMN     "pautaId" INTEGER;

-- AddForeignKey
ALTER TABLE "Audiencia" ADD CONSTRAINT "Audiencia_pautaId_fkey" FOREIGN KEY ("pautaId") REFERENCES "Pauta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
