import { Pauta } from '@prisma/client';
import PautaRepository from '../repositories/pauta.repository';

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
