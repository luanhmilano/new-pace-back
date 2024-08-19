/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { GetEspecieTarefaUseCase } from './GetEspecieTarefaUseCase';
import { QueryDTO } from '../../DTO/QueryDTO';

export class GetEspecieTarefaController {
  constructor(private GetEspecieTarefaUseCase: GetEspecieTarefaUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const data: QueryDTO = request.body;
    try {
      const result = await this.GetEspecieTarefaUseCase.execute(data);
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected error',
      });
    }
  }
}
