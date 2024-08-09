import { PrismaClient, Audiencia } from '@prisma/client';

const prisma = new PrismaClient();

export class AudienciaRepository {
  async create(
    data: Omit<Audiencia, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Audiencia> {
    return prisma.audiencia.create({
      data,
    });
  }

  async findAll(): Promise<Audiencia[]> {
    return prisma.audiencia.findMany();
  }

  async findById(id: number): Promise<Audiencia | null> {
    return prisma.audiencia.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    data: Partial<Omit<Audiencia, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Audiencia> {
    return prisma.audiencia.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Audiencia> {
    return prisma.audiencia.delete({
      where: { id },
    });
  }

  async findByFilters(filters: {
    startDate?: string;
    endDate?: string;
    turno?: string;
    orgao_julgador?: string;
    sala?: string;
  }): Promise<Audiencia[]> {
    const { startDate, endDate, turno, orgao_julgador, sala } = filters;

    return prisma.audiencia.findMany({
      where: {
        data: {
          gte: startDate,
          lte: endDate,
        },
        turno: turno || undefined,
        orgao_julgador: orgao_julgador || undefined,
        sala: sala || undefined,
      },
    });
  }
}
