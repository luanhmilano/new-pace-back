import prisma from '../config/prisma';
import { Audiencia, Pauta } from '@prisma/client';
import { determineTurno } from '../utils/helps/determineTurno';
import PautaRepository from '../repositories/PautaRepository';


export const organizeAudienciasInPautas = async (): Promise<void> => {
  const audiencias = await prisma.audiencia.findMany();

  const pautasMap = new Map<string, Pauta>();

  for (const audiencia of audiencias) {
    const key = `${audiencia.data}-${determineTurno(audiencia.hora)}-${audiencia.orgao_julgador}-${audiencia.sala}`;

    if (!pautasMap.has(key)) {
      let pauta = await prisma.pauta.findFirst({
        where: {
          data: audiencia.data,
          turno: determineTurno(audiencia.hora),
          orgao_julgador: audiencia.orgao_julgador,
          sala: audiencia.sala,
        },
      });

      if (!pauta) {
        pauta = await prisma.pauta.create({
          data: {
            data: audiencia.data,
            turno: determineTurno(audiencia.hora),
            orgao_julgador: audiencia.orgao_julgador,
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

class PautaService {
  async create(data: Pauta): Promise<Pauta> {
    return PautaRepository.create(data);
  }

  async getAll(): Promise<Pauta[]> {
    return PautaRepository.findAll();
  }

  async getById(id: number): Promise<Pauta | null> {
    return PautaRepository.findById(id);
  }

  async getByIdWithAudiencias(id: number): Promise<Pauta | null> {
    return PautaRepository.findByIdWithAudiencias(id);
  }

  async update(id: number, data: Partial<Pauta>): Promise<Pauta> {
    return PautaRepository.update(id, data);
  }

  async delete(id: number): Promise<Pauta> {
    return PautaRepository.delete(id);
  }

}

export default new PautaService();
