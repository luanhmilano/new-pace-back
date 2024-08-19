/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { GetSetorResponsavelTarefaUseCase } from './GetSetorResponsavelUseCase';
import { QueryDTO } from '../../DTO/QueryDTO';

export class GetSetorResponsavelTarefaController {
  constructor(
    private getSetorResponsavelTarefaUseCase: GetSetorResponsavelTarefaUseCase,
  ) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const data: QueryDTO = request.body;
    try {
      const result = await this.getSetorResponsavelTarefaUseCase.execute(data);
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected error',
      });
    }
  }
}
