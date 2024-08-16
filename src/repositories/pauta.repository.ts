import { PrismaClient, Pauta } from '@prisma/client';
import compararVara from '../utils/helps/compararVara';

const prisma = new PrismaClient();

class PautaRepository {
  async create(
    data: Omit<Pauta, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Pauta> {
    return prisma.pauta.create({
      data,
    });
  }

  async findAll(): Promise<Pauta[]> {
    return prisma.pauta.findMany();
  }

  async findById(id: number): Promise<Pauta | null> {
    return prisma.pauta.findUnique({
      where: { id },
    });
  }

  async findByIdWithAudiencias(id: number): Promise<Pauta | null> {
    return prisma.pauta.findUnique({
      where: { id },
      include: {
        audiencias: true, // Inclui as audiências relacionadas à pauta
      },
    });
  }

  async findUniqueOrgaosJulgadores(): Promise<string[]> {
    const orgaosJulgadores = await prisma.pauta.findMany({
      select: {
        orgao_julgador: true,
      },
      distinct: ['orgao_julgador'],
    });

    return orgaosJulgadores
      .map((pauta) => pauta.orgao_julgador)
      .sort((a, b) => compararVara(a, b));
  }

  async findSalasByOrgaoJulgador(orgao_julgador: string): Promise<string[]> {
    const salas = await prisma.pauta.findMany({
      where: {
        orgao_julgador: orgao_julgador,
      },
      select: {
        sala: true,
      },
      distinct: ['sala'],
      orderBy: {
        sala: 'asc',
      },
    });

    return salas.map((pauta) => pauta.sala);
  }

  async update(
    id: number,
    data: Partial<Omit<Pauta, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Pauta> {
    return prisma.pauta.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Pauta> {
    return prisma.pauta.delete({
      where: { id },
    });
  }
}

export default new PautaRepository();
