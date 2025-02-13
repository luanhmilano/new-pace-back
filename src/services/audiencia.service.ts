import { Audiencia } from '@prisma/client';
import { AudienciaRepository } from '../repositories/audiencia.repository';

class AudienciaService {
  private readonly audienciaRepository: AudienciaRepository;

  constructor() {
    this.audienciaRepository = new AudienciaRepository();
  }

  async createAudiencia(
    data: Omit<Audiencia, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Audiencia> {
    return this.audienciaRepository.create(data);
  }

  async getAllAudiencias(): Promise<Audiencia[]> {
    return this.audienciaRepository.findAll();
  }

  async getAudienciaById(id: number): Promise<Audiencia | null> {
    return this.audienciaRepository.findById(id);
  }

  async updateAudiencia(
    id: number,
    data: Partial<Omit<Audiencia, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Audiencia> {
    return this.audienciaRepository.update(id, data);
  }

  async deleteAudiencia(id: number): Promise<Audiencia> {
    return this.audienciaRepository.delete(id);
  }

  async getByFilters(filters: {
    startDate?: string;
    endDate?: string;
    turno?: string;
    orgao_julgador?: string;
    sala?: string;
  }): Promise<Audiencia[]> {
    return this.audienciaRepository.findByFilters(filters);
  }

  async updateContestacao(processo: string, tipo: string) {
    return this.audienciaRepository.updateContestacao(processo, tipo);
  }

  async updateAssunto(processo: string, assunto: string) {
    return this.audienciaRepository.updateAssunto(processo, assunto);
  }
}

export default new AudienciaService();
