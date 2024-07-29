import prisma from '../config/prisma';

export const resetAudienciasAndPautas = async (): Promise<void> => {
  await prisma.audiencia.deleteMany({});
  await prisma.pauta.deleteMany({});

  await prisma.$executeRaw`ALTER SEQUENCE "Audiencia_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "Pauta_id_seq" RESTART WITH 1`;
};
