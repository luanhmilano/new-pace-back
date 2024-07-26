-- CreateTable
CREATE TABLE "Audiencia" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "hora" TEXT NOT NULL,
    "processo" TEXT NOT NULL,
    "orgaoJulgador" TEXT NOT NULL,
    "partes" TEXT NOT NULL,
    "classe" TEXT NOT NULL,
    "tipoAudiencia" TEXT NOT NULL,
    "sala" TEXT NOT NULL,
    "situacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Audiencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pauta" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "turno" TEXT NOT NULL,
    "orgaoJulgador" TEXT NOT NULL,
    "sala" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pauta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Audiencia_processo_key" ON "Audiencia"("processo");
