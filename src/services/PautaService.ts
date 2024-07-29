import prisma from '../config/prisma';
import { Audiencia, Pauta } from '@prisma/client';

const determineTurno = (hora: string): string => {
  const [hour] = hora.split(':').map(Number);
  return hour < 13 ? 'MANHÃ' : 'TARDE';
};

export const organizeAudienciasInPautas = async (): Promise<void> => {
  const audiencias = await prisma.audiencia.findMany();

  const pautasMap = new Map<string, Pauta>();

  for (const audiencia of audiencias) {
    const key = `${audiencia.data}-${determineTurno(audiencia.hora)}-${audiencia.orgaoJulgador}-${audiencia.sala}`;

    if (!pautasMap.has(key)) {
      let pauta = await prisma.pauta.findFirst({
        where: {
          data: audiencia.data,
          turno: determineTurno(audiencia.hora),
          orgaoJulgador: audiencia.orgaoJulgador,
          sala: audiencia.sala,
        },
      });

      if (!pauta) {
        pauta = await prisma.pauta.create({
          data: {
            data: audiencia.data,
            turno: determineTurno(audiencia.hora),
            orgaoJulgador: audiencia.orgaoJulgador,
            sala: audiencia.sala,
          },
        });
      }

      pautasMap.set(key, pauta);
    }

    const pauta = pautasMap.get(key)!; // Pauta agora é garantidamente não nula

    await prisma.audiencia.update({
      where: { id: audiencia.id },
      data: { pautaId: pauta.id },
    });
  }
};
