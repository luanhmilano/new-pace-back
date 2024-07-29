import { PrismaClient, Pauta } from '@prisma/client';

const prisma = new PrismaClient();

export class PautaRepository {
  async create(data: Omit<Pauta, 'id' | 'createdAt' | 'updatedAt'>): Promise<Pauta> {
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

  async update(id: number, data: Partial<Omit<Pauta, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Pauta> {
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
